import { X, Calendar, BookOpen, Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface ArticleModalProps {
  article: {
    title: string;
    category: string;
    date: string;
    author: string;
    img: string;
    content: string[];
    takeaways: string[];
  } | null;
  onClose: () => void;
}

export default function NuvicaArticleModal({ article, onClose }: ArticleModalProps) {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${article.title} - Read more on ReportSaathi`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b192c]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative animate-scaleUp my-auto max-h-[90vh] overflow-y-auto text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category Pill & Date */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] bg-[#eef6ff] px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#0b192c] tracking-tight leading-tight">
          {article.title}
        </h2>

        {/* Author info */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
            <div className="w-8 h-8 rounded-full bg-[#eef6ff] text-[#0284c7] flex items-center justify-center font-bold text-xs">
              🩺
            </div>
            <div>
              <p className="font-bold text-[#0b192c]">{article.author}</p>
              <p className="text-[10px] text-slate-400">Clinical Editorial Team</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                <span className="text-[#22c55e]">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Cover Photo */}
        <div className="rounded-2xl overflow-hidden h-52 sm:h-64 bg-slate-100">
          <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Key Takeaways Box */}
        <div className="p-4 bg-[#eef6ff] rounded-2xl border border-[#bae0ff]/60 space-y-2">
          <h4 className="text-xs font-black text-[#0284c7] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Key Patient Takeaways
          </h4>
          <ul className="pl-4 list-disc space-y-1 text-xs text-[#0b192c] font-medium">
            {article.takeaways.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#0b192c] hover:bg-[#132847] text-white font-bold text-xs rounded-2xl shadow-sm transition-transform active:scale-95"
        >
          Close Article
        </button>
      </div>
    </div>
  );
}
