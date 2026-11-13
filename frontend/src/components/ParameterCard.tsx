import { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb 
} from 'lucide-react';
import { LabParameter, ParameterStatus } from '../types/report';

interface ParameterCardProps {
  parameter: LabParameter;
}

export default function ParameterCard({ parameter }: ParameterCardProps) {
  const [showTips, setShowTips] = useState(false);

  // Status visual mapping
  const getStatusBadge = (status: ParameterStatus) => {
    switch (status) {
      case 'normal':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
          label: 'In Normal Range',
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          indicatorColor: 'bg-emerald-500',
        };
      case 'high':
        return {
          icon: <ArrowUpRight className="w-4 h-4 text-rose-600" />,
          label: 'Higher than Range',
          badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
          indicatorColor: 'bg-rose-500',
        };
      case 'low':
        return {
          icon: <ArrowDownRight className="w-4 h-4 text-amber-600" />,
          label: 'Lower than Range',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
          indicatorColor: 'bg-amber-500',
        };
      case 'borderline':
        return {
          icon: <AlertCircle className="w-4 h-4 text-purple-600" />,
          label: 'Borderline',
          badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
          indicatorColor: 'bg-purple-500',
        };
      default:
        return {
          icon: <HelpCircle className="w-4 h-4 text-slate-500" />,
          label: 'Check With Doctor',
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
          indicatorColor: 'bg-slate-400',
        };
    }
  };

  const badge = getStatusBadge(parameter.status);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all shadow-xs space-y-4">
      {/* Top Header: Name, Status Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-slate-900">{parameter.name}</h4>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">
            Standard Reference: {parameter.reference_range || 'Not specified by lab'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right sm:text-right">
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">
              {parameter.value}
            </span>
            {parameter.unit && (
              <span className="text-xs text-slate-500 ml-1 font-medium">{parameter.unit}</span>
            )}
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.badgeClass}`}
          >
            {badge.icon}
            <span>{badge.label}</span>
          </div>
        </div>
      </div>

      {/* Explanations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          <p className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            What is this biomarker?
          </p>
          <p className="text-slate-600 leading-relaxed font-normal">
            {parameter.simple_explanation}
          </p>
        </div>

        <div className="bg-teal-50/40 p-3.5 rounded-xl border border-teal-100/70">
          <p className="font-semibold text-teal-900 mb-1 flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${badge.indicatorColor}`} />
            What this value means:
          </p>
          <p className="text-slate-700 leading-relaxed font-normal">
            {parameter.what_this_value_means}
          </p>
        </div>
      </div>

      {/* Expandable Lifestyle / Wellness Tips */}
      {parameter.lifestyle_tips && parameter.lifestyle_tips.length > 0 && (
        <div className="pt-1">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center justify-between w-full text-xs font-medium text-slate-600 hover:text-teal-700 py-1.5 transition-colors focus:outline-hidden"
          >
            <span className="flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              General wellness habits to discuss with your doctor
            </span>
            {showTips ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showTips && (
            <ul className="mt-2 pl-4 space-y-1.5 text-xs text-slate-600 bg-amber-50/40 p-3 rounded-xl border border-amber-100">
              {parameter.lifestyle_tips.map((tip, idx) => (
                <li key={idx} className="list-disc leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

