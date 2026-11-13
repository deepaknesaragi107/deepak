import { useState } from 'react';
import { MoreVertical, Copy, Check, MessageSquare } from 'lucide-react';

interface DoctorChecklistProps {
  questions: string[];
}

export default function VitalityDoctorChecklist({ questions }: DoctorChecklistProps) {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleCheck = (idx: number) => {
    setCheckedState((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopy = async () => {
    const text = questions.map((q, idx) => `${idx + 1}. ${q}`).join('\n\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Avatar backgrounds for the contact cards
  const avatarColors = [
    'from-teal-400 to-emerald-500',
    'from-amber-400 to-orange-500',
    'from-indigo-400 to-purple-500',
    'from-rose-400 to-pink-500',
  ];

  return (
    <div className="bg-white border border-[#cdebe6]/70 rounded-[28px] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm">Doctor Consultation</h3>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-[#3ba5a0] p-1 rounded-lg transition-colors flex items-center gap-1 text-xs"
          title="Copy questions to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <MoreVertical className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Questions List styled like Lillian/Helena/Strickland */}
      <div className="space-y-3">
        {questions.slice(0, 3).map((q, idx) => {
          const isChecked = !!checkedState[idx];
          const colorClass = avatarColors[idx % avatarColors.length];

          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`flex items-center justify-between gap-3 p-2.5 rounded-2xl transition-all cursor-pointer select-none ${
                isChecked
                  ? 'bg-slate-50 opacity-60'
                  : 'hover:bg-[#f2faf8]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Circular Avatar */}
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-tr ${colorClass} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs`}
                >
                  <MessageSquare className="w-4 h-4" />
                </div>

                {/* Text & Snippet */}
                <div className="min-w-0">
                  <p
                    className={`text-xs font-bold text-slate-800 truncate ${
                      isChecked ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    Question {idx + 1}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate max-w-[140px] sm:max-w-[180px]">
                    {q}
                  </p>
                </div>
              </div>

              {/* Circular Badge matching the '3', '1', '5' in design */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 transition-colors ${
                  isChecked
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#52c5c0] text-white'
                }`}
              >
                {isChecked ? <Check className="w-3 h-3" /> : idx + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Copy Action Pill at bottom */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#e8f7f4] hover:bg-[#d6f2ee] text-[#2c8d88] font-bold text-xs rounded-xl transition-colors active:scale-95"
      >
        <Copy className="w-3.5 h-3.5" />
        <span>{copied ? 'Copied Questions!' : 'Copy All Questions'}</span>
      </button>
    </div>
  );
}

