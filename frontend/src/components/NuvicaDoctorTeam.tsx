import { MessageSquare, Phone, Mail } from 'lucide-react';

interface DoctorTeamProps {
  onSelectSpecialist: (specialty: string) => void;
}

export default function NuvicaDoctorTeam({ onSelectSpecialist }: DoctorTeamProps) {
  const doctors = [
    {
      name: 'Dr. Mehdi Hasan',
      role: 'Heart Surgeon & Cardiology',
      panel: 'Lipid & Cardiac Profile',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      highlight: false,
    },
    {
      name: 'Dr. Hamida Jannat',
      role: 'Internal Medicine & Diagnostic Lead',
      panel: 'Complete Blood Count (CBC)',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      highlight: true, // Center highlighted card
    },
    {
      name: 'Dr. Haseeb Hossain',
      role: 'Neurologist & Metabolic Specialist',
      panel: 'Kidney & Metabolic Panel',
      img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      highlight: false,
    },
    {
      name: 'Dr. Jenila Roy',
      role: 'Endocrinologist & Hormones',
      panel: 'Thyroid & Vitamin Panel',
      img: 'https://images.unsplash.com/photo-1594824813576-92c2ac379e43?auto=format&fit=crop&w=400&q=80',
      highlight: false,
    },
  ];

  return (
    <section id="doctor-section" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 text-left space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          {/* Green Tag matching "DOCTORS" */}
          <div className="inline-block px-3 py-1 rounded-full bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-wider shadow-2xs">
            DOCTORS & SPECIALISTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight">
            MEET OUR SPECIALIZED <br /> MEDICAL ADVISORY
          </h2>
        </div>

        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          From General Practitioners To Top Clinical Specialists, Our Clinical Knowledge Base Is Dedicated To Your Health Literacy.
        </p>
      </div>

      {/* 4 Doctor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        {doctors.map((doc, idx) => (
          <div
            key={idx}
            onClick={() => onSelectSpecialist(doc.panel)}
            className={`rounded-[32px] p-5 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
              doc.highlight
                ? 'bg-white shadow-xl border-2 border-[#0284c7]/40 sm:-translate-y-3'
                : 'bg-white/80 hover:bg-white shadow-sm hover:shadow-lg border border-slate-100'
            }`}
          >
            {/* Top Doctor Image with Arched Cutout style */}
            <div className="rounded-2xl overflow-hidden h-52 sm:h-56 bg-slate-100 relative mb-4">
              <img
                src={doc.img}
                alt={doc.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              {doc.highlight && (
                <div className="absolute top-2.5 right-2.5 bg-[#0284c7] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Lead Advisor
                </div>
              )}
            </div>

            {/* Info & Specialty */}
            <div className="space-y-1 text-center">
              <h3 className="text-base font-extrabold text-[#0b192c] group-hover:text-[#0284c7] transition-colors">
                {doc.name}
              </h3>
              <p className="text-[11px] font-semibold text-slate-400">
                {doc.role}
              </p>
              <p className="text-[10px] font-bold text-[#0284c7] bg-[#eef6ff] inline-block px-2.5 py-0.5 rounded-full mt-1">
                Specialty: {doc.panel}
              </p>
            </div>

            {/* Social/Action Icon Pills matching circular icons in image */}
            <div className="flex items-center justify-center gap-2 pt-4 mt-2 border-t border-slate-100">
              <div className="w-7 h-7 rounded-full bg-[#0b192c] text-white flex items-center justify-center hover:bg-[#0284c7] transition-colors">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
