import React, { useState, useEffect } from 'react';
import { Profile } from '../../types';
import { api } from '../../services/api';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Search, 
  Filter, 
  ChevronRight, 
  Smartphone,
  CheckCircle2,
  Lock,
  Star
} from 'lucide-react';

interface PortalHomeProps {
  onSelectProfile: (id: string) => void;
  onOpenKundali: () => void;
  onOpenMembership: () => void;
  onOpenTrustCenter: () => void;
  onOpenMobileView: () => void;
}

export const PortalHome: React.FC<PortalHomeProps> = ({
  onSelectProfile,
  onOpenKundali,
  onOpenMembership,
  onOpenTrustCenter,
  onOpenMobileView
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState<string>('female');
  const [professionFilter, setProfessionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [connectedIds, setConnectedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadProfiles();
  }, [genderFilter, professionFilter]);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const data = await api.getProfiles({
        gender: genderFilter !== 'all' ? genderFilter : undefined,
        profession: professionFilter !== 'all' ? professionFilter : undefined,
        search: searchQuery || undefined
      });
      setProfiles(data);
    } catch (err) {
      console.error('Failed to load profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setConnectedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff] text-[#171c25]">
      {/* Immersive Discovery Hero */}
      <section className="relative w-full overflow-hidden bg-[#f0f3ff] pt-8 pb-16">
        {/* Soft Ambient Radial Accents */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-red-900/5 blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Eyebrow and Tagline */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1 rounded-full shadow-sm border border-slate-200/60">
              <ShieldCheck className="w-4 h-4 text-[#9e0418]" />
              <span className="text-xs text-[#9e0418] uppercase tracking-widest font-bold">The Sanctuary of High-Intent Matrimony</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
              <span className="text-xs text-slate-700 font-medium hidden sm:inline">India's Trusted Verified Matrimonial Network for a Clearly Defined Group of People</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-600">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span>418 Senior Professionals Active in Mumbai &amp; Delhi NCR</span>
            </div>
          </div>

          {/* Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Where Extraordinary Careers <br />
                <span className="text-[#9e0418] italic font-serif">Meet Sacred Lifelong Bonds</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                India's premier matrimonial sanctuary curated exclusively for certified doctors, software architects, corporate leaders, IAS/IPS dignitaries, and investment bankers.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-start lg:items-end">
              <div 
                onClick={onOpenKundali}
                className="bg-white p-4 rounded-xl shadow-md border border-slate-100 flex items-center gap-3 w-full max-w-xs cursor-pointer hover:border-amber-400 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#9e0418] shrink-0">
                  <Sparkles className="w-6 h-6 text-[#9e0418]" />
                </div>
                <div>
                  <div className="font-serif font-bold text-slate-900 leading-tight">36 Gunas Vedic Sync</div>
                  <div className="text-xs text-slate-500">Ephemeris Planetary Engine</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Match Filter Console */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 relative z-20">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#9e0418]" />
                <span className="font-semibold text-slate-900">Bespoke Discovery Filter</span>
                <span className="bg-red-50 text-[#9e0418] text-xs px-2.5 py-0.5 rounded-full font-bold">2,410 PROFILES</span>
              </div>
              <button 
                onClick={() => {
                  setGenderFilter('all');
                  setProfessionFilter('all');
                  setSearchQuery('');
                  loadProfiles();
                }}
                className="text-xs text-slate-500 hover:text-red-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {/* Looking for */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-amber-700" /> Looking For
                </label>
                <select 
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full bg-[#f0f3ff] text-slate-900 text-sm font-medium py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                >
                  <option value="female">Verified Brides</option>
                  <option value="male">Verified Grooms</option>
                  <option value="all">All Genders</option>
                </select>
              </div>

              {/* Age Bracket */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Age Range</label>
                <select 
                  defaultValue="25-32"
                  className="w-full bg-[#f0f3ff] text-slate-900 text-sm font-medium py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none"
                >
                  <option value="23-28">23 to 28 Yrs</option>
                  <option value="25-32">25 to 32 Yrs</option>
                  <option value="28-36">28 to 36 Yrs</option>
                  <option value="all">Any Age</option>
                </select>
              </div>

              {/* Profession */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-amber-700" /> Profession
                </label>
                <select 
                  value={professionFilter}
                  onChange={(e) => setProfessionFilter(e.target.value)}
                  className="w-full bg-[#f0f3ff] text-slate-900 text-sm font-medium py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none"
                >
                  <option value="all">All Professions</option>
                  <option value="Doctor">Doctors &amp; Surgeons</option>
                  <option value="Finance">Investment Bankers &amp; VCs</option>
                  <option value="Tech">Tech Architects &amp; Founders</option>
                  <option value="Legal">Legal Counsel &amp; Advocates</option>
                </select>
              </div>

              {/* Search text */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Keyword / Company</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && loadProfiles()}
                    placeholder="AIIMS, Goldman, IIT..."
                    className="w-full bg-[#f0f3ff] text-slate-900 text-sm py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Search CTA */}
              <div>
                <button 
                  onClick={loadProfiles}
                  className="w-full bg-[#c1272d] hover:bg-[#9e0418] text-white font-medium py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Filter Matches</span>
                </button>
              </div>
            </div>

            {/* Alma mater quick links */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Quick Filters:</span>
              <button 
                onClick={() => { setSearchQuery('IIT'); loadProfiles(); }}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                IIT / BITS Tech
              </button>
              <button 
                onClick={() => { setSearchQuery('AIIMS'); loadProfiles(); }}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                AIIMS &amp; MD Surgeons
              </button>
              <button 
                onClick={() => { setSearchQuery('IIM'); loadProfiles(); }}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                IIM / ISB Leaders
              </button>
              <button 
                onClick={() => { setSearchQuery('Mumbai'); loadProfiles(); }}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Mumbai Hub
              </button>
              <button 
                onClick={() => { setSearchQuery('Delhi'); loadProfiles(); }}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Delhi NCR Hub
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Profiles Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#6a4500] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Curated Daily Dossiers</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              High-Compatibility Alliance Matches
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              4-Pillar verified profiles matching academic parity, mutual intent, and astronomical harmony.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onSelectProfile('OPM-9821')}
              className="text-xs font-semibold text-[#9e0418] hover:underline flex items-center gap-1"
            >
              <span>Explore Vikram's Dossier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-slate-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map(profile => (
              <article
                key={profile.id}
                onClick={() => onSelectProfile(profile.id)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-slate-100 cursor-pointer group"
              >
                {/* Photo & Scrim */}
                <div className="relative h-80 w-full overflow-hidden bg-slate-100">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>4-Pillar Verified</span>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md text-slate-800 px-2.5 py-1 rounded-xl text-center shadow-md">
                      <div className="text-[#9e0418] font-bold text-xs leading-none">
                        {profile.horoscope.gunas}<span className="text-[10px] text-slate-500 font-normal">/36</span>
                      </div>
                      <div className="text-[8px] uppercase tracking-wider font-semibold text-slate-600">Gunas</div>
                    </div>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-xl font-bold text-white drop-shadow-sm">
                        {profile.name}, {profile.age}
                      </h3>
                      <span className="text-xs bg-emerald-500/80 px-2 py-0.5 rounded-full font-medium">Verified</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium mt-0.5 line-clamp-1">
                      {profile.profession} • {profile.company}
                    </p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Education & Pedigree Tag */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium mb-2">
                      <GraduationCap className="w-4 h-4 text-[#9e0418]" />
                      <span className="truncate">{profile.college} ({profile.education})</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{profile.location}</span>
                      <span>•</span>
                      <span>{profile.caste}</span>
                      <span>•</span>
                      <span>{profile.diet}</span>
                    </div>

                    {/* Bio Snippet */}
                    <p className="text-xs text-slate-600 line-clamp-2 italic leading-relaxed bg-[#f9f9ff] p-2.5 rounded-lg border border-slate-100">
                      "{profile.bio}"
                    </p>
                  </div>

                  {/* 4-Pillar Visual Status Row */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Mobile</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Govt ID</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Degree</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Salary Slip</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={(e) => handleConnect(e, profile.id)}
                      className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                        connectedIds[profile.id]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#c1272d] hover:bg-[#9e0418] text-white active:scale-95'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" fill={connectedIds[profile.id] ? 'currentColor' : 'none'} />
                      <span>{connectedIds[profile.id] ? 'Interest Sent ✓' : 'Send Connect'}</span>
                    </button>
                    <button
                      onClick={() => onSelectProfile(profile.id)}
                      className="py-2 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                    >
                      Full Dossier
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* The 3 Trust Pillars Architecture */}
      <section className="w-full py-16 bg-[#f0f3ff] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#9e0418] font-bold">Uncompromising Integrity</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">
              The OnlyProfessional Trust Architecture
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Engineered for distinguished families who require rigorous credential vetting, Vedic alignment, and complete confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#9e0418] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider text-[#6a4500] font-bold">Pillar I</span>
                <h3 className="font-serif text-lg font-bold text-slate-900 mt-1 mb-2">
                  Four-Pillar Certified Authentication
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  DigiLocker Aadhaar XML with masked UIDAI compliance, institutional degree verification, and corporate Form 16 / tax clearance to ensure zero embellishment.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>DigiLocker Govt ID Authenticated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Form 16 Tax Income Confirmed</span>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider text-[#6a4500] font-bold">Pillar II</span>
                <h3 className="font-serif text-lg font-bold text-slate-900 mt-1 mb-2">
                  Ashtakoota 36 Guna Planetary Milan
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Real-time Vedic calculations using precision ephemeris algorithms. Calculate Guna Milan, check Nadi/Bhakoot doshas, and get verified astrological reviews.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>36 Gunas Ashtakoot Breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Manglik &amp; Nadi Dosha Parity</span>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider text-[#6a4500] font-bold">Pillar III</span>
                <h3 className="font-serif text-lg font-bold text-slate-900 mt-1 mb-2">
                  Executive Privacy &amp; Masked Calls
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  You maintain full command over your visibility. Mask your phone number behind mutual consent, block colleagues at your employer, and protect photos with DRM.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600" />
                  <span>Colleague &amp; Employer Blackout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600" />
                  <span>Bilateral Phone Consent Unlock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories & Unions of Distinction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#9e0418] font-bold">Sacred Unions of Distinction</span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">
            Over 3,800 Visionary Unions Celebrated
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Real couples who met through intentional, credential-verified matchmaking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN0DLD0L6V6yPmV1wv4aCdVoFrvmxcVkBzO4Xn1AfziiAQp1GQqlpTOR5H8SvLmRriQILFmJjM5ES4lp1d4znazZ6Ey34VQfsoLTZkXk5k84UMvFVmB-RsUt3_J3lv17LpR_FmCI7_29dD7J_vM3hOLyAxkGFOFdtZydAGLXfGPY47tu3Y4NLBNrmzNTH_3VSJ_6LuFKyBp3hPKDouCUpYXexetVCuN5JoELNbflpnhY1a7x1osTM7"
              alt="Dr. Shreya and Rohan wedding"
              className="w-full sm:w-44 h-48 sm:h-auto object-cover rounded-xl shadow-sm"
            />
            <div className="flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Dr. Shreya &amp; Rohan</h3>
                <p className="text-xs font-semibold text-[#9e0418]">Pediatric Surgeon • Tech Founder (SaaS)</p>
                <p className="text-xs text-slate-600 mt-2 italic leading-relaxed">
                  "Neither of us had time for unverified biodatas. OnlyProfessional eliminated the noise: her surgical schedule and my startup cadence were understood before our very first call."
                </p>
              </div>
              <span className="text-[11px] text-slate-400">Delhi NCR &amp; Bengaluru • Married 2024</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByIwKqJMTjvoseugEp22enAyGXoc6nQP0Ca5w7N9LZvacYsTl786U3rdBoMlSzmWB_Q6inuEP1Ym7I-5LtLoJnQgmuHTSpMwgQb4ViiC320Mr3eRycZa-RG1QI_XdZEC-2TsidRXxALInPeJjQzLT_iL37reH-YI8dUXvZaeQouTLBBv2ue7bFJCFTn89SgeL26Lsji_Jacf1Jscr6or6c_IH6VwPjWPI9mcUO8bNMAUasT0_1BPMj"
              alt="Aditya and Neha wedding"
              className="w-full sm:w-44 h-48 sm:h-auto object-cover rounded-xl shadow-sm"
            />
            <div className="flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Aditya &amp; Neha</h3>
                <p className="text-xs font-semibold text-[#9e0418]">IAS Officer • Conservation Architect</p>
                <p className="text-xs text-slate-600 mt-2 italic leading-relaxed">
                  "Our families were deeply particular about privacy and singlehood proof. The bilateral phone consent and verified civil service credentials provided complete reassurance."
                </p>
              </div>
              <span className="text-[11px] text-slate-400">Lucknow &amp; New Delhi • Married 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App & Cross-Platform Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" />
              <span>Full Mobile App Included</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Test the Working Smartphone Experience
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experience the end-to-end mobile flow: 4-Step Onboarding, Swiping Daily Matches, E2E Encrypted Chat with View-Once DRM media, Anonymous Blind Calling, and Secure Video Courtship Room with FLAG_SECURE.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenMobileView}
                className="px-6 py-3 rounded-full bg-[#c1272d] text-white font-semibold text-sm shadow-md hover:bg-red-700 active:scale-95 transition-all flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>Launch Mobile App Simulator</span>
              </button>
              <button
                onClick={onOpenMembership}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all"
              >
                View Membership Plans (₹111/mo)
              </button>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 text-center shrink-0">
            <div className="text-3xl font-serif font-bold text-amber-300">4.9 ★</div>
            <div className="text-xs text-slate-200 mt-1">iOS &amp; Android Rating</div>
            <div className="text-[10px] text-slate-400 mt-2">Zero-Spam • 100% ID Verified</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#c1272d] flex items-center justify-center text-white font-bold text-xs">OP</div>
                <span className="font-serif text-white font-bold text-base">OnlyProfessional</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                India's trusted verified matrimonial network for a clearly defined group of people. Preserving sacred marital trust with uncompromising professional pedigree.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Quick Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => onSelectProfile('OPM-9821')} className="hover:text-white transition-colors">Candidate Dossier</button></li>
                <li><button onClick={onOpenKundali} className="hover:text-white transition-colors">36 Gunas Vedic Milan</button></li>
                <li><button onClick={onOpenMembership} className="hover:text-white transition-colors">Membership Plans</button></li>
                <li><button onClick={onOpenTrustCenter} className="hover:text-white transition-colors">DPDP 2023 Trust Center</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Trust &amp; Compliance</h4>
              <ul className="space-y-2 text-xs">
                <li><span className="text-slate-300">DigiLocker UIDAI Verified</span></li>
                <li><span className="text-slate-300">DPDP Act, 2023 Certified</span></li>
                <li><span className="text-slate-300">CERT-In 6-Hour Incident Protocol</span></li>
                <li><span className="text-slate-300">RBI E-Mandate Autopay (48h Alert)</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Executive Concierge</h4>
              <p className="text-xs text-slate-400 mb-2">Dedicated family advisors &amp; certified Vedic scholars available 7 days a week.</p>
              <div className="text-xs text-amber-300 font-semibold">1800-419-MATRIMONY</div>
              <div className="text-[11px] text-slate-500 mt-1">Mon–Sun 9:30 AM – 8:00 PM IST</div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2025 OnlyProfessional Matrimony Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={onOpenTrustCenter} className="hover:text-white">Privacy Policy</button>
              <button onClick={onOpenTrustCenter} className="hover:text-white">Terms of Honour</button>
              <button onClick={onOpenTrustCenter} className="hover:text-white">DPO Escalation</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
