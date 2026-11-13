import { ArrowUpRight } from 'lucide-react';
import { SAMPLE_REPORTS } from '../data/sampleReports';
import { ReportAnalysis } from '../types/report';

interface PanelCardsProps {
  onSelectReport: (report: ReportAnalysis) => void;
}

export default function NuvicaPanelCards({ onSelectReport }: PanelCardsProps) {
  return (
    <section id="panels-section" className="py-8 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Complete Blood Count (Matches Brain Health Card) */}
        <div
          onClick={() => onSelectReport(SAMPLE_REPORTS[0])}
          className="bg-white rounded-[32px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between group cursor-pointer h-72 relative overflow-hidden"
        >
          {/* Top Graphic Area: 3D Translucent Brain / Blood Cell Visual */}
          <div className="h-36 flex items-center justify-center relative">
            <div className="w-24 h-24 rounded-full bg-[#eef6ff] flex items-center justify-center relative group-hover:scale-110 transition-transform">
              {/* Stylized Glowing Organ Icon */}
              <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-md" fill="none">
                <circle cx="50" cy="50" r="38" fill="url(#brain-grad)" opacity="0.8" />
                <path d="M30 45 Q 40 30 50 45 T 70 45" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M32 58 Q 50 68 68 58" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="40" cy="40" r="3" fill="#22c55e" />
                <circle cx="60" cy="55" r="3" fill="#38bdf8" />
                <defs>
                  <linearGradient id="brain-grad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#0284c7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Circular Green Arrow Button at top right */}
            <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-[#22c55e] text-white flex items-center justify-center group-hover:rotate-45 transition-transform shadow-xs">
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          {/* Bottom Labels */}
          <div className="space-y-1 text-left">
            <h3 className="text-base font-extrabold text-[#0b192c] group-hover:text-[#0284c7] transition-colors">
              Blood Count (CBC) Check
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Hemoglobin, RBCs, Immune WBCs & Platelets
            </p>
          </div>
        </div>

        {/* Card 2: Liver Function & Metabolic (Matches Liver Function Card) */}
        <div
          onClick={() => onSelectReport(SAMPLE_REPORTS[2])}
          className="bg-white rounded-[32px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between group cursor-pointer h-72 relative overflow-hidden"
        >
          {/* Top Graphic Area: 3D Translucent Liver Visual */}
          <div className="h-36 flex items-center justify-center relative">
            <div className="w-24 h-24 rounded-full bg-[#f0fdf4] flex items-center justify-center relative group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-md" fill="none">
                <path d="M25 40 Q 50 20 78 35 Q 85 60 70 75 Q 40 85 22 65 Q 15 50 25 40 Z" fill="url(#liver-grad)" opacity="0.85" />
                <path d="M35 48 Q 55 52 65 42" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <circle cx="50" cy="58" r="3.5" fill="#ffffff" />
                <defs>
                  <linearGradient id="liver-grad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4ade80" />
                    <stop offset="0.6" stopColor="#22c55e" />
                    <stop offset="1" stopColor="#0284c7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Circular Green Arrow Button at top right */}
            <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-[#22c55e] text-white flex items-center justify-center group-hover:rotate-45 transition-transform shadow-xs">
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          {/* Bottom Labels */}
          <div className="space-y-1 text-left">
            <h3 className="text-base font-extrabold text-[#0b192c] group-hover:text-[#0284c7] transition-colors">
              Thyroid & Vitamin Test
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              TSH, Free T4, Vitamin D & Vital Micronutrients
            </p>
          </div>
        </div>

        {/* Card 3: Deep Navy Card (Matches Kidney Health Scan Card) */}
        <div
          onClick={() => onSelectReport(SAMPLE_REPORTS[1])}
          className="bg-gradient-to-br from-[#132847] to-[#0b192c] rounded-[32px] p-6 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer h-72 relative overflow-hidden text-white"
        >
          {/* Top Graphic Area: 3D Glowing Kidney / Heart Visual */}
          <div className="h-36 flex items-center justify-center relative">
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center relative group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-md" fill="none">
                <path d="M48 20 C 30 20 20 38 22 58 C 24 78 40 85 55 82 C 70 78 80 65 78 45 C 75 25 60 20 48 20 Z" fill="url(#kidney-grad)" opacity="0.85" />
                <path d="M38 45 Q 48 50 48 65" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="50" cy="52" r="3" fill="#38bdf8" />
                <defs>
                  <linearGradient id="kidney-grad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Circular White Arrow Button at top right (matches design) */}
            <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-white text-[#0b192c] flex items-center justify-center group-hover:rotate-45 transition-transform shadow-xs">
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          {/* Bottom Labels */}
          <div className="space-y-1 text-left">
            <h3 className="text-base font-extrabold text-white group-hover:text-[#38bdf8] transition-colors">
              Cardiovascular & Lipids
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              Total Cholesterol, LDL, HDL, Triglycerides & Glucose
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

