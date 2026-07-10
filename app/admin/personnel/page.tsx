import prisma from '@/app/lib/prisma';
import PersonnelManager from './PersonnelManager';

export const dynamic = 'force-dynamic';

export default async function AdminPersonnelPage() {
  const allMembers = await prisma.members.findMany({
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });

  return (
    <div className="flex flex-col space-y-6 animate-fade-in">
      <div className="border-b border-[#d4af37]/20 pb-4">
        <p className="text-xs uppercase tracking-[2px] text-[#d4af37]/80 font-mono mb-1">
          Personnel Records
        </p>
        <h1 className="text-3xl font-serif text-[#d4af37] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
          Personnel Manager
        </h1>
      </div>

      <PersonnelManager initialMembers={allMembers} />
    </div>
  );
}
