export default function NuvicaStatsBar() {
  const stats = [
    { value: '50+', label: 'Biomarkers Decoded' },
    { value: '10k+', label: 'Reports Translated' },
    { value: '100%', label: 'Non-Diagnostic Safe' },
    { value: '6th-Grade', label: 'Clear Reading Level' },
  ];

  return (
    <section className="py-8 border-y border-slate-100 bg-white/70 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight">
                {s.value}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

