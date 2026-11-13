import { CheckCircle2, AlertTriangle, FileText, Calendar, User, Sparkles } from 'lucide-react';
import { ReportAnalysis } from '../types/report';

interface ReportSummaryProps {
  report: ReportAnalysis;
}

export default function ReportSummary({ report }: ReportSummaryProps) {
  // Compute summary stats
  let totalParameters = 0;
  let normalCount = 0;
  let attentionCount = 0;

  report.categories.forEach((category) => {
    category.parameters.forEach((param) => {
      totalParameters++;
      if (param.status === 'normal') {
        normalCount++;
      } else {
        attentionCount++;
      }
    });
  });

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Title & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-teal-50 text-teal-700 px-3 py-1 rounded-full mb-2">
            <FileText className="w-3.5 h-3.5" />
            {report.extraction_method === 'demo_mock' ? 'Educational Sample Analysis' : 'Verified Report Analysis'}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {report.report_title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          {report.patient_name && (
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{report.patient_name}</span>
            </div>
          )}
          {report.report_date && (
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{report.report_date}</span>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Biomarkers Analyzed</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{totalParameters}</p>
          </div>
          <div className="p-2.5 bg-white text-slate-600 rounded-xl border border-slate-200/60 shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-800 font-medium">In Standard Range</p>
            <p className="text-2xl font-bold text-emerald-700 mt-0.5">{normalCount}</p>
          </div>
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-amber-900 font-medium">Discuss With Doctor</p>
            <p className="text-2xl font-bold text-amber-700 mt-0.5">{attentionCount}</p>
          </div>
          <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Warm Plain-Language Summary */}
      <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Executive Summary
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed font-normal">
          {report.summary}
        </p>
      </div>

      {/* Key Takeaways */}
      {report.key_findings && report.key_findings.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Key Observations to Note
          </h3>
          <ul className="space-y-2">
            {report.key_findings.map((finding, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                <span className="leading-snug">{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

