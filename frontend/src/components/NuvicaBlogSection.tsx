export interface ArticleItem {
  title: string;
  category: string;
  date: string;
  author: string;
  img: string;
  content: string[];
  takeaways: string[];
}

interface BlogSectionProps {
  onReadArticle: (article: ArticleItem) => void;
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    title: 'Discover How AI-Powered Diagnostics Are Transforming Everyday Lab Assessments.',
    category: 'Medical Technology',
    date: '10 Nov 2026',
    author: 'Dr. Hamida Jannat',
    img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
    content: [
      'Laboratory medicine is experiencing a major renaissance. Traditionally, patients receive a multi-page PDF dense with biochemical symbols and cryptic numbers, often leading to unguided internet searches and heightened anxiety.',
      'Modern AI models like Gemini are uniquely suited to ingest complex laboratory sheets, detect laboratory-specific reference ranges, and translate numbers into clear 6th-grade language without jumping to conclusions or prescribing treatments.',
      'By serving as an educational companion, tools like ReportSaathi empower patients to arrive at their physician consultations with focused, thoughtful questions rather than fear.'
    ],
    takeaways: [
      'AI bridges the communication gap between pathology lab machines and patients.',
      'Translating medical jargon reduces panic and increases patient compliance.',
      'Clinical decisions must always remain in the hands of qualified healthcare professionals.'
    ]
  },
  {
    title: 'Explore The Role Of Precision Health And How Lab Biomarkers Personalize Care.',
    category: 'Biomarkers & DNA',
    date: '04 Nov 2026',
    author: 'Dr. Mehdi Hasan',
    img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
    content: [
      'No two human bodies are identical. A cholesterol or fasting blood glucose level that is slightly elevated in one individual may hold a completely different clinical significance depending on age, lifestyle, family history, and renal function.',
      'Precision health relies on longitudinal tracking—observing how your biomarkers change over time rather than looking at a single snapshot in isolation.',
      'Understanding your baseline markers (such as HbA1c, Vitamin D, and Lipid fractions) provides an empowering roadmap for proactive longevity and preventive wellness.'
    ],
    takeaways: [
      'Biomarkers reflect dynamic bodily systems and should be interpreted in broader context.',
      'Routine annual blood checks establish your personal biological baseline.',
      'Dietary and lifestyle adjustments often resolve mild borderline anomalies.'
    ]
  },
  {
    title: 'See How Clear Patient Literacy Empowers Confident Consultations With Doctors.',
    category: 'Patient Education',
    date: '28 Oct 2026',
    author: 'ReportSaathi Editorial',
    img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    content: [
      'Studies show that up to 60% of what is discussed during a brief doctor appointment is forgotten or misunderstood by patients by the time they walk out the clinic door.',
      'When patients know in advance what terms like "MCV" or "eGFR" mean, they can skip the confusion and dive directly into meaningful dialogue with their physician about treatment goals.',
      'Equipping yourself with a written checklist of questions transforms a passive doctor visit into a collaborative healthcare partnership.'
    ],
    takeaways: [
      'Health literacy directly correlates with better clinical outcomes and adherence.',
      'Writing down 3-4 specific questions ensures all your concerns are addressed.',
      'Clear explanations empower you to be your own strongest health advocate.'
    ]
  },
];

export default function NuvicaBlogSection({ onReadArticle }: BlogSectionProps) {
  return (
    <section id="blog-section" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 text-left space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          {/* Green Tag matching "BLOG" */}
          <div className="inline-block px-3 py-1 rounded-full bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-wider shadow-2xs">
            HEALTH LITERACY & NEWS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight">
            LATEST FROM MEDICAL <br /> FRONTLINES
          </h2>
        </div>

        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          Explore Our Latest Patient Education Guides On Medical Breakthroughs, Smart Technologies, And Patient-First Care.
        </p>
      </div>

      {/* 3 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES_DATA.map((art, idx) => (
          <div
            key={idx}
            onClick={() => onReadArticle(art)}
            className="bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between cursor-pointer group space-y-4"
          >
            {/* Image */}
            <div className="rounded-2xl overflow-hidden h-44 bg-slate-100 relative">
              <img
                src={art.img}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 bg-[#0b192c]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {art.category}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2 px-1">
              <span className="text-[10px] font-semibold text-slate-400">
                {art.date}
              </span>
              <h3 className="text-sm font-extrabold text-[#0b192c] group-hover:text-[#0284c7] transition-colors leading-snug">
                {art.title}
              </h3>
            </div>

            {/* Author Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 px-1 text-xs text-slate-500 font-medium">
              <div className="w-5 h-5 rounded-full bg-[#eef6ff] text-[#0284c7] flex items-center justify-center text-[10px] font-bold">
                🩺
              </div>
              <span className="text-[11px] font-bold text-slate-600">{art.author}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
