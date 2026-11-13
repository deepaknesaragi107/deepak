import { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Lightbulb, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertCircle 
} from 'lucide-react';
import { ReportAnalysis, ParameterStatus } from '../types/report';

interface BiomarkerListProps {
  report: ReportAnalysis;
  selectedCategory: string;
}

export default function VitalityBiomarkerList({ report, selectedCategory }: BiomarkerListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const categoriesToDisplay = selectedCategory === 'all'
    ? report.categories
    : report.categories.filter((c) => c.category_name === selectedCategory);

  const getStatusPill = (status: ParameterStatus) => {
    switch (status) {
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e6f7f4] text-[#2c8d88]">
            <CheckCircle2 className="w-3 h-3 text-[#3ba5a0]" />
            Normal
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <ArrowUpRight className="w-3 h-3 text-rose-600" />
            High
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <ArrowDownRight className="w-3 h-3 text-amber-600" />
            Low
          </span>
        );
      case 'borderline':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <AlertCircle className="w-3 h-3 text-purple-600" />
            Borderline
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
            Check
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-[#cdebe6]/70 rounded-[28px] p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Extracted Biomarkers & Plain Explanations</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Click any biomarker to expand everyday explanations</p>
        </div>
        <span className="text-xs font-semibold text-[#3ba5a0] bg-[#e8f7f4] px-2.5 py-1 rounded-full">
          {categoriesToDisplay.reduce((acc, c) => acc + c.parameters.length, 0)} Tests
        </span>
      </div>

      {/* Biomarker List Rows */}
      <div className="space-y-2.5">
        {categoriesToDisplay.flatMap((cat) =>
          cat.parameters.map((param, pIdx) => {
            const isExpanded = expandedIndex === pIdx;

            return (
              <div
                key={`${cat.category_name}-${pIdx}`}
                className="border border-slate-100 rounded-2xl overflow-hidden hover:border-[#52c5c0]/50 transition-all bg-white"
              >
                {/* Clickable Header Row */}
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : pIdx)}
                  className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-[#f8fcfa] transition-colors select-none"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <span>{param.name}</span>
                      <span className="text-[10px] font-normal text-slate-400 font-mono">
                        [Ref: {param.reference_range || 'Not specified'}]
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400">{cat.category_name}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-extrabold text-slate-900">
                      {param.value} <span className="text-[10px] font-normal text-slate-500">{param.unit}</span>
                    </span>
                    {getStatusPill(param.status)}
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Plain Language Card */}
                {isExpanded && (
                  <div className="p-4 bg-[#f2faf8] border-t border-slate-100 space-y-3 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-[#cdebe6]/60">
                        <p className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#52c5c0]" />
                          What is this biomarker?
                        </p>
                        <p className="text-slate-600 leading-relaxed font-normal">
                          {param.simple_explanation}
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-[#cdebe6]/60">
                        <p className="font-bold text-[#2a837e] mb-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#fecb3e]" />
                          What your result means:
                        </p>
                        <p className="text-slate-700 leading-relaxed font-normal">
                          {param.what_this_value_means}
                        </p>
                      </div>
                    </div>

                    {param.lifestyle_tips && param.lifestyle_tips.length > 0 && (
                      <div className="bg-white p-3 rounded-xl border border-amber-100 text-amber-900 space-y-1">
                        <p className="font-bold text-amber-950 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          General Wellness Habits to Discuss with Doctor
                        </p>
                        <ul className="pl-4 list-disc space-y-0.5 text-slate-600">
                          {param.lifestyle_tips.map((tip, tIdx) => (
                            <li key={tIdx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

