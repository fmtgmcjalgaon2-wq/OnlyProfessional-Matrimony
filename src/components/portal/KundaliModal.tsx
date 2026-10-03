import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Download, PhoneCall, X } from 'lucide-react';
import { api } from '../../services/api';
import { KundaliResult } from '../../types';

interface KundaliModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KundaliModal: React.FC<KundaliModalProps> = ({ isOpen, onClose }) => {
  const [candidate1, setCandidate1] = useState('OPM-9821');
  const [candidate2, setCandidate2] = useState('OPM-7612');
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<KundaliResult | null>(null);

  if (!isOpen) return null;

  const handleCalculate = async () => {
    try {
      setCalculating(true);
      const res = await api.calculateKundaliMilan(candidate1, candidate2);
      setResult(res);
    } catch (err) {
      console.error('Failed to calculate kundali:', err);
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6a4500]">Vedic Astrometry Engine</span>
              <h3 className="font-serif text-xl font-bold text-slate-900">36 Gunas Ashtakoot Milan Calculator</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Candidate Selector */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">First Candidate (Groom/Bride)</label>
            <select
              value={candidate1}
              onChange={(e) => setCandidate1(e.target.value)}
              className="w-full bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none"
            >
              <option value="OPM-9821">Vikram Malhotra (Taurus - Rohini)</option>
              <option value="OPM-88912">Dr. Rajesh Sen (Leo - Magha)</option>
              <option value="OPM-5509">Siddharth Kashyap (Gemini - Punarvasu)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Second Candidate (Prospective Match)</label>
            <select
              value={candidate2}
              onChange={(e) => setCandidate2(e.target.value)}
              className="w-full bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none"
            >
              <option value="OPM-7612">Dr. Riya Sen (Leo - Magha)</option>
              <option value="OPM-67431">Ananya Deshmukh (Virgo - Hasta)</option>
              <option value="OPM-91043">Sneha Kapoor (Taurus - Rohini)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={calculating}
          className="w-full py-3 rounded-full bg-[#c1272d] hover:bg-[#9e0418] text-white text-xs font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{calculating ? 'Analyzing Ephemeris Planetary Harmonies...' : 'Calculate 36 Guna Ashtakoot Score'}</span>
        </button>

        {/* Calculation Result */}
        {result && (
          <div className="space-y-4 pt-2 border-t border-slate-100 animate-in fade-in">
            {/* Score Ring & Verdict */}
            <div className="bg-[#f0f3ff] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" r="40" stroke="#dee2f0" strokeWidth="8" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      fill="none" 
                      r="40" 
                      stroke="#c1272d" 
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * result.totalScore) / 36}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-serif text-2xl font-bold text-slate-900 leading-none">{result.totalScore}</span>
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">/ 36</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                    {result.verdict}
                  </span>
                  <h4 className="font-serif text-base font-bold text-slate-900 mt-1">
                    {result.percentage}% Astrological Harmony
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">{result.nadiDosha} • {result.manglikStatus}</p>
                </div>
              </div>

              <button
                onClick={() => alert('Downloading official 18-page Vedic Kundali PDF report...')}
                className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold shadow-sm border border-slate-200 flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download PDF</span>
              </button>
            </div>

            {/* Ashtakoot Koota Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Koota</th>
                    <th className="py-2 px-3">Dimension Evaluated</th>
                    <th className="py-2 px-3">Max</th>
                    <th className="py-2 px-3">Obtained</th>
                    <th className="py-2 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {result.kootas.map((k, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-semibold text-slate-900">{k.name}</td>
                      <td className="py-2 px-3 text-slate-500">{k.meaning}</td>
                      <td className="py-2 px-3">{k.max}</td>
                      <td className="py-2 px-3 font-bold text-[#9e0418]">{k.scored}</td>
                      <td className="py-2 px-3 text-right text-emerald-700 font-semibold">Favorable</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
