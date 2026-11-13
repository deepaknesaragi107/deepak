import { 
  Heart, 
  Brain, 
  Bone, 
  Activity, 
  Baby, 
  Shield, 
  Droplet, 
  Scan 
} from 'lucide-react';

interface DepartmentsGridProps {
  onSelectDepartment: (deptName: string) => void;
}

export default function NuvicaDepartmentsGrid({ onSelectDepartment }: DepartmentsGridProps) {
  const departments = [
    {
      num: '01',
      name: 'Cardiology',
      desc: 'Comprehensive lipid panels including total cholesterol, LDL, HDL, triglycerides and cardiac risk ratios.',
      icon: Heart,
    },
    {
      num: '02',
      name: 'Neurology',
      desc: 'Cognitive baseline tests, electrolyte balances, B12 neuro-vitamins and neurological inflammation panels.',
      icon: Brain,
    },
    {
      num: '03',
      name: 'Orthopedics',
      desc: 'Bone and joint health: serum calcium, phosphorus, Vitamin D3 (25-OH) and bone turnover markers.',
      icon: Bone,
    },
    {
      num: '04',
      name: 'Gastroenterology',
      desc: 'Liver function tests (ALT, AST, Bilirubin, Albumin), pancreatic enzymes and gut absorption markers.',
      icon: Activity,
    },
    {
      num: '05',
      name: 'Pediatrics',
      desc: 'Child developmental lab panels, pediatric blood counts, iron deficiency screening and immunity titers.',
      icon: Baby,
    },
    {
      num: '06',
      name: 'Gynecology & Obstetrics',
      desc: 'Hormonal fertility profiles, prenatal blood screens, beta-hCG, thyroid regulation and iron reserves.',
      icon: Shield,
    },
    {
      num: '07',
      name: 'Urology & Nephrology',
      desc: 'Kidney function evaluation: serum creatinine, blood urea nitrogen (BUN), eGFR and urinalysis metrics.',
      icon: Droplet,
    },
    {
      num: '08',
      name: 'Hematology & Radiology',
      desc: 'Complete Blood Count (CBC), hemoglobin, platelet coagulation times and cellular diagnostic indexes.',
      icon: Scan,
    },
  ];

  return (
    <section id="departments-section" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 text-left space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          {/* Green Tag matching "DEPARTMENTS" */}
          <div className="inline-block px-3 py-1 rounded-full bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-wider shadow-2xs">
            SPECIALIZED PANELS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight">
            EXPLORE OUR MEDICAL <br /> TEST DEPARTMENTS
          </h2>
        </div>

        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          ReportSaathi Offers A Full Range Of Specialized Laboratory Explanations Across Medical Disciplines.
        </p>
      </div>

      {/* 8 Department Cards Grid (2 rows of 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {departments.map((dept, idx) => {
          const Icon = dept.icon;

          return (
            <div
              key={idx}
              onClick={() => onSelectDepartment(dept.name)}
              className="bg-white rounded-[28px] p-5 shadow-xs hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col justify-between h-44 cursor-pointer group hover:border-[#0284c7]/40"
            >
              {/* Top row with 01 and circular icon */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-[#0284c7] transition-colors">
                  {dept.num}
                </span>

                <div className="w-8 h-8 rounded-full bg-[#eef6ff] text-[#0284c7] flex items-center justify-center group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-[#0b192c] group-hover:text-[#0284c7] transition-colors">
                  {dept.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {dept.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

