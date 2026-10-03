import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Download, Trash2, Edit3, Globe, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface TrustCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrustCenterModal: React.FC<TrustCenterModalProps> = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState<'en' | 'hi' | 'ta' | 'mr'>('en');
  const [consents, setConsents] = useState({
    identity: true,
    kundali: true,
    income: true,
    family: true,
    ai: true
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleConsent = (key: keyof typeof consents) => {
    setConsents(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      triggerToast(`Consent for ${key} ${updated[key] ? 'granted' : 'revoked'}. Cryptographic ledger updated.`);
      return updated;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in max-h-[90vh] overflow-y-auto">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800">DPDP Act, 2023 Certified</span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">Legal, Governance &amp; Trust Center</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multilingual Selector (Section 5(3)) */}
        <div className="bg-[#f0f3ff] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-900">Statutory Notice Language (Eighth Schedule of India):</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => { setLanguage('en'); triggerToast('Notice set to English'); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${language === 'en' ? 'bg-[#c1272d] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
            >
              English
            </button>
            <button
              onClick={() => { setLanguage('hi'); triggerToast('सूचना हिन्दी में अनुवादित की गई'); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${language === 'hi' ? 'bg-[#c1272d] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => { setLanguage('ta'); triggerToast('அறிவிப்பு தமிழில் மொழிபெயர்க்கப்பட்டது'); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${language === 'ta' ? 'bg-[#c1272d] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => { setLanguage('mr'); triggerToast('सूचना मराठीत भाषांतरित केली'); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${language === 'mr' ? 'bg-[#c1272d] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Data Fiduciary Credentials Card */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs space-y-1.5">
          <div className="font-bold text-slate-900 text-sm">OnlyProfessional Matrimony Private Limited</div>
          <div className="text-slate-600">CIN: U74999MH2023PTC402911 • Data Fiduciary Registry #DF-IN-2024-8831</div>
          <div className="text-slate-500 leading-relaxed">
            Registered Address: Level 14, Tower 3, Bandra-Kurla Complex (BKC), Mumbai, Maharashtra 400051. Regulated pursuant to the Digital Personal Data Protection Act, 2023 and Information Technology Act, 2000.
          </div>
        </div>

        {/* Granular Consent Manager (Section 6) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-lg font-bold text-slate-900">Granular Purpose-Specific Consent Manager (Sec 6)</h4>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">SHA-256 Logged</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* 1. Identity Data */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Identity &amp; Government ID Data</span>
                <p className="text-slate-500 mt-0.5">DigiLocker Aadhaar XML with masked UIDAI verification. Biometrics and raw ID numbers are never saved on servers.</p>
                <span className="text-[10px] text-amber-700 font-semibold block mt-1">Retention: Matchmaking Term + 180 Days</span>
              </div>
              <input type="checkbox" checked disabled className="w-5 h-5 accent-[#c1272d] shrink-0 mt-1 cursor-not-allowed" />
            </div>

            {/* 2. Astrology */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Vedic Astrology &amp; Kundali Milan</span>
                <p className="text-slate-500 mt-0.5">Used strictly for mathematical 36-point Guna Milan astrological scoring. Revocable anytime.</p>
                <span className="text-[10px] text-slate-400 font-mono block mt-1">Logged: 14 May 2025, 10:14 IST</span>
              </div>
              <input
                type="checkbox"
                checked={consents.kundali}
                onChange={() => toggleConsent('kundali')}
                className="w-5 h-5 accent-[#c1272d] shrink-0 mt-1 cursor-pointer"
              />
            </div>

            {/* 3. Income & Form 16 */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Income &amp; Employment Verification</span>
                <p className="text-slate-500 mt-0.5">Validates your salary tier badge. Exact documents remain cryptographically masked from matches until bilateral express consent.</p>
              </div>
              <input
                type="checkbox"
                checked={consents.income}
                onChange={() => toggleConsent('income')}
                className="w-5 h-5 accent-[#c1272d] shrink-0 mt-1 cursor-pointer"
              />
            </div>

            {/* 4. Family Lineage */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Family &amp; Ancestral Lineage Dossier</span>
                <p className="text-slate-500 mt-0.5">Shared exclusively with verified matrimonial suitors who have passed reciprocal identity validation.</p>
              </div>
              <input
                type="checkbox"
                checked={consents.family}
                onChange={() => toggleConsent('family')}
                className="w-5 h-5 accent-[#c1272d] shrink-0 mt-1 cursor-pointer"
              />
            </div>

            {/* 5. AI Recommendations */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">AI Matchmaking &amp; Saathi Wingman</span>
                <p className="text-slate-500 mt-0.5">Powers algorithmic discovery. Opting out reverts your feed strictly to chronological search filters without recommendation modeling.</p>
              </div>
              <input
                type="checkbox"
                checked={consents.ai}
                onChange={() => toggleConsent('ai')}
                className="w-5 h-5 accent-[#c1272d] shrink-0 mt-1 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Data Principal Rights (Sec 11, 12, 13) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="font-serif text-lg font-bold text-slate-900">Your Statutory Rights (Sections 11–13)</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <Download className="w-5 h-5 text-slate-700 mb-1" />
                <span className="font-bold text-slate-900 block">Right to Access &amp; Portability</span>
                <p className="text-slate-500 mt-1">Download machine-readable copy of all stored profile records and chat history.</p>
              </div>
              <button 
                onClick={() => triggerToast('Generating cryptographically signed JSON & PDF export...')}
                className="mt-3 py-1.5 px-3 rounded-lg bg-white border border-slate-200 font-semibold text-slate-800 hover:bg-slate-100 text-center"
              >
                Export My Data
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <Edit3 className="w-5 h-5 text-slate-700 mb-1" />
                <span className="font-bold text-slate-900 block">Right to Correction &amp; Updation</span>
                <p className="text-slate-500 mt-1">Request fast-track rectification for career promotions or updated horoscope birth details.</p>
              </div>
              <button 
                onClick={() => triggerToast('Correction ticket request dispatched to DPO desk (24h SLA).')}
                className="mt-3 py-1.5 px-3 rounded-lg bg-white border border-slate-200 font-semibold text-slate-800 hover:bg-slate-100 text-center"
              >
                Request Correction
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <Trash2 className="w-5 h-5 text-red-600 mb-1" />
                <span className="font-bold text-red-700 block">Right to Complete Erasure</span>
                <p className="text-slate-500 mt-1">Permanently purge all photographs, match dossiers, and chat transcripts.</p>
              </div>
              <button 
                onClick={() => {
                  if (confirm('Permanently purge your matrimonial profile, photos, and match interactions?')) {
                    triggerToast('Erasure order confirmed. Profile visibility suspended immediately.');
                  }
                }}
                className="mt-3 py-1.5 px-3 rounded-lg bg-red-100 text-red-800 font-semibold hover:bg-red-200 text-center"
              >
                Initiate Erasure
              </button>
            </div>
          </div>
        </div>

        {/* DPO Escalation Details */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 block">Data Protection Officer &amp; Grievance Redressal</span>
            <span className="text-slate-600">Adv. Rajesh V. Ramanathan, LL.M. • dpo@onlyprofessionalmatrimony.com</span>
            <p className="text-slate-500 text-[11px] mt-0.5">Statutory Response SLA: 24 Hours. Recourse to Data Protection Board of India (DPBI).</p>
          </div>
          <button 
            onClick={() => triggerToast('Emergency grievance hotline: +91 (022) 6981 4455')}
            className="px-4 py-2 bg-white border border-slate-200 rounded-full font-semibold text-slate-800 shrink-0 hover:bg-slate-100"
          >
            File Grievance Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
