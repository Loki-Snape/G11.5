import prisma from '@/app/lib/prisma';
import NavBar from '@/app/components/NavBar';
import Image from 'next/image';
import Link from 'next/link';
import { getPortraitSrc } from '../page';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MemberDossierPage({ params }: PageProps) {
  const { slug } = await params;

  // Query member from database by unique slug
  const member = await prisma.members.findUnique({
    where: { slug }
  });

  // If no member is found, render a custom styled 'not found' page
  if (!member) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
        <NavBar />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-4xl font-serif text-[#d4af37] mb-4 tracking-wide" style={{ fontFamily: 'Cinzel, serif' }}>
            Dossier Not Found
          </h1>
          <p className="text-gray-400 mb-8 max-w-md text-center leading-relaxed">
            The profile you are looking for does not exist in the agency archives or has been classified.
          </p>
          <Link
            href="/team"
            className="border border-[#d4af37]/50 text-[#d4af37] px-6 py-2 rounded hover:bg-[#d4af37]/10 transition-colors text-sm uppercase tracking-wider"
          >
            ← Return to Team
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <NavBar />
      <main className="flex-1 max-w-4xl mx-auto w-full p-8 pt-28">
        <div className="border border-[#d4af37]/30 bg-black/40 p-6 md:p-10 rounded-lg flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Member Photo */}
          <div className="flex-shrink-0">
            <Image
              src={getPortraitSrc(member.portraitUrl)}
              alt={member.name}
              width={250}
              height={250}
              className="rounded-lg border border-[#d4af37]/20 object-cover"
              unoptimized
            />
          </div>

          {/* Member Details */}
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-[#d4af37]/70 mb-1">
              Clearance Level: {member.clearance_level}
            </p>
            <h1 className="font-playfair text-3xl md:text-4xl text-[#d4af37] mb-2 tracking-wide">
              {member.name}
            </h1>
            <p className="text-base text-gray-300 italic mb-6">
              {member.role} ({member.tier})
            </p>

            {/* Bio Section */}
            <div className="mb-6">
              <h2 className="text-lg font-serif text-[#d4af37] mb-2 border-b border-[#d4af37]/20 pb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                Biography
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {member.bio || "No biography details recorded."}
              </p>
            </div>

            {/* History Section */}
            <div className="mb-6">
              <h2 className="text-lg font-serif text-[#d4af37] mb-2 border-b border-[#d4af37]/20 pb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                Agency History & Background
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {member.background || "No background details recorded."}
              </p>
            </div>

            {/* Back link */}
            <Link
              href="/team"
              className="text-[#d4af37] hover:underline inline-flex items-center gap-2 mt-4 text-sm"
            >
              ← Back to Team
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
