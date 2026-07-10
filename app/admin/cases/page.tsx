import prisma from '@/app/lib/prisma';
import CasesTable from './CasesTable';

export const dynamic = 'force-dynamic';

export default async function AdminCasesPage() {
  const allCases = await prisma.cases.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });

  return (
    <div className="flex flex-col space-y-6 animate-fade-in">
      <div className="border-b border-[#d4af37]/20 pb-4">
        <p className="text-xs uppercase tracking-[2px] text-[#d4af37]/80 font-mono mb-1">
          Case Log Operations
        </p>
        <h1 className="text-3xl font-serif text-[#d4af37] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
          Case Command
        </h1>
      </div>

      <CasesTable initialCases={allCases} />
    </div>
  );
}
