import { useState } from 'react';
import { HelpCircle, Copy, Check, MessageSquare } from 'lucide-react';

interface DoctorQuestionsProps {
  questions: string[];
}

export default function DoctorQuestions({ questions }: DoctorQuestionsProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCopyAll = async () => {
    const textToCopy = questions
      .map((q, idx) => `${idx + 1}. ${q}`)
      .join('\n\n');
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Questions to Ask Your Doctor
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Empower your consultation by bringing these tailored questions to your appointment.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copy Questions</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((question, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                isChecked
                  ? 'bg-slate-50/80 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200/90 hover:border-teal-300 hover:bg-teal-50/20'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}}
                className="w-4 h-4 rounded text-teal-600 border-slate-300 focus:ring-teal-500 mt-0.5 cursor-pointer"
              />
              <div className="space-y-0.5 flex-1">
                <p
                  className={`text-sm ${
                    isChecked ? 'line-through text-slate-500' : 'text-slate-800 font-medium'
                  }`}
                >
                  {question}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100/60 flex items-center gap-3 text-xs text-teal-900">
        <HelpCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
        <span>
          Tip: You can check these off during your conversation with your doctor or print this page before visiting the clinic.
        </span>
      </div>
    </div>
  );
}

