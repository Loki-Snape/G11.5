import prisma from '@/app/lib/prisma';
import NavBar from '@/app/components/NavBar';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';


export const metadata = {
  title: 'Team - G11.5 Agency',
};

// Desired tier order and display name mapping
const TIER_ORDER = ['Founder', 'Core Member', 'Support Staff', 'One Case Blunder'];
const TIER_LABELS: Record<string, string> = {
  'Founder': 'Founder',
  'Core Member': 'Core Member',
  'Support Staff': 'Support Staff',
  'One Case Blunder': 'One Case Blunder',
};

export function getPortraitSrc(portraitUrl: string | null | undefined): string {
  if (!portraitUrl) return '/placeholder.png';
  try {
    const filePath = path.join(process.cwd(), 'public', portraitUrl);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      return `${portraitUrl}?v=${stats.mtimeMs}`;
    }
  } catch (e) {
    // fallback
  }
  return portraitUrl;
}



async function fetchMembers() {
  // Fetch all members; we'll sort manually according to TIER_ORDER
  return await prisma.members.findMany();
}

export default async function TeamPage() {
  const members = await fetchMembers();
  // Ensure all tiers are present for rendering (including empty Support Staff)
  const tiers = TIER_ORDER;
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <NavBar />
      <main className="px-4 py-8 sm:p-8 max-w-5xl mx-auto w-full flex-grow">
        <h1 className="text-3xl sm:text-4xl font-serif text-[#d4af37] mb-6 pt-20 md:pt-0">Team</h1>
        {tiers.map((tier) => {
          const membersInTier = members.filter((m) => m.tier === tier);
          return (
            <section key={tier} className="mb-8">
              <h2 className="text-xl sm:text-2xl font-serif text-[#d4af37] mb-4">
                {TIER_LABELS[tier] ?? tier}
              </h2>
              {membersInTier.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {membersInTier.map((member) => (
                    <a
                      key={member.id}
                      href={`/team/${member.slug}`}
                      className="border border-[#d4af37]/30 p-4 rounded hover:bg-gray-900 flex flex-col items-center"
                    >
                      <Image
                        src={getPortraitSrc(member.portraitUrl)}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="rounded mb-2"
                        unoptimized
                      />
                      <h3 className="font-playfair text-lg text-[#d4af37] mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-300">{member.role}</p>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  NO ACTIVE MEMBERS IN THIS SECTION
                </p>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}
