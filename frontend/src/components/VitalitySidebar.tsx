import { 
  Activity, 
  Bookmark, 
  Zap, 
  Calendar, 
  Grid, 
  HelpCircle, 
  UploadCloud, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenUpload: () => void;
  onOpenAbout: () => void;
}

export default function VitalitySidebar({
  activeTab,
  onSelectTab,
  onOpenUpload,
  onOpenAbout,
}: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Community', icon: Bookmark },
    { id: 'biomarkers', label: 'Biomarkers', icon: Zap },
    { id: 'doctor', label: 'Doctor Qs', icon: Calendar },
    { id: 'categories', label: 'Panels', icon: Grid },
    { id: 'about', label: 'About & Safety', icon: HelpCircle },
  ];

  return (
    <aside className="bg-[#52c5c0] rounded-[28px] p-5 sm:p-6 text-white flex flex-col justify-between w-full lg:w-64 shadow-md flex-shrink-0">
      {/* Brand Header */}
      <div className="space-y-8">
        <div className="flex items-center gap-2.5 px-2">
          <div className="flex items-center tracking-tight text-2xl font-black">
            <span className="text-[#fecb3e] text-3xl font-black">R</span>
            <span className="text-white font-extrabold text-2xl">eportSaathi</span>
          </div>
          <Activity className="w-5 h-5 text-white/90 animate-pulse ml-0.5" />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'about') {
                    onOpenAbout();
                  } else {
                    onSelectTab(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-white text-[#3ba5a0] shadow-sm font-bold scale-[1.02]'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#3ba5a0]' : 'text-white/80'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="pt-8 space-y-3">
        {/* Upload Action Button */}
        <button
          onClick={onOpenUpload}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#fecb3e] hover:bg-[#fad35b] text-[#163b39] font-bold text-xs rounded-2xl shadow-sm transition-transform active:scale-95"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Lab Report</span>
        </button>

        {/* Non-Diagnostic Safety Pill */}
        <div className="px-3 py-2 bg-white/15 rounded-2xl flex items-center gap-2 text-[11px] text-white/95">
          <ShieldCheck className="w-3.5 h-3.5 text-[#fecb3e] flex-shrink-0" />
          <span className="leading-tight">Non-Diagnostic Educational Tool</span>
        </div>

        {/* Exit / Reset view button matching "Go Out" in design */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/80 hover:text-white transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Reset View</span>
        </button>
      </div>
    </aside>
  );
}

