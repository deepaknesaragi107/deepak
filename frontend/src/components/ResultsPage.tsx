import { useState } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Table as TableIcon, 
  Lightbulb, 
  Sparkles,
  ShieldAlert,
  Calendar,
  User
} from 'lucide-react';
import { ReportAnalysis, ParameterStatus } from '../types/report';
import ParameterCard from './ParameterCard';
import DoctorQuestions from './DoctorQuestions';

interface ResultsPageProps {
  report: ReportAnalysis;
  onBack: () => void;
  onNewUpload: () => void;
}

export default function ResultsPage({ report, onBack, onNewUpload }: ResultsPageProps) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Compute metrics
  let totalTests = 0;
  let inRangeCount = 0;
  let outOfRangeCount = 0;

  report.categories.forEach((cat) => {
    cat.parameters.forEach((param) => {
      totalTests++;
      if (param.status === 'normal') {
        inRangeCount++;
      } else {
        outOfRangeCount++;
      }
    });
  });

  const getStatusBadge = (status: ParameterStatus) => {
    switch (status) {
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            Normal
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-700" />
            High
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
            <ArrowDownRight className="w-3.5 h-3.5 text-amber-700" />
            Low
          </span>
        );
      case 'borderline':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-900 border border-purple-300">
            <AlertTriangle className="w-3.5 h-3.5 text-purple-700" />
            Borderline
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
            Check
          </span>
        );
    }
  };

  const filteredCategories = activeCategoryFilter === 'all'
    ? report.categories
    : report.categories.filter((c) => c.category_name === activeCategoryFilter);

  return (
    <div className="space-y-8 py-2">
      {/* Top Action & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-300 transition-all shadow-2xs self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 px-4 py-2.5 rounded-xl border border-teal-200 transition-all active:scale-95 shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <button
            onClick={onNewUpload}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
          >
            <span>Upload Another</span>
          </button>
        </div>
      </div>

      {/* Mandatory Educational Disclaimer Banner */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-2xl flex-shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-amber-950">
            <h4 className="font-extrabold text-amber-900 text-sm sm:text-base">
              Non-Diagnostic Educational Medical Notice
            </h4>
            <p className="leading-relaxed text-amber-950/90 font-normal">
              {report.educational_disclaimer}
            </p>
            <p className="text-[11px] text-amber-800 font-semibold pt-1">
              Do not adjust medications, start supplements, or make clinical decisions without a formal consultation with your physician.
            </p>
          </div>
        </div>
      </div>

      {/* Report Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-teal-50 text-teal-800 px-3 py-1 rounded-full">
              <FileText className="w-3.5 h-3.5" />
              Patient Educational Summary
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight pt-1">
              {report.report_title}
            </h1>
            {report.lab_name && (
              <p className="text-xs text-slate-500 font-medium">
                Originating Lab: {report.lab_name}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-600">
            {report.patient_name && (
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{report.patient_name}</span>
              </div>
            )}
            {report.report_date && (
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{report.report_date}</span>
              </div>
            )}
          </div>
        </div>

        {/* Statistical Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Total Biomarkers
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">{totalTests}</p>
            </div>
            <div className="p-3 bg-white text-slate-700 rounded-xl border border-slate-200 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">
                Standard Range
              </p>
              <p className="text-2xl font-black text-emerald-800 mt-1">{inRangeCount}</p>
            </div>
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-900 font-semibold uppercase tracking-wider">
                Review with Doctor
              </p>
              <p className="text-2xl font-black text-amber-800 mt-1">{outOfRangeCount}</p>
            </div>
            <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* High-Level Plain-Language Summary */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Overall Understanding
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {report.summary}
          </p>
        </div>

        {/* Key Observations */}
        {report.key_findings && report.key_findings.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Key Takeaways
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {report.key_findings.map((finding, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                  <span className="leading-snug">{finding}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 1: Extracted Clinical Values Table */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-teal-600" />
              Extracted Clinical Laboratory Values
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Exact numerical metrics identified from your report alongside standard reference intervals.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeCategoryFilter === 'all'
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Panels
            </button>
            {report.categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategoryFilter(cat.category_name)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeCategoryFilter === cat.category_name
                    ? 'bg-teal-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.category_name.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Clinical Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3.5 px-4">Test / Biomarker</th>
                <th className="py-3.5 px-4">Observed Value</th>
                <th className="py-3.5 px-4">Reference Interval</th>
                <th className="py-3.5 px-4 text-right sm:text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCategories.flatMap((category) =>
                category.parameters.map((param, paramIdx) => (
                  <tr
                    key={`${category.category_name}-${paramIdx}`}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>
                        {param.name}
                        <span className="block text-[11px] font-normal text-slate-400 sm:hidden">
                          {category.category_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900">
                      {param.value}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        {param.unit || ''}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {param.reference_range || 'Not defined'}
                    </td>
                    <td className="py-3.5 px-4 text-right sm:text-center">
                      {getStatusBadge(param.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Plain-Language Explanations */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Plain-Language Biomarker Explanations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              What each test does in your body, what your result means, and general wellness habits.
            </p>
          </div>
        </div>

        {filteredCategories.map((category, catIdx) => (
          <div key={catIdx} className="space-y-3.5">
            <div className="flex items-center gap-2 bg-slate-100/90 px-4 py-2 rounded-xl border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
                {category.category_name}
              </h3>
            </div>

            <div className="space-y-3.5">
              {category.parameters.map((param, paramIdx) => (
                <ParameterCard key={paramIdx} parameter={param} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Section 3: Questions to Ask Your Doctor */}
      {report.questions_for_doctor && report.questions_for_doctor.length > 0 && (
        <section>
          <DoctorQuestions questions={report.questions_for_doctor} />
        </section>
      )}

      {/* Bottom Medical Disclaimer */}
      <div className="text-center p-6 bg-slate-100 rounded-3xl border border-slate-200 text-xs text-slate-600 space-y-1">
        <p className="font-bold text-slate-800">
          Medical Responsibility & Liability Disclaimer
        </p>
        <p className="max-w-2xl mx-auto leading-relaxed">
          ReportSaathi is intended strictly for educational enrichment and health literacy. 
          Under no circumstances should this software be construed as medical diagnosis, clinical prognosis, 
          or advice on therapy. Always discuss all test results with your personal doctor.
        </p>
      </div>
    </div>
  );
}
