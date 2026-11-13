import { ReportAnalysis } from '../types/report';

interface GaugeCardProps {
  report: ReportAnalysis;
}

export default function VitalityGaugeCard({ report }: GaugeCardProps) {
  let totalTests = 0;
  let inRangeCount = 0;

  report.categories.forEach((cat) => {
    cat.parameters.forEach((p) => {
      totalTests++;
      if (p.status === 'normal') inRangeCount++;
    });
  });

  const percentage = totalTests > 0 ? Math.round((inRangeCount / totalTests) * 100) : 100;
  const strokeDashoffset = 283 - (283 * percentage) / 100;

  return (
    <div className="bg-white border border-[#cdebe6]/70 rounded-[28px] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full min-h-[210px]">
      {/* Card Header */}
      <div className="flex items-center justify-between text-xs">
        <h4 className="font-bold text-slate-800">Biomarker Ratio</h4>
        <span className="text-[11px] text-slate-400 font-medium">{report.report_date || 'Latest Report'}</span>
      </div>

      {/* Circular Gauge */}
      <div className="relative flex items-center justify-center py-2">
        <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle track */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="transparent"
            stroke="#eef8f6"
            strokeWidth="9"
          />
          {/* Active progress arc in vitality teal */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="transparent"
            stroke="#52c5c0"
            strokeWidth="9"
            strokeDasharray="264"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-xl font-black text-slate-800 tracking-tight">
            {inRangeCount}/{totalTests}
          </span>
          <span className="text-[10px] font-semibold text-[#3ba5a0] uppercase tracking-wider">
            In Range
          </span>
        </div>

        {/* Small Indicator dots like in the image */}
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 absolute left-4 top-1/2 -translate-y-1/2" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 absolute right-4 top-1/2 -translate-y-1/2" />
      </div>

      {/* Comparison sub-text: "Avg 84% | You 83%" */}
      <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-medium">
        <span>Standard: <strong className="text-slate-700">85%</strong></span>
        <span className="text-slate-300">|</span>
        <span>You: <strong className="text-[#3ba5a0] font-bold">{percentage}%</strong></span>
      </div>
    </div>
  );
}

