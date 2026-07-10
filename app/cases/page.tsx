import prisma from '@/app/lib/prisma';
import NavBar from '@/app/components/NavBar';

export const metadata = {
  title: 'Cases - G11.5 Agency',
};

// Define a type for the case record to satisfy Vercel's strict TypeScript compiler
type CaseRecord = {
  id: string | number;
  status?: string | null;
  description?: string | null;
  tracking_number?: string | null;
  threat_rating?: string | null;
  location?: string | null;
  start_date?: Date | string | null;
  end_date?: Date | string | null;
  created_by?: string | null;
  created_at?: Date | string | null;
  case_file_link?: string | null;
  [key: string]: any; // Catch-all for any other Prisma fields
};

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getThreatBadgeColor = (rating: string | null | undefined) => {
  const norm = (rating ?? '').toLowerCase();
  if (norm === 'critical' || norm === 'high') {
    return 'bg-rose-500/15 text-rose-400 border border-rose-500/30';
  }
  if (norm === 'medium') {
    return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
  }
  return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
};

export default async function CasesPage() {
  const allCases = await prisma.cases.findMany();

  // Define target sections for grouping
  const sections = [
    { key: 'Active', title: 'Active Cases', queryKey: 'Active' },
    { key: 'Solved', title: 'Closed Cases (Solved)', queryKey: 'Solved' },
    { key: 'Unsolved', title: 'Closed Cases (Unsolved)', queryKey: 'Unsolved' },
    { key: 'Review Pending', title: 'Review Pending', queryKey: 'Review Pending' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <NavBar />
      <main className="flex-1 p-8 pt-28 max-w-5xl mx-auto w-full flex flex-col">
        <h1 className="text-4xl font-serif text-[#d4af37] mb-2 tracking-wide text-center" style={{ fontFamily: 'Cinzel, serif' }}>
          Case Files Archive
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-md mx-auto text-sm leading-relaxed">
          Central intelligence repository for active investigations, resolved scenarios, and cases awaiting supervisor review.
        </p>

        {sections.map((section) => {
          // Explicitly type 'c' using the CaseRecord interface
          const casesInSec = allCases.filter((c: CaseRecord) => c.status === section.queryKey);

          return (
            <section key={section.key} className="mb-12">
              <h2 className="text-2xl font-serif text-[#d4af37] mb-4 pb-1 border-b border-[#d4af37]/20" style={{ fontFamily: 'Cinzel, serif' }}>
                {section.title}
              </h2>

              {casesInSec.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {casesInSec.map((c: CaseRecord) => {
                    const desc = c.description ?? '';
                    const truncatedDesc = desc.length > 150 ? desc.substring(0, 150) + '...' : desc;

                    return (
                      <div
                        key={c.id}
                        className="border border-[#d4af37]/20 bg-black/40 p-6 rounded-lg flex flex-col justify-between hover:border-[#d4af37]/50 transition-colors"
                      >
                        <div>
                          {/* Top Meta Info */}
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <span className="text-xs font-mono uppercase tracking-wider text-[#d4af37]/80">
                              {c.tracking_number}
                            </span>
                            {c.threat_rating && (
                              <span className={`text-[10px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded ${getThreatBadgeColor(c.threat_rating)}`}>
                                {c.threat_rating} Threat
                              </span>
                            )}
                          </div>

                          {/* Location & Dates */}
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-4">
                            {c.location && (
                              <span>
                                <span className="font-semibold text-gray-500">Location:</span> {c.location}
                              </span>
                            )}
                            <span>
                              <span className="font-semibold text-gray-500">Timeline:</span> {formatDate(c.start_date)} - {c.end_date ? formatDate(c.end_date) : 'Ongoing'}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-300 leading-relaxed mb-6">
                            {truncatedDesc}
                          </p>
                        </div>

                        {/* Footer & Link */}
                        <div className="border-t border-gray-800/60 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="text-[11px] text-gray-500">
                            <div>Filed by: <span className="text-gray-400">{c.created_by || 'Unknown'}</span></div>
                            <div>On: <span className="text-gray-400">{formatDate(c.created_at)}</span></div>
                          </div>
                          {c.case_file_link && (
                            <a
                              href={c.case_file_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs uppercase tracking-wider font-semibold border border-[#d4af37]/40 text-[#d4af37] px-4 py-1.5 rounded hover:bg-[#d4af37]/10 transition-colors"
                            >
                              View Case File
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  NO CASES IN THIS SECTION
                </p>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}