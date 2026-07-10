import prisma from '@/app/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Fetch real-time counts from DB
  const [
    casesInReview,
    activeCases,
    totalGear,
    deployedGear,
    totalMembers,
    totalEntities,
    pendingApplications
  ] = await Promise.all([
    prisma.cases.count({ where: { status: 'Review Pending' } }),
    prisma.cases.count({ where: { status: 'Active' } }),
    prisma.equipment.count(),
    prisma.equipment.count({ where: { status: 'Deployed' } }),
    prisma.members.count(),
    prisma.entities.count(),
    prisma.applications.count({ where: { status: { in: ['Review Pending', 'PENDING'] } } })
  ]);

  const modules = [
    {
      title: 'Case Command',
      href: '/admin/cases',
      description: 'Approve incoming reports, track investigation lifecycles, and archive resolved cases.',
      stats: `${casesInReview} Awaiting Review · ${activeCases} Active`,
      highlight: casesInReview > 0
    },
    {
      title: 'Equipment Manager',
      href: '/admin/equipment',
      description: 'Track and log containment gear status. Update HQ storage, deployment, and calibration states.',
      stats: `${totalGear} Gear Items (${deployedGear} Deployed)`,
      highlight: false
    },
    {
      title: 'Personnel Manager',
      href: '/admin/personnel',
      description: 'Manage the roster of G11.5 field agents and support staff. Add new operatives and configure tier rankings.',
      stats: `${totalMembers} Active Staff`,
      highlight: false
    },
    {
      title: 'Monster Registry',
      href: '/admin/entities',
      description: 'Document paranormal entities, their threat rankings, identified strengths/weaknesses, and containment steps.',
      stats: `${totalEntities} Registered Anomalies`,
      highlight: false
    },
    {
      title: 'Application Queue',
      href: '/admin/applications',
      description: 'Review incoming investigator credentials, authorize enlistments, and process new support recruits.',
      stats: `${pendingApplications} Pending Submission(s)`,
      highlight: pendingApplications > 0
    }
  ];

  return (
    <div className="flex flex-col space-y-8 animate-fade-in">
      <div className="border-b border-[#d4af37]/20 pb-4">
        <p className="text-xs uppercase tracking-[2px] text-[#d4af37]/80 font-mono mb-1">
          Secure Command Session Active
        </p>
        <h1 className="text-4xl font-serif text-[#d4af37] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
          Agency Command
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="group border border-[#d4af37]/20 bg-black/40 hover:border-[#d4af37]/60 p-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-56 shadow-lg shadow-black/80 hover:shadow-[#d4af37]/5"
          >
            <div>
              <h2 className="font-serif text-lg tracking-[2px] text-[#d4af37] group-hover:text-[#e5c158] transition-colors mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                {m.title}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {m.description}
              </p>
            </div>
            
            <div className={`text-xs uppercase tracking-widest font-mono font-semibold px-2.5 py-1 rounded border self-start ${
              m.highlight
                ? 'bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.1)]'
                : 'bg-[#d4af37]/5 text-[#d4af37]/80 border-[#d4af37]/20'
            }`}>
              {m.stats}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
