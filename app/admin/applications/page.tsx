import prisma from '@/app/lib/prisma';
import ApplicationsList from './ApplicationsList';

export const dynamic = 'force-dynamic';

export default async function AdminApplicationsPage() {
  // Fetch only pending applications awaiting review
  const pendingApps = await prisma.applications.findMany({
    where: {
      status: {
        in: ['Review Pending', 'PENDING'],
      },
    },
    orderBy: {
      submitted_at: 'desc',
    },
  });

  return (
    <div className="flex flex-col space-y-6 animate-fade-in">
      <div className="border-b border-[#d4af37]/20 pb-4">
        <p className="text-xs uppercase tracking-[2px] text-[#d4af37]/80 font-mono mb-1">
          Enlistment Log Queue
        </p>
        <h1 className="text-3xl font-serif text-[#d4af37] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
          Application Queue
        </h1>
      </div>

      <ApplicationsList initialApplications={pendingApps} />
    </div>
  );
}
