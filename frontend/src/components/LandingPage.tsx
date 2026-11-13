import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../data/sampleReports';
import { ReportAnalysis } from '../types/report';

interface LandingPageProps {
  onStartDemo: () => void;
  onSelectSample: (sample: ReportAnalysis) => void;
  onOpenUpload: () => void;
}

export default function LandingPage({ onStartDemo, onSelectSample, onOpenUpload }: LandingPageProps) {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Interactive Patient Education Prototype • Realistic Demo Data</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Demystify Your Lab Reports in{' '}
          <span className="text-teal-600 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Simple Language
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Medical laboratory reports are often filled with confusing numbers, cryptic abbreviations, 
          and complex ranges. <strong>ReportSaathi</strong> translates clinical values into plain, compassionate 
          language so you can have more informed, confident conversations with your doctor.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onStartDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 text-sm sm:text-base"
          >
            <span>Explore Demo Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenUpload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-2xl border border-slate-300 transition-all active:scale-95 text-sm sm:text-base shadow-2xs"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Try Upload Interface</span>
          </button>
        </div>

        {/* Safe Educational Pill */}
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Strictly educational & non-diagnostic. We do not provide clinical advice or replace your physician.
        </p>
      </section>

      {/* The Problem & Our Solution (Before vs After) */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            From Laboratory Jargon to Clarity
          </h2>
          <p className="text-sm text-slate-600">
            See how ReportSaathi breaks down typical medical report entries into actionable understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Before Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-2.5 py-1 rounded-md">
                Raw Clinical Report
              </span>
              <span className="text-xs text-slate-400 font-mono">CBC-58291</span>
            </div>
            <div className="space-y-2 font-mono text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-slate-900 font-bold">Hb: 10.8 g/dL [Ref: 12.0 - 15.5]</p>
              <p>MCV: 76.0 fL [Ref: 80.0 - 100.0]</p>
              <p>RBC: 4.15 10^6/uL [Ref: 4.0 - 5.2]</p>
              <p className="text-slate-400 pt-2 border-t border-slate-100">
                Impression: Microcytosis with mild hypochromia.
              </p>
            </div>
            <p className="text-xs text-slate-500 italic">
              Overwhelming for most patients, causing unnecessary anxiety or confusing internet searches.
            </p>
          </div>

          {/* After Card */}
          <div className="bg-teal-50/50 border border-teal-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-1 rounded-md">
                ReportSaathi Translation
              </span>
              <span className="text-xs text-teal-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Patient-Friendly
              </span>
            </div>
            <div className="space-y-3 text-xs sm:text-sm bg-white p-4 rounded-xl border border-teal-100">
              <div>
                <p className="font-bold text-slate-900">Hemoglobin: 10.8 g/dL (Mildly Low)</p>
                <p className="text-slate-600 text-xs mt-0.5">
                  Hemoglobin carries oxygen through your blood. At 10.8, your body is working slightly harder to distribute oxygen, which can cause tiredness.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-xs text-teal-900">
                <span className="font-semibold">Question for your doctor:</span> "Should we check my ferritin (iron stores) to see if dietary changes or iron supplements could help?"
              </div>
            </div>
            <p className="text-xs text-teal-800 font-medium">
              Clear context, reassuring guidance, and targeted questions for your clinic visit.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works 3-Step Flow */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How ReportSaathi Works
          </h2>
          <p className="text-sm text-slate-600">
            A simple, secure 3-step process focused entirely on your health literacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-2xl flex items-center justify-center font-bold text-lg mb-4 mx-auto sm:mx-0">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Select or Upload Report</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upload your PDF, JPG, or PNG laboratory results, or choose from our realistic pre-loaded medical panels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-lg mb-4 mx-auto sm:mx-0">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Compare Reference Ranges</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Each biomarker is mapped against normal clinical intervals, highlighting normal, elevated, low, and borderline results.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center font-bold text-lg mb-4 mx-auto sm:mx-0">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Prepare for Your Doctor</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Receive simple everyday explanations and a printable checklist of tailored questions to ask during your consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Pre-loaded Sample Reports Showcase */}
      <section className="bg-gradient-to-b from-slate-50 to-teal-50/30 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Try a Realistic Sample Report
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select one of our curated laboratory panels to experience the interactive results view immediately:
            </p>
          </div>
          <button
            onClick={onStartDemo}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 self-start sm:self-center"
          >
            <span>View all in Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SAMPLE_REPORTS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    Sample Data
                  </span>
                  <span className="text-[11px] text-slate-400">{sample.report_date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-600 transition-colors">
                  {sample.report_title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {sample.summary}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">
                  {sample.categories.reduce((acc, cat) => acc + cat.parameters.length, 0)} tests
                </span>
                <span className="font-semibold text-teal-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Analyze <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Educational Mission Banner */}
      <section className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl flex-shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-amber-950 text-base sm:text-lg">
              Our Safety Philosophy: A Partner to Doctors, Not a Replacement
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
              Medicine requires holistic clinical context—your symptoms, family history, and physical examination. 
              ReportSaathi is intentionally engineered with safety boundaries: it will <strong>never</strong> diagnose you, 
              prescribe treatments, or urge you to stop medications. Its sole purpose is to elevate your health literacy 
              and make doctor visits less stressful and more collaborative.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
