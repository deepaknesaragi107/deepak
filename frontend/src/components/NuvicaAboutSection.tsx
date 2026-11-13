import { ArrowUpRight, Phone } from 'lucide-react';

interface AboutSectionProps {
  onOpenUpload: () => void;
}

export default function NuvicaAboutSection({ onOpenUpload }: AboutSectionProps) {
  return (
    <section id="about-section" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Hospital Architecture with Floating Badge */}
        <div className="lg:col-span-6 relative">
          {/* Main Hospital Building Image */}
          <div className="rounded-[36px] overflow-hidden shadow-xl border-4 border-white/80 h-72 sm:h-84 relative">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
              alt="Medical Hospital Facility"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c]/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Badge matching "+ NUVICA FROM 28/10/2003 Committed to your health" */}
          <div className="absolute -bottom-6 right-4 sm:right-8 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-5 shadow-2xl max-w-[210px] space-y-2 text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#0b192c] text-white flex items-center justify-center font-bold text-xs">
                +
              </div>
              <span className="text-[11px] font-black text-[#0b192c] tracking-wider uppercase">
                REPORTSAATHI
              </span>
            </div>

            <div className="border-t border-slate-100 pt-2 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                FROM 2026
              </p>
              <p className="text-xs font-semibold text-[#0b192c] leading-snug">
                Committed to your health literacy and well-being.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Mission Content */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Green Tag matching "ABOUT US" in design */}
          <div className="inline-block px-3 py-1 rounded-full bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-wider shadow-2xs">
            ABOUT US
          </div>

          {/* Headline matching "YOUR NUVICA MEDICAL HOSPITAL" */}
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight leading-tight">
            YOUR PERSONAL MEDICAL LAB REPORT COMPANION
          </h2>

          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            We combine clinical reference intervals, innovative patient-first language, and tailored doctor consultation questions to ensure you receive accurate, calm, and educational understanding of your laboratory results.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <button
              onClick={onOpenUpload}
              className="group flex items-center gap-3 bg-[#0b192c] hover:bg-[#132847] text-white pl-5 pr-2 py-2 rounded-full shadow-md text-xs font-bold transition-all active:scale-95"
            >
              <span>Learn More</span>
              <div className="w-7 h-7 rounded-full bg-white text-[#0b192c] flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>

            {/* Helpline / Question Box */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#eef6ff] text-[#0284c7] flex items-center justify-center shadow-2xs">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  For Clinical Advice
                </p>
                <p className="text-xs font-extrabold text-[#0b192c]">
                  Consult Your Physician
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
