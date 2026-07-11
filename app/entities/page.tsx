import prisma from '@/app/lib/prisma';
import NavBar from '@/app/components/NavBar';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Entities - G11.5 Agency',
};

function getEntityPortraitSrc(imageUrl: string | null | undefined): string {
  if (!imageUrl) return '/placeholder.png';
  try {
    const filePath = path.join(process.cwd(), 'public', imageUrl);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      return `${imageUrl}?v=${stats.mtimeMs}`;
    }
  } catch {
    // fallback
  }
  return imageUrl;
}

export default async function EntitiesPage() {
  const entities = await prisma.entities.findMany();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <NavBar />
      <main className="flex-1 px-4 py-8 sm:p-8 pt-24 sm:pt-28 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-serif text-[#d4af37] mb-2 tracking-wide text-center" style={{ fontFamily: 'Cinzel, serif' }}>
          Threat Database
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto text-sm leading-relaxed">
          Classified logs of identified supernatural entities, manifestations, and anomalies that G11.5 has encountered till now.
        </p>

        {entities.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {entities.map((entity) => {
              // High danger check: if it contains Class V or similar high threat indicators
              const isHighDanger = entity.tier.toLowerCase().includes('class v') ||
                entity.tier.toLowerCase().includes('danger') ||
                entity.tier.toLowerCase().includes('critical');

              return (
                <div
                  key={entity.id}
                  className={`w-full max-w-md bg-black/40 rounded-lg p-6 flex flex-col border transition-all hover:scale-[1.01] ${isHighDanger
                      ? 'border-[#ff3333]/50 shadow-[0_0_15px_rgba(255,51,51,0.1)] hover:border-[#ff3333]/80'
                      : 'border-[#d4af37]/30 hover:border-[#d4af37]/60'
                    }`}
                >
                  {/* Entity Image */}
                  <div className="relative w-full h-56 rounded-md overflow-hidden mb-6 border border-gray-800 bg-black/80 flex items-center justify-center">
                    <Image
                      src={getEntityPortraitSrc(entity.image_url)}
                      alt={entity.entity_name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Header */}
                  <div className="mb-4">
                    <h2
                      className={`font-playfair text-2xl font-semibold tracking-wide mb-1 ${isHighDanger ? 'text-[#ff3333]' : 'text-[#d4af37]'
                        }`}
                    >
                      {entity.entity_name}
                    </h2>
                    <span
                      className={`inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${isHighDanger
                          ? 'bg-[#ff3333]/15 text-[#ff3333] border border-[#ff3333]/30'
                          : 'bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30'
                        }`}
                    >
                      {entity.tier}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-4 text-sm text-gray-300 flex-1">
                    <div>
                      <span className="font-semibold text-gray-400 block mb-0.5">Bio:</span>
                      <p className="leading-relaxed text-gray-300 italic">{entity.brief_bio}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-400 block mb-0.5">Strength:</span>
                      <p className="leading-relaxed">{entity.strength}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-400 block mb-0.5">Weakness:</span>
                      <p className="leading-relaxed">{entity.weakness}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-400 block mb-0.5">Identification:</span>
                      <p className="leading-relaxed">{entity.identification_method}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-[#d4af37]/20 rounded-lg">
            <p className="text-gray-400 italic text-sm">NO ACTIVE ENTITIES IN ARCHIVE</p>
          </div>
        )}
      </main>
    </div>
  );
}
