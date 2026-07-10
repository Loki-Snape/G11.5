import prisma from '@/app/lib/prisma';
import EntityManager from './EntityManager';

export const dynamic = 'force-dynamic';

export default async function AdminEntitiesPage() {
  const allEntities = await prisma.entities.findMany({
    orderBy: {
      entity_name: 'asc',
    },
  });

  return (
    <div className="flex flex-col space-y-6 animate-fade-in">
      <div className="border-b border-[#d4af37]/20 pb-4">
        <p className="text-xs uppercase tracking-[2px] text-[#d4af37]/80 font-mono mb-1">
          Catalog Anomalies
        </p>
        <h1 className="text-3xl font-serif text-[#d4af37] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
          Monster Registry
        </h1>
      </div>

      <EntityManager initialEntities={allEntities} />
    </div>
  );
}
