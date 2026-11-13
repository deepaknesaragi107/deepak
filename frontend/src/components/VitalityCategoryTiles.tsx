import { Droplet, Heart, Sun, Plus } from 'lucide-react';
import { ReportAnalysis } from '../types/report';

interface CategoryTilesProps {
  report: ReportAnalysis;
  onSelectCategory: (catName: string) => void;
  activeCategory: string;
  onOpenUpload: () => void;
}

export default function VitalityCategoryTiles({
  report,
  onSelectCategory,
  activeCategory,
  onOpenUpload,
}: CategoryTilesProps) {
  // Tile icon map
  const getIconForIndex = (index: number) => {
    switch (index % 3) {
      case 0:
        return Droplet;
      case 1:
        return Heart;
      default:
        return Sun;
    }
  };

  return (
    <div className="bg-white border border-[#cdebe6]/70 rounded-[28px] p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm">Biomarker Panels</h3>
        <span className="text-[11px] text-slate-400 font-medium">Filter by system</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
        {/* Category Tiles */}
        {report.categories.map((cat, idx) => {
          const Icon = getIconForIndex(idx);
          const isSelected = activeCategory === cat.category_name;

          return (
            <button
              key={idx}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.category_name)}
              className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all flex-shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#52c5c0] text-white shadow-sm scale-105'
                  : 'bg-[#e5f7f4] text-[#3ba5a0] hover:bg-[#d6f3ef]'
              }`}
              title={cat.category_name}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}

        {/* Signature Yellow "+" Button from Design */}
        <button
          onClick={onOpenUpload}
          className="w-14 h-14 rounded-2xl bg-[#fecb3e] hover:bg-[#fad35b] text-[#173c3a] flex items-center justify-center shadow-xs transition-transform active:scale-95 flex-shrink-0 cursor-pointer"
          title="Upload new lab report"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}

