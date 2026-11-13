import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenUpload: () => void;
  onScrollToSection: (sectionId: string) => void;
  isBackendConnected: boolean;
}

export default function NuvicaNavbar({
  onOpenUpload,
  onScrollToSection,
  isBackendConnected,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#dbeefd]/80 backdrop-blur-md py-4 px-4 sm:px-8 border-b border-white/60 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo matching "+ Nuvica" */}
        <div 
          onClick={() => onScrollToSection('hero-section')} 
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-full bg-[#0b192c] text-white flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shadow-xs">
            +
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-extrabold text-[#0b192c] tracking-tight">ReportSaathi</span>
          </div>
          {isBackendConnected && (
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping ml-1" title="Backend Live" />
          )}
        </div>

        {/* Center Menu */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#334155]">
          <button
            onClick={() => onScrollToSection('hero-section')}
            className="text-[#0284c7] font-bold hover:text-[#0b192c] transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => onScrollToSection('about-section')}
            className="hover:text-[#0284c7] transition-colors"
          >
            About
          </button>
          <button
            onClick={() => onScrollToSection('panels-section')}
            className="hover:text-[#0284c7] transition-colors flex items-center gap-1"
          >
            <span>Report Panels</span>
            <span className="text-[10px]">⌵</span>
          </button>
          <button
            onClick={() => onScrollToSection('doctor-section')}
            className="hover:text-[#0284c7] transition-colors"
          >
            Doctor Qs
          </button>
          <button
            onClick={() => onScrollToSection('safety-section')}
            className="hover:text-[#0284c7] transition-colors"
          >
            Safety
          </button>
        </nav>

        {/* Right CTA Button with Green Arrow Circle (matches "Contact Us ↗") */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUpload}
            className="group flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0b192c] pl-4 pr-1.5 py-1.5 rounded-full border border-slate-200/90 shadow-xs text-xs font-bold transition-all active:scale-95"
          >
            <span>Upload Report</span>
            <div className="w-7 h-7 rounded-full bg-[#22c55e] text-white flex items-center justify-center group-hover:rotate-45 transition-transform shadow-2xs">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
