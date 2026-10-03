import {
  Profile,
  VerificationItem,
  FraudAlert,
  SupportTicket,
  Transaction,
  ChatMessage,
  PlatformStats,
  KundaliResult,
  SystemSettings
} from '../types';

export const api = {
  async getStats(): Promise<PlatformStats> {
    const res = await fetch('/api/stats');
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  async getProfiles(params?: { search?: string; gender?: string; profession?: string; status?: string; minGunas?: number }): Promise<Profile[]> {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.gender) query.set('gender', params.gender);
    if (params?.profession) query.set('profession', params.profession);
    if (params?.status) query.set('status', params.status);
    if (params?.minGunas) query.set('minGunas', params.minGunas.toString());

    const res = await fetch(`/api/profiles?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch profiles');
    return res.json();
  },

  async getProfileById(id: string): Promise<Profile> {
    const res = await fetch(`/api/profiles/${id}`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  async createProfile(data: Partial<Profile>): Promise<Profile> {
    const res = await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create profile');
    return res.json();
  },

  async getVerificationQueue(): Promise<VerificationItem[]> {
    const res = await fetch('/api/verification-queue');
    if (!res.ok) throw new Error('Failed to fetch verification queue');
    return res.json();
  },

  async reviewVerificationItem(id: string, action: 'approved' | 'rejected' | 'doc_requested', notes?: string): Promise<VerificationItem> {
    const res = await fetch(`/api/verification-queue/${id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, notes })
    });
    if (!res.ok) throw new Error('Failed to review verification item');
    return res.json();
  },

  async getFraudAlerts(): Promise<FraudAlert[]> {
    const res = await fetch('/api/fraud-alerts');
    if (!res.ok) throw new Error('Failed to fetch fraud alerts');
    return res.json();
  },

  async takeFraudAction(id: string, action: 'quarantined' | 'blocked' | 'dismissed'): Promise<FraudAlert> {
    const res = await fetch(`/api/fraud-alerts/${id}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    });
    if (!res.ok) throw new Error('Failed to take fraud action');
    return res.json();
  },

  async getSupportTickets(): Promise<SupportTicket[]> {
    const res = await fetch('/api/support-tickets');
    if (!res.ok) throw new Error('Failed to fetch support tickets');
    return res.json();
  },

  async createSupportTicket(data: Partial<SupportTicket>): Promise<SupportTicket> {
    const res = await fetch('/api/support-tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create support ticket');
    return res.json();
  },

  async replySupportTicket(id: string, text: string, senderName = 'Trust Officer'): Promise<SupportTicket> {
    const res = await fetch(`/api/support-tickets/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, sender: 'agent', senderName })
    });
    if (!res.ok) throw new Error('Failed to reply to ticket');
    return res.json();
  },

  async getTransactions(): Promise<Transaction[]> {
    const res = await fetch('/api/transactions');
    if (!res.ok) throw new Error('Failed to fetch transactions');
    return res.json();
  },

  async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create transaction');
    return res.json();
  },

  async processRefund(id: string): Promise<Transaction> {
    const res = await fetch(`/api/transactions/${id}/refund`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to process refund');
    return res.json();
  },

  async getChatMessages(chatId: string): Promise<ChatMessage[]> {
    const res = await fetch(`/api/chats/${chatId}/messages`);
    if (!res.ok) throw new Error('Failed to fetch chat messages');
    return res.json();
  },

  async sendChatMessage(chatId: string, message: Partial<ChatMessage>): Promise<ChatMessage> {
    const res = await fetch(`/api/chats/${chatId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  },

  async calculateKundaliMilan(candidate1Id: string, candidate2Id: string): Promise<KundaliResult> {
    const res = await fetch('/api/kundali/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidate1Id, candidate2Id })
    });
    if (!res.ok) throw new Error('Failed to calculate Kundali');
    return res.json();
  },

  async getSettings(): Promise<SystemSettings> {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  },

  async updateSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  }
};
