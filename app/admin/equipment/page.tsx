import prisma from '@/app/lib/prisma';
import EquipmentTable from './EquipmentTable';

export const dynamic = 'force-dynamic';

export default async function AdminEquipmentPage() {
  const allEquipment = await prisma.equipment.findMany({
    orderBy: {
      gear_name: 'asc',
    },
  });

  return (
    <div className="flex flex-col space-y-6 animate-fade-in">
      <div className="border-b border-[#d4af37]/20 pb-4">
        <p className="text-xs uppercase tracking-[2px] text-[#d4af37]/80 font-mono mb-1">
          Containment Gear Log
        </p>
        <h1 className="text-3xl font-serif text-[#d4af37] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
          Equipment Manager
        </h1>
      </div>

      <EquipmentTable initialEquipment={allEquipment} />
    </div>
  );
}
