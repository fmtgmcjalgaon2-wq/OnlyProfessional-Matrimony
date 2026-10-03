import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, Lock, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

interface MembershipPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const MembershipPlansModal: React.FC<MembershipPlansModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'premium' | 'verified' | 'assisted'>('premium');
  const [step, setStep] = useState<'plans' | 'checkout' | 'success'>('plans');
  const [paymentRail, setPaymentRail] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('aditi.sharma@okhdfcbank');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const planPricing = {
    trial: { name: 'Complimentary Trial', amount: 0, text: 'Free for 48h' },
    premium: { name: 'Executive Premium', amount: 111, text: '₹111/mo' },
    verified: { name: 'Premium Verified (4-Pillar)', amount: 249, text: '₹249/mo' },
    assisted: { name: 'Assisted Matrimony (VIP Concierge)', amount: 500, text: '₹500/mo' }
  };

  const handlePay = async () => {
    try {
      setSubmitting(true);
      const plan = planPricing[selectedPlan];
      await api.createTransaction({
        planName: plan.name,
        amount: plan.amount,
        gateway: paymentRail === 'upi' ? 'UPI AutoPay' : 'Razorpay PG',
        paymentMethod: paymentRail === 'upi' ? 'GooglePay (UPI)' : 'Credit Card'
      });
      setStep('success');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#9e0418]">Exclusive Membership</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              {step === 'plans' ? 'Curated Investment Tiers' : step === 'checkout' ? 'Authorized Checkout & E-Mandate' : 'Subscription Confirmed!'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: PLANS SELECTION */}
        {step === 'plans' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Plan 1: Executive Premium */}
              <div
                onClick={() => setSelectedPlan('premium')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'premium'
                    ? 'border-[#c1272d] bg-red-50/20 shadow-md ring-2 ring-red-100'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="text-[10px] bg-red-100 text-[#9e0418] px-2 py-0.5 rounded-full font-bold uppercase">
                    Most Chosen
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-lg mt-2">Executive Premium</h4>
                  <div className="text-2xl font-bold text-[#9e0418] mt-1">₹111<span className="text-xs font-normal text-slate-500">/mo</span></div>
                  <p className="text-xs text-slate-500 mt-2">Full autonomous matchmaking, masked phone bridge, unlimited interests.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-700 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Unlimited Interests &amp; Chats</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Masked Anonymous Voice/Video</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>5x Daily Profile Recommendation</span>
                  </div>
                </div>
              </div>

              {/* Plan 2: Premium Verified */}
              <div
                onClick={() => setSelectedPlan('verified')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'verified'
                    ? 'border-[#c1272d] bg-amber-50/20 shadow-md ring-2 ring-amber-100'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase">
                    Gold Verified
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-lg mt-2">Premium Verified</h4>
                  <div className="text-2xl font-bold text-amber-900 mt-1">₹249<span className="text-xs font-normal text-slate-500">/mo</span></div>
                  <p className="text-xs text-slate-500 mt-2">Executive features + Full 4-Pillar DigiLocker &amp; ITR credential stamp.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-700 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>DigiLocker Aadhaar eKYC Stamp</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>Degree &amp; Form 16 Tax Verification</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>87% Higher Family Response Rate</span>
                  </div>
                </div>
              </div>

              {/* Plan 3: Assisted Matrimony */}
              <div
                onClick={() => setSelectedPlan('assisted')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'assisted'
                    ? 'border-[#c1272d] bg-rose-50/20 shadow-md ring-2 ring-rose-100'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="text-[10px] bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full font-bold uppercase">
                    VIP Concierge
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-lg mt-2">Assisted Matrimony</h4>
                  <div className="text-2xl font-bold text-purple-900 mt-1">₹500<span className="text-xs font-normal text-slate-500">/mo</span></div>
                  <p className="text-xs text-slate-500 mt-2">Dedicated Senior Human Relationship Manager + Vedic Astrologer consultation.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-700 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                    <span>Assigned Human Matchmaker</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                    <span>Chaperoned Family Video Meetings</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                    <span>8 Guaranteed Curated Intros / mo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>7-Day Matrimonial Pledge: 100% refund if unmatched within 7 days.</span>
              </div>
              <button
                onClick={() => setStep('checkout')}
                className="px-6 py-2.5 rounded-full bg-[#c1272d] hover:bg-[#9e0418] text-white font-semibold text-xs shadow-md transition-all active:scale-95"
              >
                Proceed to Checkout ({planPricing[selectedPlan].text})
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHECKOUT & PAYMENT */}
        {step === 'checkout' && (
          <div className="space-y-6">
            <div className="p-4 bg-[#f0f3ff] rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase font-semibold">Selected Tier</span>
                <h4 className="font-serif text-lg font-bold text-slate-900">{planPricing[selectedPlan].name}</h4>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-[#9e0418]">₹{planPricing[selectedPlan].amount}</span>
                <span className="text-xs text-slate-500 block">GST 18% inclusive</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 block">Select Payment Channel (RBI Autopay Compliant)</label>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentRail('upi')}
                  className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    paymentRail === 'upi' ? 'border-[#c1272d] bg-red-50 text-[#9e0418] shadow-sm' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI AutoPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentRail('card')}
                  className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    paymentRail === 'card' ? 'border-[#c1272d] bg-red-50 text-[#9e0418] shadow-sm' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards / RuPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentRail('netbanking')}
                  className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    paymentRail === 'netbanking' ? 'border-[#c1272d] bg-red-50 text-[#9e0418] shadow-sm' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            {/* UPI Input */}
            {paymentRail === 'upi' && (
              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-slate-700">Enter Virtual Payment Address (VPA)</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono"
                  placeholder="yourname@okhdfcbank"
                />
                <span className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, or BHIM app notification will be triggered.</span>
              </div>
            )}

            <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-900 leading-snug">
              <strong>Transparent Mandate Terms:</strong> Auto-renews monthly. You will receive an SMS and WhatsApp notification 48 hours prior to any deduction. Cancel anytime with 1-click in account settings.
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep('plans')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                ← Back to Plans
              </button>

              <button
                onClick={handlePay}
                disabled={submitting}
                className="px-6 py-2.5 rounded-full bg-[#c1272d] hover:bg-[#9e0418] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
              >
                {submitting ? 'Authenticating with Gateway...' : `Authorize & Pay ₹${planPricing[selectedPlan].amount}`}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h4 className="font-serif text-2xl font-bold text-slate-900">Membership Activated!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your {planPricing[selectedPlan].name} tier is now active. All verified contact unlocking, astrology dossiers, and priority recommendation features are immediately available.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-2.5 rounded-full bg-[#c1272d] text-white text-xs font-semibold shadow-md"
              >
                Explore Upgraded Matches
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
