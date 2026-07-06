import prisma from '@/app/lib/prisma';
import NavBar from '@/app/components/NavBar';

export const metadata = {
  title: 'Inventory - G11.5 Agency',
};

const getStatusBadge = (status: string) => {
  const normalized = status.trim().toLowerCase();
  if (normalized === 'at hq') {
    return (
      <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
        {status}
      </span>
    );
  }
  if (normalized === 'under calibration') {
    return (
      <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
        {status}
      </span>
    );
  }
  if (normalized === 'deployed') {
    return (
      <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-500/15 text-gray-400 border border-gray-500/30">
      {status}
    </span>
  );
};

export default async function InventoryPage() {
  const equipmentList = await prisma.equipment.findMany();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <NavBar />
      <main className="flex-1 p-8 pt-28 max-w-4xl mx-auto w-full flex flex-col">
        <h1 className="text-4xl font-serif text-[#d4af37] mb-2 tracking-wide text-center" style={{ fontFamily: 'Cinzel, serif' }}>
          Equipment Inventory
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-md mx-auto text-sm leading-relaxed">
          Manifest of tactical gear, diagnostics sensors, and supernatural conduits currently cataloged in the agency registry.
        </p>

        {equipmentList.length > 0 ? (
          <div className="border border-[#d4af37]/20 rounded-lg overflow-hidden bg-black/30 shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#d4af37]/20 bg-black/60">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#d4af37] font-serif" style={{ fontFamily: 'Cinzel, serif' }}>
                    Gear Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#d4af37] font-serif" style={{ fontFamily: 'Cinzel, serif' }}>
                    Classification
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#d4af37] font-serif" style={{ fontFamily: 'Cinzel, serif' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {equipmentList.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800/50 hover:bg-gray-900/20 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      {item.gear_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {item.classification === 'Experimental' ? (
                        <span className="flex items-center gap-2 text-[#d4af37]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                          {item.classification}
                        </span>
                      ) : (
                        item.classification
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(item.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-[#d4af37]/20 rounded-lg">
            <p className="text-gray-400 italic text-sm">NO CATALOGED EQUIPMENT FOUND</p>
          </div>
        )}
      </main>
    </div>
  );
}
