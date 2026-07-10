import prisma from '@/app/lib/prisma';
import HomeClient from './components/HomeClient';
import { authenticParanormalHeadlines } from './lib/paranormalHeadlines';

export const dynamic = 'force-dynamic'; // Ensure server side data fetching

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default async function HomePage() {
  const caseCount = await prisma.cases.count();
  const equipmentCount = await prisma.equipment.count();
  const memberCount = await prisma.members.count();
  const entityCount = await prisma.entities.count();

  // Fetch all entities from the database
  const dbEntities = await prisma.entities.findMany({
    select: {
      entity_name: true,
      tier: true,
    },
  });

  // Format database entities
  const entityItems = dbEntities.map(
    (e) => `[NEW ENTITY DETECTED: ${e.entity_name.toUpperCase()} // CLASS: TIER ${e.tier.toUpperCase()}]`
  );

  // Sample 25 flavor headlines randomly and format them
  const sampledHeadlines = shuffle(authenticParanormalHeadlines)
    .slice(0, 25)
    .map((headline) => `[INTEL: ${headline.toUpperCase()}]`);

  // Combine and randomize order using Fisher-Yates shuffle
  const tickerItems = shuffle([...entityItems, ...sampledHeadlines]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <HomeClient
        caseCount={caseCount}
        equipmentCount={equipmentCount}
        memberCount={memberCount}
        entityCount={entityCount}
        tickerItems={tickerItems}
      />
    </div>
  );
}