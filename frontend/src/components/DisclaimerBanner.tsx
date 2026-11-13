import { Info } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs mb-8">
      <div className="flex items-start gap-3.5">
        <div className="p-2 bg-amber-100 rounded-xl text-amber-800 flex-shrink-0 mt-0.5">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-amber-950 space-y-1">
          <h4 className="font-semibold text-amber-900 text-sm">
            Important Medical Notice & Safety Disclaimer
          </h4>
          <p className="leading-relaxed text-amber-900/90">
            ReportSaathi is an <strong>educational tool</strong> created to explain medical laboratory terms and typical reference ranges. 
            It <strong>does not</strong> provide medical advice, diagnosis, or treatment plans. Laboratory values must always be evaluated 
            in person by your physician in conjunction with your personal clinical history.
          </p>
          <p className="text-[11px] text-amber-800 font-medium pt-1">
            If you are experiencing severe symptoms or a medical emergency, please call your local emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

