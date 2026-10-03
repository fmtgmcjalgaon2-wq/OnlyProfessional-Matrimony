import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { 
  PlatformStats, 
  VerificationItem, 
  FraudAlert, 
  SupportTicket, 
  Transaction, 
  SystemSettings 
} from '../../types';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  AlertOctagon, 
  Headphones, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Power, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Send, 
  RefreshCw,
  Search,
  Filter,
  Flame,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Users
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'fraud' | 'support' | 'payments' | 'analytics' | 'settings'>('overview');
  
  // Data states from backend
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [verificationQueue, setVerificationQueue] = useState<VerificationItem[]>([]);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Active item inspection states
  const [selectedVerificationItem, setSelectedVerificationItem] = useState<VerificationItem | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadAllAdminData = async () => {
    try {
      setLoading(true);
      const [s, vq, fa, st, tx, set] = await Promise.all([
        api.getStats(),
        api.getVerificationQueue(),
        api.getFraudAlerts(),
        api.getSupportTickets(),
        api.getTransactions(),
        api.getSettings()
      ]);
      setStats(s);
      setVerificationQueue(vq);
      if (vq.length > 0 && !selectedVerificationItem) {
        setSelectedVerificationItem(vq[0]);
      }
      setFraudAlerts(fa);
      setSupportTickets(st);
      if (st.length > 0 && !selectedTicket) {
        setSelectedTicket(st[0]);
      }
      setTransactions(tx);
      setSettings(set);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Actions
  const handleReviewVerification = async (action: 'approved' | 'rejected' | 'doc_requested') => {
    if (!selectedVerificationItem) return;
    try {
      await api.reviewVerificationItem(selectedVerificationItem.id, action);
      triggerToast(`Candidate ${selectedVerificationItem.candidateName} ${action.toUpperCase()}!`);
      loadAllAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFraudAction = async (id: string, action: 'quarantined' | 'blocked' | 'dismissed') => {
    try {
      await api.takeFraudAction(id, action);
      triggerToast(`Fraud Alert #${id} marked as ${action.toUpperCase()}`);
      loadAllAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendTicketReply = async () => {
    if (!selectedTicket || !replyText.trim()) return;
    try {
      await api.replySupportTicket(selectedTicket.id, replyText);
      setReplyText('');
      triggerToast('Reply dispatched to member via in-app & WhatsApp Concierge.');
      loadAllAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleProcessRefund = async (id: string) => {
    try {
      await api.processRefund(id);
      triggerToast(`Transaction #${id} successfully refunded.`);
      loadAllAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleSetting = async (key: keyof SystemSettings) => {
    if (!settings) return;
    try {
      const updated = await api.updateSettings({ [key]: !settings[key] });
      setSettings(updated);
      triggerToast(`Security protocol [${key}] updated.`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-[#f9f9ff] text-[#171c25]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ADMIN SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Top Brand Header */}
          <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#c1272d] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                OP
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-[#9e0418] leading-tight">Master Console</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Trust &amp; Security</span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#c1272d] text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('verification')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'verification'
                  ? 'bg-[#c1272d] text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Verification Ops</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'verification' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
              }`}>
                {verificationQueue.filter(v => v.status === 'pending').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('fraud')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'fraud'
                  ? 'bg-[#c1272d] text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <AlertOctagon className="w-4 h-4" />
                <span>Fraud &amp; Risk Shield</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'fraud' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-800'
              }`}>
                3 High
              </span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'support'
                  ? 'bg-[#c1272d] text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Headphones className="w-4 h-4" />
                <span>Customer Support</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'support' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {supportTickets.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'payments'
                  ? 'bg-[#c1272d] text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payments &amp; Revenue</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#c1272d] text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Platform Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#c1272d] text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>System &amp; Audit Logs</span>
            </button>
          </nav>
        </div>

        {/* Bottom Officer Profile & Emergency Killswitch */}
        <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/50">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#c1272d] text-white flex items-center justify-center text-xs font-bold">
                VR
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 leading-tight">Virendra Rathore</span>
                <span className="text-[10px] text-slate-500">Super Admin / DPO</span>
              </div>
            </div>
            <button 
              onClick={() => triggerToast('Logged in as Super Admin')}
              className="text-slate-400 hover:text-slate-600"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          <button
            onClick={() => handleToggleSetting('emergencyKillswitch')}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              settings?.emergencyKillswitch
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-red-50 hover:bg-red-100 text-red-700'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{settings?.emergencyKillswitch ? 'KILLSWITCH ACTIVE' : 'Emergency Killswitch'}</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              {activeTab === 'overview' && 'Operational Command Center'}
              {activeTab === 'verification' && 'Verification Ops & 4-Pillar Queue'}
              {activeTab === 'fraud' && 'Fraud Sentinel & Heuristics Radar'}
              {activeTab === 'support' && 'VIP Concierge & Support Desk'}
              {activeTab === 'payments' && 'Payment Gateway & Revenue Ledger'}
              {activeTab === 'analytics' && 'Platform Analytics & Match Intelligence'}
              {activeTab === 'settings' && 'System Settings & Audit Log Ledger'}
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
              Live Edge (ap-south-1)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <button 
              onClick={loadAllAdminData}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Telemetry</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT AREA */}
        <div className="p-6 space-y-6">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && stats && (
            <div className="space-y-6">
              {/* Executive Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">Active Seekers Online</span>
                    <div className="text-2xl font-bold text-slate-900 mt-1">{stats.activeSeekersOnline.toLocaleString()}</div>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> +12.4% vs 24h
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#c1272d] flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">Pending Verification</span>
                    <div className="text-2xl font-bold text-[#c1272d] mt-1">{stats.verificationQueuePending}</div>
                    <span className="text-xs text-amber-700 font-medium mt-1 block">Avg SLA: 42 mins (98.4% On-Target)</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">Today's Revenue</span>
                    <div className="text-2xl font-bold text-slate-900 mt-1">₹{(stats.todayRevenue / 100000).toFixed(2)} Lakhs</div>
                    <span className="text-xs text-emerald-600 font-semibold block mt-1">MRR ₹{(stats.mrr / 100000).toFixed(1)}L • ARR ₹{(stats.arr / 10000000).toFixed(2)}Cr</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">Threat Shield Radar</span>
                    <div className="text-2xl font-bold text-emerald-700 mt-1">98.4%</div>
                    <span className="text-xs text-slate-500 font-medium block mt-1">I4C Sync: Connected &amp; Stable</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* 7-State Lifecycle Distribution */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Archival Lifecycle Distribution (7 States)</span>
                  <span className="text-xs text-slate-400">Total Users: 248,920</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs text-center">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Users</span>
                    <span className="text-base font-bold text-slate-900 mt-0.5 block">248,920</span>
                    <span className="text-[10px] text-emerald-600">+12% MoM</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Today New</span>
                    <span className="text-base font-bold text-slate-900 mt-0.5 block">{stats.todayNewRegistrations}</span>
                    <span className="text-[10px] text-slate-500">84% mobile</span>
                  </div>
                  <div className="p-3 bg-red-50 rounded-xl">
                    <span className="text-red-700 block text-[10px] uppercase font-bold">Audit Pending</span>
                    <span className="text-base font-bold text-[#c1272d] mt-0.5 block">{stats.verificationQueuePending}</span>
                    <span className="text-[10px] text-red-600 font-semibold">SLA Critical</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <span className="text-emerald-800 block text-[10px] uppercase font-bold">Verified</span>
                    <span className="text-base font-bold text-emerald-800 mt-0.5 block">{stats.verifiedCount.toLocaleString()}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">94.2% Trust</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Rejected</span>
                    <span className="text-base font-bold text-slate-700 mt-0.5 block">{stats.rejectedCount}</span>
                    <span className="text-[10px] text-slate-500">Doc Mismatch</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <span className="text-amber-800 block text-[10px] uppercase font-bold">Reported</span>
                    <span className="text-base font-bold text-amber-900 mt-0.5 block">{stats.reportedCount}</span>
                    <span className="text-[10px] text-amber-700 font-semibold">Active Triage</span>
                  </div>
                  <div className="p-3 bg-slate-100 rounded-xl">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Suspended</span>
                    <span className="text-base font-bold text-slate-900 mt-0.5 block">{stats.quarantinedAccounts}</span>
                    <span className="text-[10px] text-red-600 font-semibold">IMEI Locked</span>
                  </div>
                </div>
              </div>

              {/* Two Column Command Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Pending Verification Snippet */}
                <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-slate-900">Live Verification Queue</h3>
                      <p className="text-xs text-slate-500">Candidates awaiting manual / algorithmic sign-off</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('verification')}
                      className="text-xs font-semibold text-[#c1272d] hover:underline"
                    >
                      View All ({verificationQueue.length})
                    </button>
                  </div>

                  <div className="space-y-2">
                    {verificationQueue.slice(0, 3).map(item => (
                      <div 
                        key={item.id}
                        onClick={() => { setSelectedVerificationItem(item); setActiveTab('verification'); }}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img src={item.candidatePhoto} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <span className="font-bold text-slate-900 text-xs block">{item.candidateName}</span>
                            <span className="text-[11px] text-slate-500">{item.profession}</span>
                          </div>
                        </div>
                        <div className="text-right text-xs">
                          <span className="text-[10px] bg-red-100 text-[#9e0418] px-2 py-0.5 rounded-full font-bold">{item.documentType}</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">SLA: {item.slaMinutesLeft}m</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fraud Alerts Snippet */}
                <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-slate-900">Active Sentinel Alerts</h3>
                      <p className="text-xs text-slate-500">High-risk multi-vector intercepts</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('fraud')}
                      className="text-xs font-semibold text-[#c1272d] hover:underline"
                    >
                      Inspect
                    </button>
                  </div>

                  <div className="space-y-2">
                    {fraudAlerts.slice(0, 2).map(alert => (
                      <div key={alert.id} className="p-3 rounded-xl bg-red-50/50 border border-red-100 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{alert.candidateName}</span>
                          <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                            Score {alert.riskScore}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-1">{alert.triggerVector}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VERIFICATION OPS */}
          {activeTab === 'verification' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Queue List (4 cols) */}
              <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-slate-900">Pending Review ({verificationQueue.length})</h3>
                  <span className="text-xs text-slate-500">SLA Active</span>
                </div>

                <div className="space-y-2">
                  {verificationQueue.map(item => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedVerificationItem(item)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedVerificationItem?.id === item.id
                          ? 'border-[#c1272d] bg-red-50/20 shadow-sm'
                          : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.candidatePhoto} alt="" className="w-11 h-11 rounded-lg object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs truncate">{item.candidateName}</span>
                            <span className="text-[10px] bg-red-100 text-[#9e0418] px-1.5 py-0.2 rounded font-bold">
                              {item.documentType}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 truncate block mt-0.5">{item.profession}</span>
                          <span className="text-[10px] text-emerald-700 font-semibold block mt-1">OCR: {item.ocrExtracted.matchRate}% Match</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Pane (8 cols) */}
              {selectedVerificationItem ? (
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                  {/* Candidate Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src={selectedVerificationItem.candidatePhoto} alt="" className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-xl font-bold text-slate-900">{selectedVerificationItem.candidateName}</h3>
                          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                            {selectedVerificationItem.candidateId}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{selectedVerificationItem.profession}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 uppercase font-semibold block">OCR Match Index</span>
                      <span className="text-2xl font-bold text-[#c1272d]">{selectedVerificationItem.ocrExtracted.matchRate}%</span>
                    </div>
                  </div>

                  {/* Side-by-side OCR Cross Check */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Stated Data */}
                    <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                      <span className="font-bold text-slate-900 uppercase tracking-wider block text-[10px]">Stated Candidate Profile</span>
                      <div className="space-y-2">
                        <div className="flex justify-between pb-1 border-b border-slate-200">
                          <span className="text-slate-500">Legal Name:</span>
                          <span className="font-semibold text-slate-900">{selectedVerificationItem.statedData.name}</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-slate-200">
                          <span className="text-slate-500">Date of Birth:</span>
                          <span className="font-semibold text-slate-900">{selectedVerificationItem.statedData.dob}</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-slate-200">
                          <span className="text-slate-500">Father's Name:</span>
                          <span className="font-semibold text-slate-900">{selectedVerificationItem.statedData.fatherName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">City / State:</span>
                          <span className="font-semibold text-slate-900">{selectedVerificationItem.statedData.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* OCR Extracted Data */}
                    <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                      <span className="font-bold text-slate-900 uppercase tracking-wider block text-[10px]">DigiLocker OCR Extracted Data</span>
                      <div className="space-y-2">
                        <div className="flex justify-between pb-1 border-b border-slate-200">
                          <span className="text-slate-500">Extracted Name:</span>
                          <span className="font-semibold text-slate-900">{selectedVerificationItem.ocrExtracted.name}</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-slate-200">
                          <span className="text-slate-500">Extracted DOB:</span>
                          <span className="font-semibold text-slate-900">{selectedVerificationItem.ocrExtracted.dob}</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-slate-200">
                          <span className="text-slate-500">Document ID:</span>
                          <span className="font-semibold text-slate-900 font-mono">{selectedVerificationItem.documentNumberMasked}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Cryptographic Seal:</span>
                          <span className="font-semibold text-emerald-700">UIDAI Verified ✓</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReviewVerification('doc_requested')}
                        className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                      >
                        Request Clearer Doc
                      </button>
                      <button
                        onClick={() => handleReviewVerification('rejected')}
                        className="px-4 py-2 rounded-full bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold"
                      >
                        Reject &amp; Flag
                      </button>
                    </div>

                    <button
                      onClick={() => handleReviewVerification('approved')}
                      className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve &amp; Grant 4-Pillar Shield</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 3: FRAUD ENGINE */}
          {activeTab === 'fraud' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Fraud Engine Command Center</h3>
                  <p className="text-xs text-slate-500">Real-time heuristics &amp; perceptual vector matching across matrimonial registries.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                    Production Shield Active
                  </span>
                </div>
              </div>

              {/* Fraud Intercepts Table */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-serif font-bold text-slate-900 text-sm">Active Multi-Vector Intercepts</span>
                  <span className="text-xs text-slate-400">Continuous 24h background scan</span>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {fraudAlerts.map(alert => (
                    <div key={alert.id} className="p-4 hover:bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <img src={alert.photo} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{alert.candidateName}</span>
                            <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold">
                              Risk {alert.riskScore}/100
                            </span>
                          </div>
                          <span className="text-slate-600 block mt-0.5">{alert.claimedProfession}</span>
                          <p className="text-slate-500 mt-1">{alert.details}</p>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{alert.phone} • {alert.ipGeo}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleFraudAction(alert.id, 'quarantined')}
                          className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 font-semibold hover:bg-amber-200"
                        >
                          Quarantine
                        </button>
                        <button
                          onClick={() => handleFraudAction(alert.id, 'blocked')}
                          className="px-3 py-1.5 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 shadow-sm"
                        >
                          Permanent Ban
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMER SUPPORT */}
          {activeTab === 'support' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Tickets List (4 cols) */}
              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-slate-900">Concierge Desk Tickets</h3>
                  <span className="text-xs text-slate-400">14 Active</span>
                </div>

                <div className="space-y-2">
                  {supportTickets.map(ticket => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedTicket?.id === ticket.id
                          ? 'border-[#c1272d] bg-red-50/20 shadow-sm'
                          : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 truncate">{ticket.memberName}</span>
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                          {ticket.tier}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium line-clamp-1">{ticket.subject}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                        <span>Assigned: {ticket.assignedTo}</span>
                        <span className="text-red-600 font-semibold">SLA: {ticket.slaMinutesRemaining}m</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat / Ticket Reply Panel (7 cols) */}
              {selectedTicket ? (
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src={selectedTicket.memberPhoto} alt="" className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-serif text-base font-bold text-slate-900">{selectedTicket.memberName}</h4>
                        <p className="text-xs text-slate-500">{selectedTicket.subject}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">#{selectedTicket.id}</span>
                  </div>

                  {/* Messages Stream */}
                  <div className="p-4 bg-slate-50 rounded-2xl space-y-3 max-h-72 overflow-y-auto text-xs">
                    {selectedTicket.messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${
                          m.sender === 'agent' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                            m.sender === 'agent'
                              ? 'bg-[#c1272d] text-white rounded-tr-xs'
                              : m.sender === 'system'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-white text-slate-800 rounded-tl-xs shadow-sm'
                          }`}
                        >
                          <p>{m.text}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1">
                          {m.senderName} • {m.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input */}
                  <div className="space-y-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type response to member (will sync to candidate WhatsApp / In-app)..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-600/20"
                      rows={3}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-slate-400">Encrypted Concierge Channel</span>
                      <button
                        onClick={handleSendTicketReply}
                        className="px-5 py-2 rounded-full bg-[#c1272d] hover:bg-[#9e0418] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 5: PAYMENTS & REVENUE */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Matrimonial Billing &amp; Settlement Ledger</h3>
                  <p className="text-xs text-slate-500">Live ledger conforming to Indian GST (18%) and RBI recurring e-mandates.</p>
                </div>
                <div className="text-xs text-slate-600 font-semibold bg-slate-100 px-3 py-1 rounded-full">
                  All accounts reconciled (T+0 settlement)
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="p-3">Txn ID / Invoice</th>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Plan / Service</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Channel</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {transactions.map(txn => (
                      <tr key={txn.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-900">{txn.id}<div className="text-[10px] text-slate-400 font-normal">{txn.invoiceId}</div></td>
                        <td className="p-3 font-semibold text-slate-900">{txn.memberName}</td>
                        <td className="p-3">{txn.planName}</td>
                        <td className="p-3 font-bold text-slate-900">₹{txn.amount.toLocaleString()}</td>
                        <td className="p-3">{txn.paymentMethod}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            txn.status === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : txn.status === 'Refund Pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {txn.status === 'Refund Pending' && (
                            <button
                              onClick={() => handleProcessRefund(txn.id)}
                              className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-bold hover:bg-red-200"
                            >
                              Approve Refund
                            </button>
                          )}
                          {txn.status === 'Paid' && (
                            <button
                              onClick={() => alert(`Downloading GST Invoice #${txn.invoiceId}...`)}
                              className="text-slate-500 hover:text-slate-900"
                            >
                              <FileText className="w-4 h-4 inline" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PLATFORM ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Conversion Funnel */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <h4 className="font-serif text-base font-bold text-slate-900">Match Funnel Progression</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Profile Views</span>
                        <span className="font-bold">100,000</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#c1272d] h-full w-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Interest Connects Sent</span>
                        <span className="font-bold">18,000 (18%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#c1272d] h-full w-[18%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Mutual Acceptance</span>
                        <span className="font-bold">6,200 (34.4%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full w-[6.2%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Family Courtship Meetings</span>
                        <span className="font-bold">1,842 Vivah Formed</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-600 h-full w-[1.8%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guna Milan Distribution */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 text-center">
                  <h4 className="font-serif text-base font-bold text-slate-900 text-left">Guna Milan Score Distribution</h4>
                  <div className="py-4">
                    <div className="text-3xl font-serif font-bold text-[#c1272d]">62%</div>
                    <span className="text-slate-500 block mt-1">28–36 Gunas (Uttam Milan)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-left">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">18–27 Gunas</span>
                      <span className="font-bold text-slate-800">31% (Madhyam)</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Under 18 Gunas</span>
                      <span className="font-bold text-slate-800">7% (Guarded)</span>
                    </div>
                  </div>
                </div>

                {/* Professional Clusters */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <h4 className="font-serif text-base font-bold text-slate-900">Demographic Archetypes</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tech &amp; Engineering (Tier-1)</span>
                      <span className="font-bold">34%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Doctors &amp; MD Surgeons</span>
                      <span className="font-bold">22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investment Bankers &amp; CAs</span>
                      <span className="font-bold">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Civil Services (IAS/IPS) &amp; Law</span>
                      <span className="font-bold">14%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Founders &amp; CXOs</span>
                      <span className="font-bold">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & AUDIT LOGS */}
          {activeTab === 'settings' && settings && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Security Governance &amp; Policy Toggles</h3>
                  <p className="text-xs text-slate-500">Configure real-time enforcement and regulatory compliance gates.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">Metro Zero-Trust Checkpoint Lock</span>
                      <p className="text-slate-500 mt-0.5">Mandatory DigiLocker OTP &amp; Liveness before contact initiation across Delhi NCR, Mumbai, &amp; Bengaluru.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.metroZeroTrustLock}
                      onChange={() => handleToggleSetting('metroZeroTrustLock')}
                      className="w-5 h-5 accent-[#c1272d] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">pHash Steganographic Deduplication</span>
                      <p className="text-slate-500 mt-0.5">Automated reverse image cross-referencing against scraped social media and celebrity databases.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.pHashDeduplication}
                      onChange={() => handleToggleSetting('pHashDeduplication')}
                      className="w-5 h-5 accent-[#c1272d] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">DPDP Act 2023 Cryptographic Audit Logging</span>
                      <p className="text-slate-500 mt-0.5">Immutable SHA-256 chain log for all verification and data inspection actions.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.dpdp2023AuditLogging}
                      onChange={() => handleToggleSetting('dpdp2023AuditLogging')}
                      className="w-5 h-5 accent-[#c1272d] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-2 font-mono">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Immutable SHA-256 Audit Trail</span>
                  <div>[14:32:04 IST] Admin #ADM-04 authorized 4-Pillar DigiLocker certification for #OPM-9821.</div>
                  <div>[14:28:11 IST] Payment webhook TXN-998411 settled via UPI AutoPay.</div>
                  <div>[14:15:30 IST] Sentinel Rule 7 intercepted airport customs fee scam attempt. Entity quarantined.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
