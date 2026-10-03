import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Profile, ChatMessage, KundaliResult } from '../../types';
import { 
  Heart, 
  Search, 
  MessageCircle, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Video, 
  Mic, 
  MicOff, 
  Volume2, 
  Lock, 
  Check, 
  X, 
  Star, 
  Send, 
  Play, 
  Pause, 
  ArrowLeft, 
  Camera, 
  Users, 
  AlertTriangle, 
  CheckCircle2,
  ChevronRight,
  Eye,
  Download,
  Smartphone,
  Maximize2,
  Minimize2
} from 'lucide-react';

export const MobileApp: React.FC = () => {
  // Mobile Navigation Screen states
  const [activeTab, setActiveTab] = useState<'matches' | 'search' | 'inbox' | 'chat' | 'call' | 'video' | 'kundali' | 'profile' | 'onboarding' | 'privacy' | 'safety' | 'membership'>('matches');
  
  // Data
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(278); // 04:38
  const [videoDrawer, setVideoDrawer] = useState<'none' | 'icebreaker' | 'bio' | 'parents'>('none');
  const [activeOnboardingStep, setActiveOnboardingStep] = useState(1);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load profiles and chat
  useEffect(() => {
    loadData();
  }, []);

  // Call timer simulation
  useEffect(() => {
    let interval: any;
    if (activeTab === 'call' || activeTab === 'video') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  const loadData = async () => {
    try {
      const p = await api.getProfiles();
      setProfiles(p);
      const m = await api.getChatMessages('chat-vikram');
      setChatMessages(m);
    } catch (err) {
      console.error(err);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    try {
      const newMsg = await api.sendChatMessage('chat-vikram', {
        text: messageInput,
        senderId: 'current-user',
        senderName: 'You (Dr. Aditi)'
      });
      setChatMessages(prev => [...prev, newMsg]);
      setMessageInput('');
      triggerToast('Message encrypted & dispatched.');
    } catch (err) {
      console.error(err);
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentMatch = profiles[currentMatchIndex] || profiles[0];

  return (
    <div className="w-full min-h-screen bg-slate-900 py-6 px-2 sm:px-4 flex flex-col items-center justify-center">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 z-50 bg-[#171c25] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Quick Launcher Strip */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between text-xs text-slate-300 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white">Mobile Simulator</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct screen jumps */}
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as any)}
            className="bg-slate-800 text-white text-[11px] font-medium py-1 px-2.5 rounded-lg border border-slate-700 outline-none"
          >
            <option value="matches">1. Daily Matches</option>
            <option value="inbox">2. Inbox &amp; Chats</option>
            <option value="chat">3. E2E Chat Room</option>
            <option value="call">4. Privacy Call</option>
            <option value="video">5. Video Courtroom (DRM)</option>
            <option value="kundali">6. 36 Gunas Vedic Milan</option>
            <option value="onboarding">7. 4-Step Onboarding</option>
            <option value="privacy">8. Privacy &amp; Visibility</option>
            <option value="safety">9. Safety &amp; Protection</option>
            <option value="membership">10. Membership Checkout</option>
          </select>

          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Toggle Device Frame"
          >
            {isPhoneFrame ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* SMARTPHONE DEVICE WRAPPER */}
      <div className={`relative bg-white text-[#171c25] overflow-hidden transition-all duration-300 flex flex-col ${
        isPhoneFrame
          ? 'w-[390px] h-[844px] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[10px] border-slate-800 ring-1 ring-slate-700'
          : 'w-full max-w-md min-h-[750px] rounded-3xl shadow-2xl'
      }`}>
        {/* iOS Dynamic Island / Notch */}
        {isPhoneFrame && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-950 mr-2"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500/80"></div>
          </div>
        )}

        {/* Status Bar */}
        <div className="h-10 px-6 pt-2 flex items-center justify-between text-xs font-semibold text-slate-900 shrink-0 z-40 bg-white/90 backdrop-blur-md">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="text-[10px] font-bold">5G</span>
            <div className="w-5 h-2.5 border border-slate-800 rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-slate-900 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* SCREEN 1: DAILY MATCHES */}
        {activeTab === 'matches' && currentMatch && (
          <div className="flex-1 overflow-y-auto pb-20 bg-[#f9f9ff]">
            {/* Header */}
            <div className="px-4 py-2 flex items-center justify-between bg-white border-b border-slate-100 sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#c1272d] text-white flex items-center justify-center font-bold text-xs">OP</div>
                <span className="font-serif font-bold text-sm text-[#9e0418]">OnlyProfessional</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveTab('inbox')} className="relative p-1 text-slate-600">
                  <MessageCircle className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
                </button>
                <div className="w-7 h-7 rounded-full bg-slate-100 overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_WN9WgvYPqj6wLNONYW-aFCfYqvbC5ePwDtezDWVBHN0JHHjCiQqgzanwGbRrK0TskGrFrZiNLQZBC045TAoKa43i1PoJMjWGjicYYdlXhXEIkTrJAsYB3uhGASCNsdZ3bvDoW3UDJARqs4X6VcSI0Tc4WvNocZYCRyol1D2WBKKu87FW-sFGQVNUXpvQNUnOWK4vCCI9k466vmsmrDkg-B9EAe6Kvj4Cwj71Xlxpd9q63cFM-Rid" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Match Card */}
            <div className="p-4 space-y-3">
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-lg h-[460px]">
                <img src={currentMatch.photo} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Badges on Top */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>4-Pillar Verified</span>
                  </span>
                  <div className="bg-white/90 backdrop-blur-md text-slate-900 px-2 py-0.5 rounded-lg text-center font-bold">
                    <div className="text-xs text-[#9e0418]">{currentMatch.horoscope.gunas}/36</div>
                    <span className="text-[8px] uppercase">Gunas</span>
                  </div>
                </div>

                {/* Overlaid Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-2xl font-bold">{currentMatch.name}, {currentMatch.age}</h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-xs text-slate-200">{currentMatch.profession} • {currentMatch.company}</p>
                  <p className="text-xs text-slate-300 font-light">{currentMatch.education} • {currentMatch.location}</p>

                  <div className="pt-2 flex items-center gap-1 text-[11px] text-amber-300">
                    <Sparkles className="w-3 h-3" />
                    <span>94% Astrological &amp; Pedigree Alignment</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Pass, Star, Connect */}
              <div className="flex items-center justify-around pt-2">
                <button
                  onClick={() => {
                    setCurrentMatchIndex((prev) => (prev + 1) % profiles.length);
                    triggerToast('Passed to next candidate.');
                  }}
                  className="w-13 h-13 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                >
                  <X className="w-6 h-6" />
                </button>

                <button
                  onClick={() => triggerToast('Profile shortlisted to sacred favorites.')}
                  className="w-13 h-13 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                >
                  <Star className="w-6 h-6" />
                </button>

                <button
                  onClick={() => {
                    triggerToast(`Sacred Interest sent to ${currentMatch.name}!`);
                    setActiveTab('chat');
                  }}
                  className="w-16 h-16 rounded-full bg-[#c1272d] hover:bg-[#9e0418] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                >
                  <Heart className="w-8 h-8 fill-current" />
                </button>
              </div>

              {/* Quick Profile Summary */}
              <div className="p-3 bg-white rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="font-semibold text-slate-900">About {currentMatch.name}:</div>
                <p className="text-slate-600 leading-relaxed italic">"{currentMatch.bio}"</p>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: INBOX & CHATS */}
        {activeTab === 'inbox' && (
          <div className="flex-1 overflow-y-auto pb-20 bg-[#f9f9ff]">
            <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-30">
              <h2 className="font-serif text-lg font-bold text-slate-900">Connections &amp; Inbox</h2>
              <span className="text-xs bg-red-100 text-[#9e0418] px-2 py-0.5 rounded-full font-bold">8 Pending</span>
            </div>

            <div className="p-4 space-y-3">
              {/* Active Conversation: Vikram */}
              <div
                onClick={() => setActiveTab('chat')}
                className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB40lg4prvJo3tVWIC_F1CQDfA14wfwojNNLqA3YdKDDE3SHrmTfMR4OApFHSHav8ByZSl8kqBYwilH6zf33vhVuw523xntdv0TeBYIdwcB606aKfjtA24BnRpz_Qr2J5LuYH7EIkRTW-DeO03jTB1DPzmIJsieIHnW-YQ_BlHqWxROnrwEg53f18PHh5DEEpLDvabw78LH0xdB8j6VnII5oT_yHisuR6hsuHsHaABe52TiFj8YXdQN" alt="" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-xs truncate">Vikram Malhotra</span>
                    <span className="text-[10px] text-[#9e0418] font-bold">10:29 AM</span>
                  </div>
                  <p className="text-xs text-slate-600 truncate mt-0.5 font-medium">Looking forward to our Sunday video session with parents...</p>
                  <span className="text-[10px] text-slate-400">VP Global Markets • Goldman Sachs</span>
                </div>
              </div>

              {/* Pending Received Interests */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Pending Interests (8)</span>
                
                <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2.5">
                  <div className="flex items-center gap-3">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtqNfJ33wDFx6LIkvkiEvY7MhygBBgD9WMU4flgXZ0VgDBQRpR93ZrZvFoY5aFR0nX7hqYhveqS4oe2tKu5y0WwWcPkZEOHvbgHRrLp9XGBbTWo6RLyHOAwG3tvFswHhlv_uU8CJV5_tDeZ9UsXsghjVg5yI2y8uQyRBUCNnFCwyPXEM7qBrbc3pPFywfBZslH0TFfXpBSG0ba3ZEpGYzzYIHdoF_E5Wi18xa3ZjUBaMkTtNmDLNbZ" alt="" className="w-11 h-11 rounded-full object-cover" />
                    <div className="min-w-0 flex-1 text-xs">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-900 truncate">Priyanka Verma, 26</span>
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-bold">32/36 Gunas</span>
                      </div>
                      <span className="text-slate-500 truncate block">UX Director • Bengaluru</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <button className="py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">Decline</button>
                    <button 
                      onClick={() => {
                        triggerToast('Interest Accepted! Conversation unlocked.');
                        setActiveTab('chat');
                      }}
                      className="py-1.5 rounded-full bg-[#c1272d] text-white font-semibold shadow-sm"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 3: E2E ENCRYPTED CHAT ROOM */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col bg-[#f9f9ff]">
            {/* Chat Top Nav */}
            <div className="h-14 px-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveTab('inbox')} className="text-slate-600">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB40lg4prvJo3tVWIC_F1CQDfA14wfwojNNLqA3YdKDDE3SHrmTfMR4OApFHSHav8ByZSl8kqBYwilH6zf33vhVuw523xntdv0TeBYIdwcB606aKfjtA24BnRpz_Qr2J5LuYH7EIkRTW-DeO03jTB1DPzmIJsieIHnW-YQ_BlHqWxROnrwEg53f18PHh5DEEpLDvabw78LH0xdB8j6VnII5oT_yHisuR6hsuHsHaABe52TiFj8YXdQN" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">Vikram Malhotra</span>
                  <span className="text-[10px] text-emerald-600 font-medium">Encrypted • Numbers Concealed</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setActiveTab('call')}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                  title="Masked Anonymous Voice Call"
                >
                  <Phone className="w-4 h-4 text-[#9e0418]" />
                </button>
                <button 
                  onClick={() => setActiveTab('video')}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                  title="Secure Video Courtship"
                >
                  <Video className="w-4 h-4 text-[#9e0418]" />
                </button>
              </div>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              <div className="bg-amber-50 border border-amber-200/60 p-2.5 rounded-xl text-center space-y-0.5 text-amber-900">
                <div className="flex items-center justify-center gap-1 font-bold text-[11px]">
                  <Lock className="w-3 h-3 text-amber-700" />
                  <span>OnlyProfessional Signal Protocol Encrypted</span>
                </div>
                <p className="text-[10px] text-amber-800">Phone numbers, email &amp; photos remain shielded under bilateral consent.</p>
              </div>

              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.senderId === 'current-user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.senderId === 'current-user'
                        ? 'bg-[#c1272d] text-white rounded-tr-xs shadow-sm'
                        : 'bg-white text-slate-800 rounded-tl-xs shadow-sm border border-slate-100'
                    }`}
                  >
                    {msg.mediaType === 'view_once_image' ? (
                      <div className="space-y-1">
                        <div className="relative rounded-lg overflow-hidden bg-slate-800 p-2 text-center text-white">
                          <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded font-bold uppercase">View-Once DRM Photo</span>
                          <p className="text-[11px] mt-1 text-slate-200">Tap to view watermarked portrait</p>
                        </div>
                        <span className="text-[10px] text-slate-400 block">{msg.text}</span>
                      </div>
                    ) : msg.mediaType === 'voice_note' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <Play className="w-3 h-3" />
                        </div>
                        <div className="flex-1 h-3 bg-white/30 rounded-full"></div>
                        <span className="text-[10px]">{msg.duration || '0:42'}</span>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Message Input Bar */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type confidential message..."
                className="flex-1 bg-slate-100 px-4 py-2.5 rounded-full text-xs outline-none focus:bg-white focus:ring-1 focus:ring-red-600"
              />
              <button
                onClick={handleSendMessage}
                className="w-9 h-9 rounded-full bg-[#c1272d] text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: PRIVACY SHIELD AUDIO CALL */}
        {activeTab === 'call' && (
          <div className="flex-1 flex flex-col bg-[#f9f9ff] p-6 text-center justify-between">
            <div>
              <div className="flex justify-between items-center text-xs text-slate-500 mb-6">
                <button onClick={() => setActiveTab('chat')} className="text-slate-600">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  Virtual Masked Bridge (0% Exposed)
                </span>
                <span className="w-4"></span>
              </div>

              {/* Pulsing Avatar */}
              <div className="relative w-28 h-28 mx-auto my-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-50"></div>
                <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-[#c1272d]">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB40lg4prvJo3tVWIC_F1CQDfA14wfwojNNLqA3YdKDDE3SHrmTfMR4OApFHSHav8ByZSl8kqBYwilH6zf33vhVuw523xntdv0TeBYIdwcB606aKfjtA24BnRpz_Qr2J5LuYH7EIkRTW-DeO03jTB1DPzmIJsieIHnW-YQ_BlHqWxROnrwEg53f18PHh5DEEpLDvabw78LH0xdB8j6VnII5oT_yHisuR6hsuHsHaABe52TiFj8YXdQN" alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-slate-900">Vikram M.</h3>
              <p className="text-xs text-[#9e0418] font-semibold mt-1">VP • Goldman Sachs</p>
              <div className="text-base font-bold text-slate-700 font-mono mt-3">{formatTimer(callDuration)}</div>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium mt-1 inline-block">
                WebRTC DTLS-SRTP • 48kHz HD Audio
              </span>
            </div>

            {/* Safeguards Card */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-700 font-semibold">
                <span>Anti-Recording Guard:</span>
                <span className="text-emerald-700 font-bold">ACTIVE</span>
              </div>
              <p className="text-[11px] text-slate-500">Neither party's real SIM is revealed. Screenshots and external audio taps are blocked.</p>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full flex flex-col items-center justify-center gap-1 ${
                    isMuted ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span className="text-[10px] font-bold">{isMuted ? 'Muted' : 'Mute'}</span>
                </button>

                <button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`p-3 rounded-full flex flex-col items-center justify-center gap-1 ${
                    isSpeakerOn ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                  <span className="text-[10px] font-bold">{isSpeakerOn ? 'Speaker On' : 'Speaker'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('video')}
                  className="p-3 rounded-full bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1"
                >
                  <Video className="w-5 h-5" />
                  <span className="text-[10px] font-bold">Video</span>
                </button>
              </div>

              <button
                onClick={() => setActiveTab('chat')}
                className="w-full py-3.5 rounded-full bg-red-600 text-white font-bold text-sm shadow-md"
              >
                End Secure Call
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: SECURE VIDEO COURTROOM (DRM & FORENSIC WATERMARK) */}
        {activeTab === 'video' && (
          <div className="flex-1 relative bg-slate-950 flex flex-col justify-between overflow-hidden">
            {/* Background Remote Video Feed */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4-2S3XpwNtfA-noFmH3SDkbAYIvw-1irm11NOmah7UKAE5ezEcNxARxrhfu4XmOl1MzfcPzzPXo7e0ZMS9_wnvKps81wixEHycwPWQr3EHVSjIt02UfVy2emose_tCk-S_G6QSRTZ2Y7Bczk6SBbG_eAoGSOy9Yl9YfXt-wyHHtxYkteo3-7mECoJoHyC_u6Y64vfEDnxa9F5_i55bao0n3ESOvpxKDb_5bhsRr9nLOZ2TN2vOcSc"
              alt="Remote Vikram"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none"></div>

            {/* Steganographic DRM Watermark Over Video */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none select-none opacity-20 text-[10px] text-white font-mono tracking-widest uppercase">
              <div className="flex justify-between">
                <span>OPM • #VR-4029</span>
                <span>VIEWER: ADITI_R_MD</span>
              </div>
              <div className="text-center transform -rotate-12 space-y-4">
                <p>CONFIDENTIAL COURT ROOM</p>
                <p>FLAG_SECURE SCREENSHOT PROHIBITED</p>
              </div>
              <div className="flex justify-between">
                <span>UTC 14:32:09</span>
                <span>ENC: DTLS-SRTP</span>
              </div>
            </div>

            {/* Top Bar on Video */}
            <div className="relative z-30 p-4 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>Courtship Room #4029</span>
                <span>•</span>
                <span className="font-mono">{formatTimer(callDuration)}</span>
              </div>

              {/* PiP Local Video */}
              <div className="w-20 h-24 rounded-xl overflow-hidden shadow-lg border-2 border-white/50 bg-slate-800">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCBGCdd6dwvtg6IdEox_IfOF68VoW26KLijQU3RSqf1BbKC-uP5kRfJw1ffzfMHnQRvdhFlYMd45Qt3eGGsw7BQmYb4Amdf5bD__gx1MmvMohi3NrmA85rOfFrSsFcpSMAoruHeKZtuGcpDtgIJ5EFxMgXbFuVuQVf0s7GfPf42T-cBpBFTxXnAikAVsdt8zUXT-uKXQZupZFlZtQDMygKqrYOiOGeNl4flEktLC4XX5wN1InPWj15" alt="Self" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Bottom Actions on Video */}
            <div className="relative z-30 p-4 space-y-3">
              {/* Quick Drawers */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setVideoDrawer(videoDrawer === 'icebreaker' ? 'none' : 'icebreaker')}
                  className="px-3 py-1 rounded-full bg-white/90 text-slate-900 text-xs font-semibold whitespace-nowrap shadow-sm"
                >
                  💡 Saathi AI Prompt
                </button>
                <button
                  onClick={() => setVideoDrawer(videoDrawer === 'parents' ? 'none' : 'parents')}
                  className="px-3 py-1 rounded-full bg-white/90 text-slate-900 text-xs font-semibold whitespace-nowrap shadow-sm"
                >
                  👨‍👩‍👧 Parents Mode
                </button>
              </div>

              {/* Drawer Content */}
              {videoDrawer === 'icebreaker' && (
                <div className="p-3 bg-white/95 rounded-2xl text-xs space-y-1 text-slate-800 animate-in fade-in">
                  <div className="font-bold text-[#9e0418]">Saathi AI Icebreaker:</div>
                  <p>"Ask about his favorite weekend culinary traditions in Mumbai vs. New York."</p>
                </div>
              )}

              {videoDrawer === 'parents' && (
                <div className="p-3 bg-white/95 rounded-2xl text-xs space-y-2 text-slate-800 animate-in fade-in">
                  <div className="font-bold text-slate-900">Multi-Party Family Bridge:</div>
                  <p className="text-slate-600">Loop in verified elder parents without sharing phone numbers.</p>
                  <button onClick={() => triggerToast('Connecting Aditi parents via encrypted audio...')} className="w-full py-1.5 rounded-full bg-[#c1272d] text-white font-bold">Ring In Parents</button>
                </div>
              )}

              {/* Media Deck Controls */}
              <div className="flex items-center justify-around">
                <button onClick={() => setIsMuted(!isMuted)} className={`w-12 h-12 rounded-full flex items-center justify-center ${isMuted ? 'bg-red-600 text-white' : 'bg-white/30 text-white'}`}>
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button onClick={() => triggerToast('Studio Retouch filter toggled')} className="w-12 h-12 rounded-full bg-white/30 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </button>
                <button onClick={() => setActiveTab('chat')} className="w-14 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                  <Phone className="w-6 h-6 rotate-135" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 6: 36 GUNAS VEDIC MILAN */}
        {activeTab === 'kundali' && (
          <div className="flex-1 overflow-y-auto pb-20 bg-[#f9f9ff] p-4 space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800">Vedic Astrological Match</span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">36 Gunas Scorecard</h3>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-2">
              <div className="text-4xl font-serif font-bold text-[#c1272d]">32 <span className="text-lg text-slate-400 font-normal">/ 36</span></div>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">Uttam Milan (Highly Auspicious)</span>
              <p className="text-xs text-slate-600 mt-1">Sun &amp; Jupiter friendly signs. Zero Nadi &amp; clean Bhakoot.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block mb-1">8 Ashta-koota Dimensions:</span>
              <div className="space-y-1.5">
                <div className="flex justify-between"><span>1. Varna (Temperament):</span><span className="font-bold text-emerald-700">1 / 1</span></div>
                <div className="flex justify-between"><span>2. Vashya (Balance):</span><span className="font-bold text-emerald-700">2 / 2</span></div>
                <div className="flex justify-between"><span>3. Tara (Longevity):</span><span className="font-bold text-emerald-700">3 / 3</span></div>
                <div className="flex justify-between"><span>4. Yoni (Nature):</span><span className="font-bold text-amber-700">3 / 4</span></div>
                <div className="flex justify-between"><span>5. Graha Maitri (Friendship):</span><span className="font-bold text-emerald-700">5 / 5</span></div>
                <div className="flex justify-between"><span>6. Gana (Behavior):</span><span className="font-bold text-emerald-700">6 / 6</span></div>
                <div className="flex justify-between"><span>7. Bhakoot (Prosperity):</span><span className="font-bold text-amber-700">4 / 7</span></div>
                <div className="flex justify-between"><span>8. Nadi (Genetics):</span><span className="font-bold text-emerald-700">8 / 8 (Clean)</span></div>
              </div>
            </div>

            <button onClick={() => triggerToast('Consultation request sent to Pandit Shastriji')} className="w-full py-3 rounded-full bg-[#c1272d] text-white text-xs font-semibold shadow-md">
              Consult Certified Astrologer (₹999)
            </button>
          </div>
        )}

        {/* SCREEN 7: 4-STEP ONBOARDING WIZARD */}
        {activeTab === 'onboarding' && (
          <div className="flex-1 overflow-y-auto pb-20 bg-[#f9f9ff] p-4 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Step {activeOnboardingStep} of 4</span>
                <span>{activeOnboardingStep * 25}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="bg-[#c1272d] h-full transition-all" style={{ width: `${activeOnboardingStep * 25}%` }}></div>
              </div>
            </div>

            {activeOnboardingStep === 1 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 text-xs">
                <h4 className="font-serif text-base font-bold text-slate-900">Step 1: Identity &amp; Personal Info</h4>
                <div>
                  <label className="font-semibold block mb-1">Full Legal Name (as on Govt ID)</label>
                  <input type="text" defaultValue="Dr. Aditi Rao" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Date of Birth</label>
                  <input type="text" defaultValue="18 / 05 / 1996" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Current City</label>
                  <input type="text" defaultValue="New Delhi / NCR" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
              </div>
            )}

            {activeOnboardingStep === 2 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 text-xs">
                <h4 className="font-serif text-base font-bold text-slate-900">Step 2: Pedigree &amp; Profession</h4>
                <div>
                  <label className="font-semibold block mb-1">Highest Qualification</label>
                  <input type="text" defaultValue="MD Cardiology (AIIMS)" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Annual CTC / Compensation</label>
                  <input type="text" defaultValue="₹45L+ CTC" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Dietary Habits</label>
                  <input type="text" defaultValue="Strict Vegetarian" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
              </div>
            )}

            {activeOnboardingStep === 3 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 text-xs">
                <h4 className="font-serif text-base font-bold text-slate-900">Step 3: Family Heritage &amp; Astro</h4>
                <div>
                  <label className="font-semibold block mb-1">Ancestral Roots</label>
                  <input type="text" defaultValue="Kolkata & Varanasi" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Family Ethos</label>
                  <input type="text" defaultValue="Progressive Traditional" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Manglik Status</label>
                  <input type="text" defaultValue="Non-Manglik" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
              </div>
            )}

            {activeOnboardingStep === 4 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 text-xs">
                <h4 className="font-serif text-base font-bold text-slate-900">Step 4: Partner Expectations &amp; Non-Negotiables</h4>
                <div>
                  <label className="font-semibold block mb-1">Desired Age Window</label>
                  <input type="text" defaultValue="28 to 33 Yrs" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Mandatory ID Verification Only?</label>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#c1272d] ml-1" />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {activeOnboardingStep > 1 && (
                <button
                  onClick={() => setActiveOnboardingStep(prev => prev - 1)}
                  className="py-2.5 px-4 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (activeOnboardingStep < 4) {
                    setActiveOnboardingStep(prev => prev + 1);
                  } else {
                    triggerToast('Profile Onboarding Completed! Dossier Saved.');
                    setActiveTab('matches');
                  }
                }}
                className="flex-1 py-2.5 rounded-full bg-[#c1272d] text-white text-xs font-semibold shadow-md"
              >
                {activeOnboardingStep < 4 ? 'Save & Continue' : 'Finish & View Matches (186+)'}
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 8: PRIVACY & VISIBILITY CONTROLS */}
        {activeTab === 'privacy' && (
          <div className="flex-1 overflow-y-auto pb-20 bg-[#f9f9ff] p-4 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-slate-900">Privacy &amp; Visibility Controls</h3>
            
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Mask Surname on Cards</span>
                  <span className="text-slate-500">e.g. Vikram M.</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#c1272d]" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Colleague Blackout</span>
                  <span className="text-slate-500">Shields from coworkers at employer</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#c1272d]" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Screenshot Shield (FLAG_SECURE)</span>
                  <span className="text-slate-500">Hardware blocks mobile screen capture</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#c1272d]" />
              </div>
            </div>

            <button onClick={() => triggerToast('Privacy Settings Saved!')} className="w-full py-2.5 rounded-full bg-[#c1272d] text-white font-semibold shadow-sm">
              Save Privacy Settings
            </button>
          </div>
        )}

        {/* SCREEN 9: SAFETY & PROTECTION CENTER */}
        {activeTab === 'safety' && (
          <div className="flex-1 overflow-y-auto pb-20 bg-[#f9f9ff] p-4 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-slate-900">Safety &amp; Protection Suite</h3>
            
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <button onClick={() => triggerToast('Profile Silently Blocked. Zero notifications sent.')} className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold text-center hover:bg-slate-200">
                Silent Block Candidate
              </button>

              <button onClick={() => triggerToast('Incident report queued for 15-minute priority audit.')} className="w-full py-2.5 rounded-xl bg-red-100 text-red-800 font-semibold text-center hover:bg-red-200">
                Report Abuse / Financial Solicitation
              </button>

              <a href="tel:1930" className="w-full py-2.5 rounded-xl bg-amber-50 text-amber-900 font-semibold text-center block">
                Call 1930 Cyber Fraud Helpline
              </a>
            </div>
          </div>
        )}

        {/* SCREEN 10: MEMBERSHIP CHECKOUT */}
        {activeTab === 'membership' && (
          <div className="flex-1 overflow-y-auto pb-20 bg-[#f9f9ff] p-4 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-slate-900 text-center">Membership Tiers</h3>
            
            <div className="p-4 bg-white rounded-2xl border-2 border-[#c1272d] shadow-md space-y-2">
              <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold uppercase">Popular</span>
              <h4 className="font-serif text-base font-bold text-slate-900">Executive Premium</h4>
              <div className="text-2xl font-bold text-[#c1272d]">₹111<span className="text-xs font-normal text-slate-500">/mo</span></div>
              <p className="text-slate-600">Direct masked voice/video calling, unlimited connects, 5x profile recommendation.</p>
              <button onClick={() => triggerToast('Subscribed to Executive Premium!')} className="w-full py-2 rounded-full bg-[#c1272d] text-white font-bold mt-2">
                Upgrade for ₹111/mo
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM TAB NAVIGATION BAR */}
        <div className="h-16 px-2 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-around text-slate-500 text-[10px] font-medium shrink-0 z-40">
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'matches' ? 'text-[#c1272d] font-bold' : 'hover:text-slate-900'}`}
          >
            <Heart className="w-5 h-5" fill={activeTab === 'matches' ? 'currentColor' : 'none'} />
            <span>Matches</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex flex-col items-center gap-1 relative ${activeTab === 'inbox' || activeTab === 'chat' ? 'text-[#c1272d] font-bold' : 'hover:text-slate-900'}`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            <span>Inbox</span>
          </button>

          <button
            onClick={() => setActiveTab('kundali')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'kundali' ? 'text-[#c1272d] font-bold' : 'hover:text-slate-900'}`}
          >
            <Sparkles className="w-5 h-5" />
            <span>Kundali</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'privacy' ? 'text-[#c1272d] font-bold' : 'hover:text-slate-900'}`}
          >
            <Lock className="w-5 h-5" />
            <span>Privacy</span>
          </button>

          <button
            onClick={() => setActiveTab('onboarding')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'onboarding' ? 'text-[#c1272d] font-bold' : 'hover:text-slate-900'}`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </div>

        {/* iOS Home Indicator Bar */}
        {isPhoneFrame && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full z-50"></div>
        )}
      </div>
    </div>
  );
};
