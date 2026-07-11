export const metadata = {
  title: 'About - G11.5 Agency',
};

export default function AboutPage() {
  return (
    <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-16 text-gray-300 w-full">
      {/* Classification Tag */}
      <div className="mb-4 text-[10px] sm:text-xs font-mono uppercase tracking-[2px] sm:tracking-[3px] text-[#d4af37]/70">
        CLASSIFICATION: PUBLIC BRIEFING — LEVEL 0 CLEARANCE
      </div>

      {/* Main Title */}
      <h1 
        className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#d4af37] tracking-[2px] sm:tracking-[3px] uppercase mb-8 gold-text-glow border-b border-[#d4af37]/25 pb-4"
        style={{ fontFamily: 'Cinzel, serif' }}
      >
        ABOUT G11.5 AGENCY
      </h1>

      {/* Subtext */}
      <p className="text-lg text-white leading-relaxed italic font-serif mb-8 border-l-2 border-[#d4af37] pl-4">
        "Founded in the quiet space between what science can explain and what people experience anyway, G11.5 Agency exists to investigate the paranormal with the same rigor any other field of inquiry deserves — no more credulous than necessary, no more dismissive than honest."
      </p>

      {/* Sections */}
      <section className="mb-8">
        <h2 
          className="text-xl font-serif text-[#d4af37] tracking-[2px] uppercase mb-3 border-b border-[#d4af37]/15 pb-1"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          OUR MANDATE
        </h2>
        <p className="leading-relaxed text-sm">
          We investigate cases of unexplained phenomena: hauntings, cryptid encounters, demonic activity, and anomalies that fall outside conventional classification. Every case begins with skepticism. Every conclusion is earned through evidence, not assumption. We are neither believers looking for confirmation nor debunkers looking for an easy dismissal — we are investigators, and the truth is the only outcome we're loyal to.
        </p>
      </section>

      <section className="mb-8">
        <h2 
          className="text-xl font-serif text-[#d4af37] tracking-[2px] uppercase mb-3 border-b border-[#d4af37]/15 pb-1"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          WHAT WE DO
        </h2>
        <p className="leading-relaxed text-sm mb-4">
          Our operatives combine field investigation, forensic documentation, and specialized esoteric expertise to assess reported anomalies. Cases are triaged by threat level, staffed according to the nature of the encounter, and closed only when we have an answer — solved or unsolved, but never abandoned without record.
        </p>
        <p className="leading-relaxed text-sm font-semibold mb-2 font-serif" style={{ fontFamily: 'Cinzel, serif' }}>Our work spans:</p>
        <ul className="list-none space-y-2 text-sm pl-2">
          <li className="flex items-start">
            <span className="text-[#d4af37] mr-2">—</span>
            <span>On-site investigation of reported paranormal activity</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#d4af37] mr-2">—</span>
            <span>Cataloging and classification of encountered entities</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#d4af37] mr-2">—</span>
            <span>Equipment research and field-testing for anomaly detection</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#d4af37] mr-2">—</span>
            <span>Case management from initial report through resolution</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#d4af37] mr-2">—</span>
            <span>Training and fielding specialists across technical, esoteric, and investigative disciplines</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 
          className="text-xl font-serif text-[#d4af37] tracking-[2px] uppercase mb-3 border-b border-[#d4af37]/15 pb-1"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          OUR PRINCIPLES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border border-[#d4af37]/15 bg-[#0a0a0a]/50 rounded">
            <h3 className="font-serif text-[#d4af37] font-semibold mb-1" style={{ fontFamily: 'Cinzel, serif' }}>RIGOR</h3>
            <p>We rule out the mundane before entertaining the extraordinary.</p>
          </div>
          <div className="p-4 border border-[#d4af37]/15 bg-[#0a0a0a]/50 rounded">
            <h3 className="font-serif text-[#d4af37] font-semibold mb-1" style={{ fontFamily: 'Cinzel, serif' }}>DISCRETION</h3>
            <p>Clients and witnesses are protected; cases are handled with the sensitivity they deserve.</p>
          </div>
          <div className="p-4 border border-[#d4af37]/15 bg-[#0a0a0a]/50 rounded">
            <h3 className="font-serif text-[#d4af37] font-semibold mb-1" style={{ fontFamily: 'Cinzel, serif' }}>RECORD</h3>
            <p>Every case, solved or not, is documented for the archive. Nothing is forgotten. Nothing is buried.</p>
          </div>
          <div className="p-4 border border-[#d4af37]/15 bg-[#0a0a0a]/50 rounded">
            <h3 className="font-serif text-[#d4af37] font-semibold mb-1" style={{ fontFamily: 'Cinzel, serif' }}>RESOLVE</h3>
            <p>Some cases take a decade. We do not close files out of convenience.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 
          className="text-xl font-serif text-[#d4af37] tracking-[2px] uppercase mb-3 border-b border-[#d4af37]/15 pb-1"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          THE ARCHIVE
        </h2>
        <p className="leading-relaxed text-sm mb-4">
          Beyond active investigation, G11.5 maintains an internal archive of entities, cases, and field intelligence — a resource built case by case, year by year, meant to outlast any single investigator's tenure.
        </p>
        <p className="leading-relaxed text-sm">
          If you believe you've encountered something that resists explanation, we want to hear about it.{' '}
          <a href="/report-case" className="text-[#d4af37] underline hover:text-white transition-colors">
            Report a case
          </a>
          , and we'll take it from there.
        </p>
      </section>
    </main>
  );
}

