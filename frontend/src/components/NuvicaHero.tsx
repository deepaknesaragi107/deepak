import { ArrowUpRight, Award, ShieldCheck, Stethoscope, Activity } from 'lucide-react';

interface HeroProps {
  onOpenUpload: () => void;
  onExploreSamples: () => void;
}

export default function NuvicaHero({ onOpenUpload, onExploreSamples }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pb-16">
      {/* Background Subtle Large Watermark Typography "NUVICA" / "REPORTSAATHI" */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center select-none pointer-events-none opacity-[0.06] text-slate-900 font-black tracking-widest text-[90px] sm:text-[140px] lg:text-[180px] leading-none whitespace-nowrap z-0">
        REPORTSAATHI
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-4 space-y-5 text-left">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200/80 text-[11px] font-bold text-[#0284c7] shadow-2xs">
              <Activity className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>AI Lab Report Explainer</span>
            </div>

            {/* Typography matching "QUICK 🩺 SMART MEDIC" */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0b192c] tracking-tight leading-[1.05]">
                QUICK <br />
                <span className="inline-flex items-center gap-2">
                  <span className="p-1.5 sm:p-2 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                    <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-[#0284c7]" />
                  </span>
                  <span className="text-[#0284c7]">SMART</span>
                </span> <br />
                REPORTS
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-sm">
              ReportSaathi is your destination for patient-first laboratory translations, compassionate doctor questions, and precise biomarker education all under one roof.
            </p>

            {/* Action CTA Button */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenUpload}
                className="group flex items-center gap-3 bg-[#0b192c] hover:bg-[#132847] text-white pl-5 pr-2 py-2 rounded-full shadow-md text-xs font-bold transition-all active:scale-95"
              >
                <span>Explore More</span>
                <div className="w-7 h-7 rounded-full bg-white text-[#0b192c] flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>

              <button
                onClick={onExploreSamples}
                className="text-xs font-bold text-[#0b192c] hover:text-[#0284c7] underline underline-offset-4 transition-colors"
              >
                Try Sample Panels
              </button>
            </div>
          </div>

          {/* Center Column: Arched Doctor Portrait with Floating Badges */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            {/* The Arched Container */}
            <div className="relative w-64 sm:w-72 h-84 sm:h-96 rounded-t-full rounded-b-3xl bg-gradient-to-b from-white/90 via-white/50 to-[#dceeff]/30 p-2 border-2 border-white/80 shadow-xl overflow-hidden flex items-end justify-center">
              {/* Doctor Cutout Image */}
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
                alt="Doctor Portrait"
                className="w-full h-full object-cover object-top rounded-t-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#cde4fd]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Top Right Floating Badge: "490 AWARDS" */}
            <div className="absolute top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-2.5 text-center shadow-lg animate-float">
              <div className="w-7 h-7 mx-auto rounded-full bg-[#eef6ff] flex items-center justify-center text-[#0284c7] mb-1">
                <Award className="w-4 h-4" />
              </div>
              <p className="text-sm font-black text-[#0b192c]">50+</p>
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Biomarkers</p>
            </div>

            {/* Bottom Floating Card: "22 Years Medical Excellence" */}
            <div className="absolute -bottom-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#0b192c] text-white flex items-center justify-center text-xs font-bold">
                +
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-[#0b192c] leading-tight">Patient-First</p>
                <p className="text-[10px] text-slate-500 font-medium">Plain-Language Literacy</p>
              </div>
            </div>
          </div>

          {/* Right Column: Glowing 3D Anatomical Organ Visualization */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative pt-6 lg:pt-0">
            {/* Top Designer Tag Pill matching "@hamida_jannat" */}
            <div className="self-end mb-4 hidden sm:flex items-center gap-2 bg-white/90 border border-slate-200/80 rounded-full pl-1.5 pr-3 py-1 shadow-2xs text-[11px] font-bold text-slate-700">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#22c55e] text-white flex items-center justify-center text-[10px]">
                🩺
              </div>
              <span>ReportSaathi AI Engine</span>
            </div>

            {/* Glowing 3D Lungs Illustration Graphic */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#0284c7]/15 rounded-full blur-2xl animate-pulse pointer-events-none" />

              {/* High-tech Stylized 3D Organ SVG (Lungs with vein branches) */}
              <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Central Trachea */}
                <path d="M120 20 L120 90 M110 35 L130 35 M112 50 L128 50 M114 65 L126 65" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
                
                {/* Left Bronchial Tree & Lung Lobe */}
                <path d="M120 90 Q100 110 75 125" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M75 125 Q50 145 45 180 Q65 210 95 190 Q115 170 110 120 Z" fill="url(#left-lung-grad)" opacity="0.65" stroke="#0284c7" strokeWidth="2" />
                <path d="M75 125 Q60 150 70 175 M60 145 Q48 160 55 170 M85 135 Q95 160 85 180" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />

                {/* Right Bronchial Tree & Lung Lobe */}
                <path d="M120 90 Q140 110 165 125" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M165 125 Q190 145 195 180 Q175 210 145 190 Q125 170 130 120 Z" fill="url(#right-lung-grad)" opacity="0.65" stroke="#0284c7" strokeWidth="2" />
                <path d="M165 125 Q180 150 170 175 M180 145 Q192 160 185 170 M155 135 Q145 160 155 180" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />

                {/* Glowing Nodes & Alveoli */}
                <circle cx="55" cy="170" r="3.5" fill="#22c55e" filter="drop-shadow(0 0 4px #22c55e)" />
                <circle cx="95" cy="180" r="3" fill="#38bdf8" />
                <circle cx="185" cy="170" r="3.5" fill="#22c55e" filter="drop-shadow(0 0 4px #22c55e)" />
                <circle cx="145" cy="180" r="3" fill="#38bdf8" />

                <defs>
                  <linearGradient id="left-lung-grad" x1="45" y1="120" x2="115" y2="210" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0284c7" />
                    <stop offset="0.7" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#22c55e" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="right-lung-grad" x1="125" y1="120" x2="195" y2="210" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0284c7" />
                    <stop offset="0.7" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#22c55e" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Pill Tag matching "6700 Healed Lungs" */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl px-3 py-1.5 shadow-lg flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <div className="text-left">
                  <p className="text-xs font-black text-[#0b192c]">100%</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Non-Diagnostic</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
