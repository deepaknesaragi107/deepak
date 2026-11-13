import { useState } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Lightbulb, 
  ShieldAlert, 
  Copy, 
  Check, 
  FileText,
  FileCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles,
  Download,
  Search,
  BookOpen
} from 'lucide-react';
import { ReportAnalysis, ParameterStatus } from '../types/report';

interface ResultsViewProps {
  report: ReportAnalysis;
  onBack: () => void;
  onNewUpload: () => void;
}

export default function NuvicaResultsView({ report, onBack, onNewUpload }: ResultsViewProps) {
  const [copied, setCopied] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [showExtractedText, setShowExtractedText] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'attention' | 'normal'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopyQuestions = async () => {
    const text = report.questions_for_doctor.map((q, idx) => `${idx + 1}. ${q}`).join('\n\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportSummary = () => {
    const lines = [
      `============================================================`,
      `REPORTSAATHI - PATIENT CLINICAL SUMMARY (EDUCATIONAL)`,
      `============================================================`,
      `Report Title : ${report.report_title}`,
      `Patient Name : ${report.patient_name || 'Patient'}`,
      `Report Date  : ${report.report_date || 'Not specified'}`,
      `Generated At : ${new Date().toLocaleString()}`,
      `\n--- CLINICAL OVERVIEW ---`,
      report.summary,
      `\n--- EXTRACTED BIOMARKERS ---`,
    ];

    report.categories.forEach((cat) => {
      lines.push(`\n[${cat.category_name}]`);
      cat.parameters.forEach((p) => {
        lines.push(`* ${p.name}: ${p.value} ${p.unit || ''} (Ref: ${p.reference_range || 'Not specified'}) -> Status: ${p.status.toUpperCase()}`);
        lines.push(`  What this means: ${p.what_this_value_means}`);
        if (p.missing_or_unclear_notes) {
          lines.push(`  Note: ${p.missing_or_unclear_notes}`);
        }
      });
    });

    lines.push(`\n--- QUESTIONS TO ASK YOUR DOCTOR ---`);
    report.questions_for_doctor.forEach((q, idx) => {
      lines.push(`${idx + 1}. ${q}`);
    });

    lines.push(`\n============================================================`);
    lines.push(`DISCLAIMER: For educational purposes only. Does not replace physician consultation.`);
    lines.push(`============================================================`);

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ReportSaathi_Summary_${report.report_title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleQuestion = (idx: number) => {
    setCheckedQuestions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getStatusBadge = (status: ParameterStatus) => {
    switch (status) {
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#e8f7f4] text-[#166534] border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
            Normal
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
            High
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
            <ArrowDownRight className="w-3.5 h-3.5 text-amber-600" />
            Low
          </span>
        );
      case 'borderline':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-900 border border-purple-200">
            <AlertTriangle className="w-3.5 h-3.5 text-purple-600" />
            Borderline
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            Review
          </span>
        );
    }
  };

  // Filtered categories & parameters
  const filteredCategories = report.categories
    .map((cat) => {
      const filtered = cat.parameters.filter((p) => {
        const matchesSearch = !searchTerm || (
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.simple_explanation.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesStatus = statusFilter === 'all' ||
          (statusFilter === 'attention' && p.status !== 'normal') ||
          (statusFilter === 'normal' && p.status === 'normal');

        return matchesSearch && matchesStatus;
      });

      return { ...cat, parameters: filtered };
    })
    .filter((cat) => cat.parameters.length > 0);

  // Compute counts
  let totalCount = 0;
  let attentionCount = 0;
  report.categories.forEach((c) => {
    c.parameters.forEach((p) => {
      totalCount++;
      if (p.status !== 'normal') attentionCount++;
    });
  });

  return (
    <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6 space-y-8 text-left animate-fadeIn">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0b192c] bg-white hover:bg-slate-50 px-4 py-2.5 rounded-full border border-slate-200 shadow-2xs transition-all active:scale-95 self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportSummary}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] bg-[#eef6ff] hover:bg-[#dbeeff] px-4 py-2 rounded-full border border-[#bae0ff] transition-all active:scale-95 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Summary (.txt)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b192c] bg-white hover:bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-2xs transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>

          <button
            onClick={onNewUpload}
            className="group inline-flex items-center gap-2 bg-[#0b192c] hover:bg-[#132847] text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-sm text-xs font-bold transition-all active:scale-95"
          >
            <span>Upload Another</span>
            <div className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-[#eef6ff] border border-[#bae0ff] rounded-3xl p-5 shadow-xs flex items-start gap-4">
        <div className="p-2.5 bg-[#0284c7] text-white rounded-2xl flex-shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs text-[#0b192c]">
          <h4 className="font-extrabold text-sm text-[#0284c7]">
            Non-Diagnostic Educational Laboratory Notice
          </h4>
          <p className="leading-relaxed text-slate-600">
            {report.educational_disclaimer}
          </p>
          <p className="text-[11px] font-bold text-[#0284c7] pt-0.5">
            Do not alter medications or begin clinical therapies without explicit guidance from your licensed healthcare provider.
          </p>
        </div>
      </div>

      {/* Report Header Card */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0284c7] bg-[#eef6ff] px-3 py-1 rounded-full uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                Verified Analysis
              </span>
              {report.ocr_applied && (
                <span className="text-[11px] font-bold text-[#166534] bg-[#e8f7f4] px-2.5 py-0.5 rounded-full border border-emerald-200">
                  OCR Applied
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0b192c] tracking-tight pt-1">
              {report.report_title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              {report.patient_name || 'Patient'} • {report.report_date}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-[#0284c7] hover:underline flex items-center gap-1 font-bold"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showGlossary ? 'Hide Medical Units Glossary' : 'Medical Units Glossary'}</span>
            </button>
          </div>
        </div>

        {/* Medical Units Glossary Drawer */}
        {showGlossary && (
          <div className="p-4 bg-[#f8fafc] rounded-2xl border border-slate-200 text-xs space-y-2 animate-fadeIn">
            <h4 className="font-extrabold text-[#0b192c] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#0284c7]" />
              Quick Guide to Medical Measurement Units
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <p className="font-mono font-bold text-[#0284c7]">g/dL</p>
                <p className="text-slate-500 text-[11px]">Grams per deciliter: measures concentration of hemoglobin in whole blood.</p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <p className="font-mono font-bold text-[#0284c7]">fL</p>
                <p className="text-slate-500 text-[11px]">Femtoliters (one quadrillionth of a liter): measures microscopic red blood cell volume.</p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <p className="font-mono font-bold text-[#0284c7]">mg/dL</p>
                <p className="text-slate-500 text-[11px]">Milligrams per deciliter: standard for glucose, cholesterol, and creatinine.</p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <p className="font-mono font-bold text-[#0284c7]">mIU/L or ng/mL</p>
                <p className="text-slate-500 text-[11px]">Milli-international units / nanograms per mL: used for hormones (TSH) and vitamins (D3).</p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Overview */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-100 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
            Plain-Language Clinical Overview
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {report.summary}
          </p>
        </div>

        {/* Unclear or Missing Information Note if present */}
        {report.unclear_items_note && (
          <div className="p-4 bg-amber-50/90 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-950 font-bold mb-0.5">Note on Missing or Unclear Items:</strong>
              <p className="leading-relaxed">{report.unclear_items_note}</p>
            </div>
          </div>
        )}
      </div>

      {/* Extracted Clinical Values Table with Search & Status Filters */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-extrabold text-[#0b192c] tracking-tight">
              Extracted Clinical Biomarkers
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Exact values extracted from your report. Only printed reference intervals are displayed; none are invented.
            </p>
          </div>

          {/* Search & Status Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search biomarker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-[#f8fafc] border border-slate-200 rounded-full focus:outline-hidden focus:ring-1 focus:ring-[#0284c7] w-40 sm:w-48"
              />
            </div>

            <div className="flex items-center gap-1 bg-[#f8fafc] p-1 rounded-full border border-slate-200 text-[11px] font-bold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-full transition-all ${
                  statusFilter === 'all' ? 'bg-[#0b192c] text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All ({totalCount})
              </button>

              <button
                onClick={() => setStatusFilter('attention')}
                className={`px-3 py-1 rounded-full transition-all ${
                  statusFilter === 'attention' ? 'bg-[#0284c7] text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Attention ({attentionCount})
              </button>

              <button
                onClick={() => setStatusFilter('normal')}
                className={`px-3 py-1 rounded-full transition-all ${
                  statusFilter === 'normal' ? 'bg-[#22c55e] text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Normal ({totalCount - attentionCount})
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Raw Document Text Button */}
        {report.extracted_text && (
          <div className="text-right">
            <button
              onClick={() => setShowExtractedText(!showExtractedText)}
              className="text-xs font-bold text-[#0284c7] hover:underline inline-flex items-center gap-1"
            >
              <span>{showExtractedText ? 'Hide Raw Document Text' : 'View Raw Document Stream'}</span>
              {showExtractedText ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {showExtractedText && report.extracted_text && (
          <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto max-h-60 overflow-y-auto space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-800">
              Raw Extracted Document Stream:
            </div>
            <pre className="whitespace-pre-wrap">{report.extracted_text}</pre>
          </div>
        )}

        {/* Table View */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f8fafc] text-slate-600 font-bold border-b border-slate-100">
                <th className="py-3 px-4">Biomarker</th>
                <th className="py-3 px-4">Observed Result</th>
                <th className="py-3 px-4">Laboratory Reference Interval</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCategories.flatMap((cat) =>
                cat.parameters.map((p, idx) => (
                  <tr key={`${cat.category_name}-${idx}`} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#0b192c]">{p.name}</p>
                      <p className="text-[11px] text-slate-400">{cat.category_name}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-slate-900">
                      {p.value} <span className="text-xs text-slate-400 font-normal">{p.unit || ''}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      {p.reference_range ? p.reference_range : (
                        <span className="italic text-slate-400">Not specified by lab</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">{getStatusBadge(p.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Biomarker Explanations with Source Fact Separation */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0b192c] tracking-tight">
            Detailed Biomarker Explanations
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Notice: Source document facts are highlighted distinctly from plain-language AI translations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.flatMap((cat) =>
            cat.parameters.map((p, idx) => (
              <div
                key={`exp-${cat.category_name}-${idx}`}
                className="bg-white rounded-[28px] p-5 shadow-xs border border-slate-100 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-[#0b192c] text-sm">{p.name}</h3>
                  {getStatusBadge(p.status)}
                </div>

                {/* Explicit Source Fact Excerpt */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 font-mono text-[11px] text-slate-600 flex items-start gap-2">
                  <FileCheck className="w-3.5 h-3.5 text-[#0284c7] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Document Source Fact:
                    </span>
                    <span>{p.source_fact || `${p.name}: ${p.value} ${p.unit || ''} (Ref: ${p.reference_range || 'None'})`}</span>
                  </div>
                </div>

                {/* AI Plain Language Translation */}
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-3 bg-[#f8fafc] rounded-xl border border-slate-100">
                    <strong className="text-slate-800 block mb-0.5">What is this biomarker?</strong>
                    {p.simple_explanation}
                  </div>
                  <div className="p-3 bg-[#eef6ff] rounded-xl border border-[#bae0ff]/60 text-[#0b192c]">
                    <strong className="text-[#0284c7] block mb-0.5">What this value means:</strong>
                    {p.what_this_value_means}
                  </div>
                </div>

                {/* Missing / Unclear Note for this parameter */}
                {p.missing_or_unclear_notes && (
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                    <strong>Note:</strong> {p.missing_or_unclear_notes}
                  </div>
                )}

                {/* Lifestyle Tips */}
                {p.lifestyle_tips && p.lifestyle_tips.length > 0 && (
                  <div className="text-[11px] text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-100 space-y-1">
                    <strong className="flex items-center gap-1 font-bold">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      Discuss with your doctor:
                    </strong>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                      {p.lifestyle_tips.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Doctor Consultation Checklist */}
      <div id="doctor-section" className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-extrabold text-[#0b192c] tracking-tight">
              Questions to Ask Your Doctor
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Empower your consultation with these tailored questions.
            </p>
          </div>

          <button
            onClick={handleCopyQuestions}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f8fafc] hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-colors active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                <span className="text-[#22c55e]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Questions</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-3">
          {report.questions_for_doctor.map((q, idx) => {
            const isChecked = !!checkedQuestions[idx];

            return (
              <div
                key={idx}
                onClick={() => toggleQuestion(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : 'bg-[#f8fafc] hover:bg-[#eef6ff] border-slate-100'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isChecked
                      ? 'bg-[#22c55e] text-white'
                      : 'bg-[#0284c7] text-white'
                  }`}
                >
                  {isChecked ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <p
                  className={`text-xs sm:text-sm font-semibold ${
                    isChecked ? 'line-through text-slate-400' : 'text-[#0b192c]'
                  }`}
                >
                  {q}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
