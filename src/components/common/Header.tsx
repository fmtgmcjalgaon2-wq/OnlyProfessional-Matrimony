import React from 'react';
import { Shield, Sparkles, Monitor, Smartphone, Lock, Search } from 'lucide-react';

interface HeaderProps {
  currentView: 'portal' | 'admin' | 'mobile';
  onViewChange: (view: 'portal' | 'admin' | 'mobile') => void;
  onOpenKundali: () => void;
  onOpenMembership: () => void;
  onOpenTrustCenter: () => void;
  onSelectProfile: (id: string) => void;
  onOpenCreateProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenKundali,
  onOpenMembership,
  onOpenTrustCenter,
  onSelectProfile
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-[#e4e8f6] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Banner / Switcher Bar */}
      <div className="bg-[#171c25] text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">Prototype Active: Backend API &amp; Database Connected</span>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline text-amber-300">4-Pillar Verification • 36 Gunas Vedic Engine</span>
        </div>

        {/* High-visibility Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => onViewChange('portal')}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView === 'portal'
                ? 'bg-[#c1272d] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Web Portal</span>
          </button>
          <button
            onClick={() => onViewChange('admin')}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView === 'admin'
                ? 'bg-[#c1272d] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Console</span>
          </button>
          <button
            onClick={() => onViewChange('mobile')}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView === 'mobile'
                ? 'bg-[#c1272d] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Area */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => onViewChange('portal')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#c1272d] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              OP
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold text-[#9e0418] tracking-tight leading-tight">
                OnlyProfessional
              </span>
              <span className="text-[10px] tracking-widest text-[#6a4500] uppercase font-semibold">
                Trust &amp; Pedigree
              </span>
            </div>
          </div>

          {/* Navigation Links for Web Portal */}
          {currentView === 'portal' && (
            <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-600">
              <button
                onClick={() => onViewChange('portal')}
                className="px-3 py-1.5 rounded-full text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Discover Matches
              </button>
              <button
                onClick={() => onSelectProfile('OPM-9821')}
                className="px-3 py-1.5 rounded-full text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1"
              >
                <span>Sample Dossier</span>
                <span className="text-[10px] bg-red-100 text-[#c1272d] px-1.5 py-0.2 rounded-full font-bold">VIP</span>
              </button>
              <button
                onClick={onOpenKundali}
                className="px-3 py-1.5 rounded-full text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6a4500]" />
                <span>36 Gunas Vedic Milan</span>
              </button>
              <button
                onClick={onOpenMembership}
                className="px-3 py-1.5 rounded-full text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Membership Plans
              </button>
              <button
                onClick={onOpenTrustCenter}
                className="px-3 py-1.5 rounded-full text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>DPDP 2023 Trust Center</span>
              </button>
            </nav>
          )}
        </div>

        {/* Right Action Zone */}
        <div className="flex items-center gap-3">
          {currentView === 'portal' && (
            <div className="hidden lg:flex items-center bg-[#f0f3ff] rounded-full px-3 py-1.5 text-sm text-slate-700">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Doctor, VP, IAS, IIM..."
                className="bg-transparent border-0 outline-none w-40 text-xs text-slate-800 placeholder:text-slate-400"
              />
            </div>
          )}

          {/* User Status / Mode Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-semibold text-slate-900 leading-tight">Dr. Aditi R.</span>
              <span className="block text-[10px] text-emerald-700 font-medium">4-Pillar Verified</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#c1272d] text-white flex items-center justify-center font-bold text-xs ring-2 ring-amber-200">
              AR
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
