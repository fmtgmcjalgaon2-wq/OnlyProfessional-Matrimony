import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { database } from './server/db.ts';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // === REST API ENDPOINTS ===

  // 1. Platform Statistics
  app.get('/api/stats', (_req: Request, res: Response) => {
    res.json(database.getStats());
  });

  // 2. Profiles (Discovery / Search)
  app.get('/api/profiles', (req: Request, res: Response) => {
    const { search, gender, profession, status, minGunas } = req.query;
    const profiles = database.getProfiles({
      search: search as string,
      gender: gender as string,
      profession: profession as string,
      status: status as string,
      minGunas: minGunas ? parseInt(minGunas as string, 10) : undefined
    });
    res.json(profiles);
  });

  app.get('/api/profiles/:id', (req: Request, res: Response) => {
    const profile = database.getProfileById(req.params.id);
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }
    res.json(profile);
  });

  app.post('/api/profiles', (req: Request, res: Response) => {
    const newProfile = database.createProfile(req.body);
    res.status(201).json(newProfile);
  });

  // 3. Verification Queue (Admin Panel)
  app.get('/api/verification-queue', (_req: Request, res: Response) => {
    res.json(database.getVerificationQueue());
  });

  app.post('/api/verification-queue/:id/review', (req: Request, res: Response) => {
    const { action, notes } = req.body;
    if (!['approved', 'rejected', 'doc_requested'].includes(action)) {
      res.status(400).json({ error: 'Invalid action' });
      return;
    }
    const updated = database.updateVerificationItem(req.params.id, action, notes);
    if (!updated) {
      res.status(404).json({ error: 'Queue item not found' });
      return;
    }
    res.json(updated);
  });

  // 4. Fraud & Risk Shield Alerts
  app.get('/api/fraud-alerts', (_req: Request, res: Response) => {
    res.json(database.getFraudAlerts());
  });

  app.post('/api/fraud-alerts/:id/action', (req: Request, res: Response) => {
    const { action } = req.body;
    if (!['quarantined', 'blocked', 'dismissed'].includes(action)) {
      res.status(400).json({ error: 'Invalid action' });
      return;
    }
    const updated = database.resolveFraudAlert(req.params.id, action);
    if (!updated) {
      res.status(404).json({ error: 'Alert not found' });
      return;
    }
    res.json(updated);
  });

  // 5. Customer Support & Concierge Tickets
  app.get('/api/support-tickets', (_req: Request, res: Response) => {
    res.json(database.getSupportTickets());
  });

  app.post('/api/support-tickets', (req: Request, res: Response) => {
    const ticket = database.createSupportTicket(req.body);
    res.status(201).json(ticket);
  });

  app.post('/api/support-tickets/:id/reply', (req: Request, res: Response) => {
    const { text, sender, senderName } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Message text required' });
      return;
    }
    const updated = database.addSupportMessage(req.params.id, text, sender, senderName);
    if (!updated) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }
    res.json(updated);
  });

  // 6. Transactions & Invoicing (Payments)
  app.get('/api/transactions', (_req: Request, res: Response) => {
    res.json(database.getTransactions());
  });

  app.post('/api/transactions', (req: Request, res: Response) => {
    const txn = database.createTransaction(req.body);
    res.status(201).json(txn);
  });

  app.post('/api/transactions/:id/refund', (req: Request, res: Response) => {
    const updated = database.processRefund(req.params.id);
    if (!updated) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.json(updated);
  });

  // 7. In-App Encrypted Chat
  app.get('/api/chats/:id/messages', (req: Request, res: Response) => {
    res.json(database.getChatMessages(req.params.id));
  });

  app.post('/api/chats/:id/messages', (req: Request, res: Response) => {
    const msg = database.addChatMessage(req.params.id, req.body);
    res.status(201).json(msg);
  });

  // 8. Kundali Milan Calculator
  app.post('/api/kundali/calculate', (req: Request, res: Response) => {
    const { candidate1Id, candidate2Id } = req.body;
    const result = database.calculateKundaliMilan(candidate1Id, candidate2Id);
    res.json(result);
  });

  // 9. Governance & System Settings
  app.get('/api/settings', (_req: Request, res: Response) => {
    res.json(database.getSettings());
  });

  app.post('/api/settings', (req: Request, res: Response) => {
    const updated = database.updateSettings(req.body);
    res.json(updated);
  });

  // === VITE / STATIC SERVING ===
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OnlyProfessional Matrimony Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
