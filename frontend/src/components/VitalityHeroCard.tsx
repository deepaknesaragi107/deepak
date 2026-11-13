import { TrendingUp, BarChart2 } from 'lucide-react';
import { ReportAnalysis } from '../types/report';

interface HeroCardProps {
  report: ReportAnalysis;
}

export default function VitalityHeroCard({ report }: HeroCardProps) {
  let totalTests = 0;
  let normalTests = 0;
  let attentionTests = 0;

  report.categories.forEach((cat) => {
    cat.parameters.forEach((p) => {
      totalTests++;
      if (p.status === 'normal') normalTests++;
      else attentionTests++;
    });
  });

  const normalPercent = totalTests > 0 ? Math.round((normalTests / totalTests) * 100) : 100;

  return (
    <div className="bg-gradient-to-r from-[#4bb9b4] via-[#54c4bf] to-[#77dfd8] rounded-[28px] p-6 sm:p-7 text-white shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[210px]">
      {/* Top Header Labels & Icons */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-8 text-xs font-semibold">
          <span className="text-white/95">Biomarker Health Score</span>
          <span className="text-white/80">Physiological Range Curve</span>
        </div>

        <div className="flex items-center gap-2 text-white/80">
          <TrendingUp className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
          <BarChart2 className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Main Metric & Dynamic Sine Wave Chart */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center z-10 pt-2">
        {/* Left Metric Column */}
        <div className="md:col-span-5 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-black tracking-tight drop-shadow-xs">
              {normalPercent}%
            </span>
            <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full text-white uppercase tracking-wider">
              {attentionTests > 0 ? 'Review Needed' : 'Optimal'}
            </span>
          </div>

          <div className="text-[11px] text-white/90 font-medium pt-1 flex items-center gap-3">
            <span>In Range: <strong className="text-white font-bold">{normalTests}</strong></span>
            <span>•</span>
            <span>Attention: <strong className="text-[#fecb3e] font-bold">{attentionTests}</strong></span>
          </div>
        </div>

        {/* Right SVG Wave Graph */}
        <div className="md:col-span-7 relative h-28 flex items-center justify-center">
          <svg
            viewBox="0 0 320 100"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Faint Reference Wave */}
            <path
              d="M0 65 Q 40 85, 80 50 T 160 55 T 240 40 T 320 60"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              fill="none"
            />

            {/* Foreground Patient Curve */}
            <path
              d="M0 70 Q 45 95, 90 35 T 175 75 T 260 25 T 320 50"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Gradient Fill under Foreground Curve */}
            <path
              d="M0 70 Q 45 95, 90 35 T 175 75 T 260 25 T 320 50 L 320 100 L 0 100 Z"
              fill="url(#wave-gradient)"
              opacity="0.25"
            />

            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Indicator Marker 1 (Near the peak) */}
            <circle cx="90" cy="35" r="4.5" fill="#ffffff" stroke="#52c5c0" strokeWidth="2.5" />
            
            {/* Indicator Marker 2 (Near the attention point) */}
            <circle cx="260" cy="25" r="5" fill="#fecb3e" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Floating Pill Tag 1 (mimicking the "Run 18" tag in design) */}
          <div className="absolute top-1 left-16 bg-white/20 backdrop-blur-xs border border-white/40 rounded-xl px-2 py-1 text-[9px] font-bold text-white shadow-2xs">
            Ref Range
          </div>

          {/* Floating Pill Tag 2 (mimicking the "Run 31" tag in design) */}
          <div className="absolute top-0 right-14 bg-[#fecb3e] text-[#183c3a] rounded-xl px-2 py-1 text-[9px] font-extrabold shadow-xs">
            {attentionTests > 0 ? `${attentionTests} Out of Range` : 'All Clear'}
          </div>
        </div>
      </div>

      {/* Decorative Glow in Background */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}

