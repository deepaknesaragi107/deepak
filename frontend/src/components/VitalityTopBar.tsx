import { Search, Bell, Sparkles } from 'lucide-react';

interface TopBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onOpenUpload: () => void;
  isBackendConnected: boolean;
}

export default function VitalityTopBar({
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onOpenUpload,
  isBackendConnected,
}: TopBarProps) {
  const tabs = [
    { id: 'all', label: 'All Biomarkers' },
    { id: 'attention', label: 'Attention' },
    { id: 'normal', label: 'Normal' },
    { id: 'questions', label: 'Doctor Qs' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      {/* Navigation Tabs with Active Underline Bar */}
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className="relative pb-2 text-sm font-bold transition-colors whitespace-nowrap focus:outline-hidden"
            >
              <span
                className={`${
                  isActive ? 'text-[#369c97]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 w-8 h-1 bg-[#52c5c0] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Search Bar & Circular Bell Button */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#f2faf8] border-none rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#52c5c0]/50 text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Circular Action Button */}
        <button
          onClick={onOpenUpload}
          className="w-10 h-10 rounded-full bg-[#52c5c0] hover:bg-[#43aba5] text-white flex items-center justify-center shadow-xs transition-transform active:scale-95 flex-shrink-0"
          title={isBackendConnected ? "FastAPI Backend Connected" : "Client Demo Active"}
        >
          {isBackendConnected ? (
            <Sparkles className="w-4 h-4 text-[#fecb3e]" />
          ) : (
            <Bell className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

