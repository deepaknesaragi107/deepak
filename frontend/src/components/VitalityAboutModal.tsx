import { X, Heart, BookOpen, AlertTriangle } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export default function VitalityAboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#163a38]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#cdebe6] rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f7f4] text-[#2c8d88] text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Educational Mission & Safety Policy</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            About ReportSaathi
          </h2>
          <p className="text-xs text-slate-500">
            Translating complex clinical metrics into accessible, patient-first health literacy.
          </p>
        </div>

        <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 bg-[#f2faf8] rounded-2xl border border-[#cdebe6]/60 flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#52c5c0] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 block text-xs mb-0.5">Empowering Doctor-Patient Conversations</strong>
              We believe patients shouldn't feel frightened by abbreviations like MCV, eGFR, or TSH. ReportSaathi breaks down these biomarkers into 6th-grade language so you can walk into your appointment prepared.
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-950 block text-xs mb-0.5">Strict Non-Diagnostic Boundary</strong>
              ReportSaathi DOES NOT provide medical diagnoses, treatment advice, or prescriptions. Laboratory metrics must always be evaluated in conjunction with your complete medical history by a licensed physician.
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#52c5c0] hover:bg-[#43aba5] text-white font-bold text-xs rounded-2xl shadow-sm transition-transform active:scale-95"
        >
          Got it, return to Dashboard
        </button>
      </div>
    </div>
  );
}
