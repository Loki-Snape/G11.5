import prisma from '@/app/lib/prisma';
import NavBar from './components/NavBar';
import StatusBadge from './components/StatusBadge';

export const dynamic = 'force-dynamic'; // Ensure server side data fetching

export default async function HomePage() {
  const caseCount = await prisma.cases.count();
  const equipmentCount = await prisma.equipment.count();
  const memberCount = await prisma.members.count();
  const entityCount = await prisma.entities.count(); // entities model stores entities

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <NavBar />
      <main className="p-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-[#d4af37] mb-6">G11.5 Agency Portal</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded">
            <h2 className="text-lg font-medium text-[#d4af37]">Cases</h2>
            <p className="text-2xl mt-2">{caseCount}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <h2 className="text-lg font-medium text-[#d4af37]">Equipment</h2>
            <p className="text-2xl mt-2">{equipmentCount}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <h2 className="text-lg font-medium text-[#d4af37]">Personnel</h2>
            <p className="text-2xl mt-2">{memberCount}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <h2 className="text-lg font-medium text-[#d4af37]">Entities</h2>
            <p className="text-2xl mt-2">{entityCount}</p>
          </div>
        </div>
        <section className="mt-8">
          <h2 className="text-2xl font-serif text-[#d4af37] mb-4">System Status</h2>
          <StatusBadge status="online" />
        </section>
      </main>
    </div>
  );
}