import React, { useState, useEffect } from 'react';
import { Profile } from '../../types';
import { api } from '../../services/api';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Heart, 
  Download, 
  PhoneCall, 
  Calendar, 
  Share2, 
  Check, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Star,
  Eye,
  AlertCircle
} from 'lucide-react';

interface ProfileDossierProps {
  profileId: string;
  onBack: () => void;
  onOpenKundali: () => void;
  onOpenMembership: () => void;
}

export const ProfileDossier: React.FC<ProfileDossierProps> = ({
  profileId,
  onBack,
  onOpenKundali,
  onOpenMembership
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'kundali' | 'family' | 'preferences' | 'values'>('overview');
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [connectSent, setConnectSent] = useState(false);
  const [showConciergeModal, setShowConciergeModal] = useState(false);
  const [conciergeBooked, setConciergeBooked] = useState(false);
  const [meetingFormat, setMeetingFormat] = useState('Parental Zoom Video');

  useEffect(() => {
    loadProfile();
  }, [profileId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await api.getProfileById(profileId);
      setProfile(data);
      if (data) {
        setSelectedPhoto(data.photo);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="w-full min-h-screen bg-[#f9f9ff] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-200 border-t-[#c1272d] rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-600">Retrieving Encrypted Dossier...</span>
        </div>
      </div>
    );
  }

  const allPhotos = [profile.photo, ...(profile.gallery || [])];

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff] text-[#171c25] pb-24">
      {/* Sub-Header & Breadcrumbs */}
      <section className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#9e0418] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Discovery</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs px-3 py-1 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dossier Authenticated Today</span>
            </span>

            <button
              onClick={() => setIsShortlisted(!isShortlisted)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
                isShortlisted
                  ? 'bg-rose-50 border-rose-300 text-[#9e0418]'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" fill={isShortlisted ? 'currentColor' : 'none'} />
              <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
            </button>

            <button 
              onClick={() => alert(`Private dossier link copied for ${profile.name} (#${profile.id})`)}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Share Dossier"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Photos & Trust Credentials (5 cols) */}
          <aside className="lg:col-span-5 space-y-6">
            {/* Primary Photo Gallery Card */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
              <div className="relative w-full h-[440px] rounded-xl overflow-hidden bg-slate-100 group">
                <img
                  src={selectedPhoto || profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlaid DRM Protection Banner */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-medium flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>OPM Encrypted Dossier • #{profile.id}</span>
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-1.5 rounded-full text-[#9e0418]">
                  <ShieldCheck className="w-5 h-5 text-[#9e0418]" />
                </div>

                {/* Scrim with Core Identity */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                        {profile.name}, {profile.age}
                        <span className="text-xs font-normal text-amber-300 font-sans">#{profile.id}</span>
                      </h2>
                      <p className="text-xs text-slate-200 mt-0.5">{profile.profession} • {profile.location}</p>
                    </div>
                    <span className="text-[10px] bg-[#c1272d] text-white px-2 py-0.5 rounded font-bold uppercase">Active</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              {allPhotos.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {allPhotos.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhoto(img)}
                      className={`h-18 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedPhoto === img ? 'border-[#c1272d] scale-95 shadow-sm' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4-Pillar Verification Inspection Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#9e0418]" />
                  <span>Standardized Four-Pillar Verification</span>
                </h3>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full uppercase">
                  100% Certified
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Pillar 1 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-[#9e0418] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Mobile Verified</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">✓ OTP Verified</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        Contact Privacy: Mutual Consent Mandatory prior to disclosure • {profile.phoneMasked} authenticated.
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                </div>

                {/* Pillar 2 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-[#9e0418] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Identity Verified</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">✓ Government ID</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        DigiLocker Aadhaar UIDAI &amp; Indian Passport authenticated with biometric match.
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                </div>

                {/* Pillar 3 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-[#9e0418] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Education Verified</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">✓ Degree Certificate</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {profile.college} ({profile.education}) validated against National Academic Depository (NAD).
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                </div>

                {/* Pillar 4 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-[#9e0418] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold">4</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Professional Verified</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">✓ Employment Proof</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {profile.company} Corporate SSO &amp; ITR Form 16 certified ({profile.income}).
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                </div>
              </div>
            </div>

            {/* Quick Vedic Astrological Quotient Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Astrological &amp; Bio Sync</span>
                  <h3 className="font-serif text-base font-bold text-slate-900">Vedic Guna Compatibility</h3>
                </div>
                <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                  {profile.horoscope.gunas >= 28 ? 'Uttam Milan' : 'Madhyam Milan'}
                </span>
              </div>

              <div className="flex items-center gap-5">
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" r="40" stroke="#f1f5f9" strokeWidth="8" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      fill="none" 
                      r="40" 
                      stroke="#c1272d" 
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * profile.horoscope.gunas) / 36}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-serif text-2xl font-bold text-slate-900 leading-none">{profile.horoscope.gunas}</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">/ 36 Gunas</span>
                  </div>
                </div>

                <div className="space-y-1.5 flex-1 min-w-0 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rashi:</span>
                    <span className="font-semibold text-slate-900 truncate">{profile.horoscope.rashi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nakshatra:</span>
                    <span className="font-semibold text-slate-900 truncate">{profile.horoscope.nakshatra}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Manglik Status:</span>
                    <span className="font-semibold text-emerald-700">{profile.horoscope.manglik}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nadi Dosha:</span>
                    <span className="font-semibold text-emerald-700">Clean / Zero Dosha</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenKundali}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Open 36 Gunas Scorecard Breakdown</span>
              </button>
            </div>

            {/* Sacred Action Triggers */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 space-y-3">
              <button
                onClick={() => setConnectSent(true)}
                disabled={connectSent}
                className={`w-full py-3.5 px-4 rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                  connectSent
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-[#c1272d] hover:bg-[#9e0418] text-white'
                }`}
              >
                <Heart className="w-4 h-4" fill={connectSent ? 'currentColor' : 'none'} />
                <span>{connectSent ? 'Alliance Invitation Sent ✓' : 'Send Sacred Alliance Connect'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => alert(`Downloading 18-page verified Kundali Milan PDF for ${profile.name}...`)}
                  className="py-2.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Kundali</span>
                </button>
                <button
                  onClick={() => setShowConciergeModal(true)}
                  className="py-2.5 px-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                  <span>RM Call Sync</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#f0f3ff] text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#9e0418]" />
                  <span>Direct Phone: {profile.phoneMasked}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Numbers are disclosed exclusively after both candidates / families grant mutual consent.
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Rich Dossier Navigation & Content Tabs (7 cols) */}
          <main className="lg:col-span-7 space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-50 text-[#9e0418] text-xs font-semibold">
                  {profile.company}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold">
                  {profile.income}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {profile.height}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                  {profile.horoscope.manglik}
                </span>
              </div>

              <div>
                <h1 className="font-serif text-3xl font-bold text-slate-900">{profile.name}, {profile.age}</h1>
                <p className="text-sm text-slate-600 mt-1">{profile.profession} • {profile.location} • {profile.caste}</p>
              </div>

              {/* Key Quick Facts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Education</span>
                  <span className="font-bold text-slate-900 block truncate mt-0.5">{profile.education}</span>
                  <span className="text-slate-500 text-[11px] truncate block">{profile.college}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Profession</span>
                  <span className="font-bold text-slate-900 block truncate mt-0.5">{profile.profession}</span>
                  <span className="text-slate-500 text-[11px] truncate block">{profile.company}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Lifestyle</span>
                  <span className="font-bold text-slate-900 block truncate mt-0.5">{profile.diet}</span>
                  <span className="text-slate-500 text-[11px] truncate block">{profile.maritalStatus}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Astro Alignment</span>
                  <span className="font-bold text-[#9e0418] block truncate mt-0.5">{profile.horoscope.gunas}/36 Match</span>
                  <span className="text-slate-500 text-[11px] truncate block">{profile.horoscope.rashi}</span>
                </div>
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'overview'
                    ? 'bg-[#c1272d] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Detailed Dossier
              </button>
              <button
                onClick={() => setActiveTab('kundali')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'kundali'
                    ? 'bg-[#c1272d] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Horoscope &amp; 36 Gunas
              </button>
              <button
                onClick={() => setActiveTab('family')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'family'
                    ? 'bg-[#c1272d] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Family Heritage
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'preferences'
                    ? 'bg-[#c1272d] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Partner Match
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'values'
                    ? 'bg-[#c1272d] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Life &amp; Values
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Personal Philosophy */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <span>In Their Own Words: Outlook on Life</span>
                    </h3>
                    <span className="text-xs text-slate-400">Written by candidate</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic bg-[#f9f9ff] p-4 rounded-xl border border-slate-100">
                    "{profile.bio}"
                  </p>
                </div>

                {/* Academic & Professional Pedigree */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#9e0418]" />
                    <span>Academic &amp; Professional Pedigree</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                      <span className="text-xs uppercase font-bold text-[#9e0418]">Current Career Role</span>
                      <h4 className="font-bold text-slate-900 text-sm">{profile.profession}</h4>
                      <p className="text-xs text-slate-600">{profile.company} • {profile.location}</p>
                      <div className="pt-2 text-xs text-slate-500 font-medium">
                        Declared Package: <strong className="text-slate-900">{profile.income}</strong>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                      <span className="text-xs uppercase font-bold text-amber-800">Alma Mater</span>
                      <h4 className="font-bold text-slate-900 text-sm">{profile.college}</h4>
                      <p className="text-xs text-slate-600">{profile.education} (Apex Tier)</p>
                      <div className="pt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Validated against Academic Depository</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lifestyle & Living Habits */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#9e0418]" />
                    <span>Habits &amp; Daily Rhythm</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 uppercase font-semibold block text-[10px]">Dietary Ethics</span>
                      <span className="font-bold text-slate-900 text-sm">{profile.diet}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase font-semibold block text-[10px]">Drinking</span>
                      <span className="font-bold text-slate-900 text-sm">{profile.drink}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase font-semibold block text-[10px]">Smoking</span>
                      <span className="font-bold text-slate-900 text-sm">{profile.smoke}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase font-semibold block text-[10px]">Languages</span>
                      <span className="font-bold text-slate-900 text-sm">{profile.motherTongue}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase font-semibold block text-[10px]">Marital Status</span>
                      <span className="font-bold text-slate-900 text-sm">{profile.maritalStatus}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase font-semibold block text-[10px]">Ancestral Roots</span>
                      <span className="font-bold text-slate-900 text-sm">{profile.family.origin}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: KUNDALI & 36 GUNAS */}
            {activeTab === 'kundali' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#9e0418]">Vedic Ashtakoota Analysis</span>
                    <h3 className="font-serif text-xl font-bold text-slate-900">36 Gunas Milan Breakdown</h3>
                  </div>
                  <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                    Score: {profile.horoscope.gunas} / 36 (88.9%)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                        <th className="py-2.5 px-3">Koota (Dimension)</th>
                        <th className="py-2.5 px-3">Quality Evaluated</th>
                        <th className="py-2.5 px-3">Max</th>
                        <th className="py-2.5 px-3">Scored</th>
                        <th className="py-2.5 px-3 text-right">Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">1. Varna</td>
                        <td className="py-3 px-3 text-slate-500">Spiritual &amp; Work Temperament</td>
                        <td className="py-3 px-3">1</td>
                        <td className="py-3 px-3 font-bold text-slate-900">1.0</td>
                        <td className="py-3 px-3 text-right text-emerald-700 font-semibold">Full Harmony</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">2. Vashya</td>
                        <td className="py-3 px-3 text-slate-500">Mutual Dominance &amp; Balance</td>
                        <td className="py-3 px-3">2</td>
                        <td className="py-3 px-3 font-bold text-slate-900">2.0</td>
                        <td className="py-3 px-3 text-right text-emerald-700 font-semibold">Equilateral</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">3. Tara</td>
                        <td className="py-3 px-3 text-slate-500">Destiny, Longevity &amp; Health</td>
                        <td className="py-3 px-3">3</td>
                        <td className="py-3 px-3 font-bold text-slate-900">3.0</td>
                        <td className="py-3 px-3 text-right text-emerald-700 font-semibold">Sampat Tara</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">4. Yoni</td>
                        <td className="py-3 px-3 text-slate-500">Biological Nature &amp; Intimacy</td>
                        <td className="py-3 px-3">4</td>
                        <td className="py-3 px-3 font-bold text-slate-900">3.0</td>
                        <td className="py-3 px-3 text-right text-amber-700 font-semibold">Affinity</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">5. Graha Maitri</td>
                        <td className="py-3 px-3 text-slate-500">Intellectual &amp; Mental Sync</td>
                        <td className="py-3 px-3">5</td>
                        <td className="py-3 px-3 font-bold text-slate-900">5.0</td>
                        <td className="py-3 px-3 text-right text-emerald-700 font-semibold">Supreme</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">6. Gana</td>
                        <td className="py-3 px-3 text-slate-500">Social Behavior &amp; Ethos</td>
                        <td className="py-3 px-3">6</td>
                        <td className="py-3 px-3 font-bold text-slate-900">6.0</td>
                        <td className="py-3 px-3 text-right text-emerald-700 font-semibold">Harmonious</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">7. Bhakoot</td>
                        <td className="py-3 px-3 text-slate-500">Family Prosperity &amp; Chemistry</td>
                        <td className="py-3 px-3">7</td>
                        <td className="py-3 px-3 font-bold text-slate-900">4.0</td>
                        <td className="py-3 px-3 text-right text-amber-700 font-semibold">Favorable</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">8. Nadi</td>
                        <td className="py-3 px-3 text-slate-500">Genetic Harmony (Zero Dosha)</td>
                        <td className="py-3 px-3">8</td>
                        <td className="py-3 px-3 font-bold text-[#9e0418]">8.0</td>
                        <td className="py-3 px-3 text-right text-emerald-700 font-bold">Zero Nadi Dosha</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>Pandit Advisory Assessment:</span>
                  </div>
                  <p className="leading-relaxed">
                    "Scoring {profile.horoscope.gunas} out of 36 gunas with clean Nadi, clean Bhakoot, and favorable planetary friendship. An auspicious alliance highly encouraged for long-term domestic prosperity."
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: FAMILY HERITAGE */}
            {activeTab === 'family' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-xs uppercase font-bold text-[#9e0418]">Filial Heritage &amp; Roots</span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">Family Lineage &amp; Background</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">Father's Details</span>
                    <h4 className="font-bold text-slate-900 text-sm">{profile.family.father}</h4>
                    <p className="text-slate-600">Decorated military &amp; executive leadership</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">Mother's Details</span>
                    <h4 className="font-bold text-slate-900 text-sm">{profile.family.mother}</h4>
                    <p className="text-slate-600">Academic &amp; cultural scholar</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">Siblings</span>
                    <h4 className="font-bold text-slate-900 text-sm">{profile.family.siblings}</h4>
                    <p className="text-slate-600">Well-settled professional</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">Family Values &amp; Type</span>
                    <h4 className="font-bold text-slate-900 text-sm">{profile.family.values} ({profile.family.type})</h4>
                    <p className="text-slate-600">Native roots in {profile.family.origin}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#c1272d] text-xs text-slate-700 leading-relaxed">
                  <strong>Household Cultural Ethos:</strong> Progressive, warmly egalitarian, and deeply respectful of cultural customs. Both parents champion independent careers, lifelong learning, and open communication.
                </div>
              </div>
            )}

            {/* TAB 4: PARTNER PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#9e0418]">Mutual Criteria Audit</span>
                    <h3 className="font-serif text-xl font-bold text-slate-900">Partner Expectations Comparison</h3>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                    6 of 6 Preferences Matched
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 uppercase text-[10px] block font-semibold">Age Criteria</span>
                      <span className="font-bold text-slate-900 text-sm">Preferred: 26 to 31 Years</span>
                    </div>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Matched (29 yrs)
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 uppercase text-[10px] block font-semibold">Education &amp; Career</span>
                      <span className="font-bold text-slate-900 text-sm">Doctor / Executive / Civil Services</span>
                    </div>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Matched (MD AIIMS)
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 uppercase text-[10px] block font-semibold">Dietary Harmony</span>
                      <span className="font-bold text-slate-900 text-sm">Vegetarian Preferred</span>
                    </div>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Matched (Strict Veg)
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 uppercase text-[10px] block font-semibold">Astrological Alignment</span>
                      <span className="font-bold text-slate-900 text-sm">Non-Manglik or Mild Manglik</span>
                    </div>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Matched (Non-Manglik)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: VALUES & VISION */}
            {activeTab === 'values' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-xs uppercase font-bold text-[#9e0418]">Long-Horizon Vision</span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">Life Goals &amp; Philosophy</h3>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Partnership &amp; Gender Dynamics</h4>
                    <p>
                      "A partnership of true equals where both individuals passionately support each other's career aspirations while joyfully co-parenting and creating an emotionally grounded sanctuary at home."
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Spirituality &amp; Cultural Heritage</h4>
                    <p>
                      "Culturally observant and respectful of traditional festivals like Diwali and Gurpurab. Grounded in Vedic principles of delayed gratification, integrity, and warmth."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Relationship Manager Booking Modal */}
      {showConciergeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  RM
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900">Relationship Manager Concierge</h3>
                  <p className="text-xs text-slate-500">OnlyProfessional Dedicated Parental Liaison</p>
                </div>
              </div>
              <button 
                onClick={() => setShowConciergeModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            {conciergeBooked ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-slate-900">Concierge Session Scheduled!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Senior Concierge Officer Smt. Gayatri Deshmukh has been notified. She will coordinate with {profile.name}'s family via verified WhatsApp today.
                </p>
                <button
                  onClick={() => { setShowConciergeModal(false); setConciergeBooked(false); }}
                  className="mt-4 px-6 py-2 rounded-full bg-[#c1272d] text-white text-xs font-semibold"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <p className="text-slate-600 leading-relaxed">
                  Your dedicated Relationship Manager will facilitate a discrete exploratory introduction between your family and {profile.name}'s family.
                </p>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-900 block">Preferred Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMeetingFormat('Parental Zoom Video')}
                      className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                        meetingFormat === 'Parental Zoom Video'
                          ? 'border-[#c1272d] bg-red-50 text-[#9e0418] font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      Parental Video Call
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeetingFormat('RM Chaperoned Phone')}
                      className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                        meetingFormat === 'RM Chaperoned Phone'
                          ? 'border-[#c1272d] bg-red-50 text-[#9e0418] font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      Chaperoned Audio
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-900 block">Select Convenient Timing</label>
                  <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs">
                    <option>Saturday (Upcoming) • 11:30 AM – 12:30 PM IST</option>
                    <option>Saturday (Upcoming) • 05:00 PM – 06:00 PM IST</option>
                    <option>Sunday (Upcoming) • 04:00 PM – 05:00 PM IST</option>
                    <option>Direct RM WhatsApp Coordination First</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setShowConciergeModal(false)}
                    className="px-4 py-2 rounded-full text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setConciergeBooked(true)}
                    className="px-5 py-2 rounded-full bg-[#c1272d] hover:bg-[#9e0418] text-white font-semibold shadow-md"
                  >
                    Confirm RM Sync
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
