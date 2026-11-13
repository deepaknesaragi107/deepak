import { ArrowUpRight, Dna } from 'lucide-react';

interface DnaSectionProps {
  onOpenUpload: () => void;
  onExploreDemo: () => void;
}

export default function NuvicaDnaSection({ onOpenUpload, onExploreDemo }: DnaSectionProps) {
  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Hero Card: "WE OFFER PRO DNA / LAB TESTING" */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#e0f0fe] via-[#ecf5fe] to-[#ffffff] rounded-[36px] p-6 sm:p-9 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[380px]">
          {/* Header */}
          <div className="space-y-1 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b192c] tracking-tight">
              WE OFFER SMART LAB <br /> REPORT ANALYSIS
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Transforming complex clinical results into simple health intelligence.
            </p>
          </div>

          {/* 3D Glowing DNA Double Helix Graphic */}
          <div className="my-6 relative h-48 sm:h-56 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#0284c7]/15 rounded-full blur-3xl pointer-events-none" />

            <svg viewBox="0 0 450 180" className="w-full h-full drop-shadow-xl overflow-visible" fill="none">
              {/* Top Strand with Cyan to Green gradient */}
              <path
                d="M10 90 Q 60 20, 110 90 T 210 90 T 310 90 T 410 90 T 440 90"
                stroke="url(#dna-cyan-green)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Bottom Strand */}
              <path
                d="M10 90 Q 60 160, 110 90 T 210 90 T 310 90 T 410 90 T 440 90"
                stroke="url(#dna-blue-cyan)"
                strokeWidth="7"
                strokeLinecap="round"
              />

              {/* Base Pair Rungs */}
              <line x1="60" y1="35" x2="60" y2="145" stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 3" />
              <line x1="110" y1="90" x2="110" y2="90" stroke="#22c55e" strokeWidth="4" />
              <line x1="160" y1="35" x2="160" y2="145" stroke="#22c55e" strokeWidth="3" strokeDasharray="3 3" />
              <line x1="210" y1="90" x2="210" y2="90" stroke="#38bdf8" strokeWidth="4" />
              <line x1="260" y1="35" x2="260" y2="145" stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 3" />
              <line x1="310" y1="90" x2="310" y2="90" stroke="#22c55e" strokeWidth="4" />
              <line x1="360" y1="35" x2="360" y2="145" stroke="#22c55e" strokeWidth="3" strokeDasharray="3 3" />

              {/* Glowing Spherical Nodes */}
              <circle cx="60" cy="35" r="6" fill="#22c55e" filter="drop-shadow(0 0 6px #22c55e)" />
              <circle cx="60" cy="145" r="6" fill="#0284c7" />
              <circle cx="160" cy="35" r="6" fill="#0284c7" />
              <circle cx="160" cy="145" r="6" fill="#22c55e" filter="drop-shadow(0 0 6px #22c55e)" />
              <circle cx="260" cy="35" r="6" fill="#22c55e" />
              <circle cx="260" cy="145" r="6" fill="#0284c7" />
              <circle cx="360" cy="35" r="6" fill="#0284c7" />
              <circle cx="360" cy="145" r="6" fill="#22c55e" />

              <defs>
                <linearGradient id="dna-cyan-green" x1="0" y1="0" x2="450" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22c55e" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="dna-blue-cyan" x1="0" y1="0" x2="450" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0284c7" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Bottom Action Strip */}
          <div className="flex items-center justify-between pt-2 relative z-10">
            {/* Pill tag matching "DNA Reports: 5.5K" */}
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs text-xs font-bold text-slate-800">
              <span>Lab Reports: <strong>12.4K+</strong></span>
              <div className="w-5 h-5 rounded-full bg-[#0b192c] text-white flex items-center justify-center text-[10px]">
                🩺
              </div>
            </div>

            {/* Pill button matching "Get Started ↗" with green circular button */}
            <button
              onClick={onOpenUpload}
              className="group flex items-center gap-2.5 bg-white hover:bg-slate-50 text-[#0b192c] pl-4 pr-1.5 py-1.5 rounded-full border border-slate-200 shadow-sm text-xs font-bold transition-all active:scale-95"
            >
              <span>Get Started</span>
              <div className="w-7 h-7 rounded-full bg-[#22c55e] text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Stacked Cards Column */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          
          {/* Top Card: "Trusted & Secure Testing" with smiling Doctor */}
          <div 
            onClick={onExploreDemo}
            className="bg-white rounded-[32px] p-5 shadow-sm border border-slate-100 flex items-center justify-between gap-4 cursor-pointer hover:shadow-md transition-shadow group flex-1"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] bg-[#eef6ff] px-2.5 py-0.5 rounded-full">
                Security
              </span>
              <h3 className="text-base font-extrabold text-[#0b192c] group-hover:text-[#0284c7] transition-colors leading-tight">
                Trusted & Secure <br /> Explanations
              </h3>
              <p className="text-[11px] text-slate-400">
                100% private. Safe local processing.
              </p>
            </div>

            {/* Doctor Avatar */}
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xs border-2 border-white flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1594824813576-92c2ac379e43?auto=format&fit=crop&w=300&q=80"
                alt="Doctor Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Navy Card: "99.9% Accuracy" */}
          <div className="bg-gradient-to-br from-[#132847] to-[#0b192c] rounded-[32px] p-6 text-white shadow-md flex items-center justify-between relative overflow-hidden flex-1">
            <div className="space-y-1 z-10 text-left">
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                99.9%
              </p>
              <p className="text-xs font-bold text-[#38bdf8]">
                Extraction Precision
              </p>
              <p className="text-[11px] text-slate-300">
                Clinical Reference Alignment
              </p>
            </div>

            {/* Mini 3D glowing DNA helix graphic */}
            <div className="w-16 h-20 flex items-center justify-center opacity-85 z-10">
              <Dna className="w-14 h-14 text-[#38bdf8] animate-pulse" />
            </div>

            {/* Background Glow */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#0284c7]/20 rounded-full blur-xl pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
