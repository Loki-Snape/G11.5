"use client";

import React, { useState, useEffect } from 'react';
import TiltContainer from '@/app/components/TiltContainer';
import StatusBadge from '@/app/components/StatusBadge';

interface HomeClientProps {
  caseCount: number;
  equipmentCount: number;
  memberCount: number;
  entityCount: number;
  tickerItems: string[];
}

function CountUp({ end, duration = 1000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>;
}

export default function HomeClient({
  caseCount,
  equipmentCount,
  memberCount,
  entityCount,
  tickerItems,
}: HomeClientProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax opacity and vertical translation
  const opacity = Math.max(0, 1 - scrollY / 350);
  const translateY = scrollY * 0.35;

  // Build intelligence feed ticker content from randomized items
  const tickerText = tickerItems.join(' — ');
  const fallbackText = "SYSTEM SECURE // ESTABLISHING SECURE CONNECTION // DECRYPTING DATA STREAM // STATUS NOMINAL // ";
  const finalTickerText = tickerText ? `${tickerText} — ` : fallbackText;
  const tickerContent = Array(4).fill(finalTickerText).join("");

  // Calculate duration to maintain a stable speed:
  // Since keyframe marquee translates -50%, the distance scrolled in one cycle is tickerContent.length / 2 characters.
  // We want to scroll at about 12 characters per second (highly readable and comfortable reading pace).
  // duration = (length / 2) / 12 = length / 24.
  const readingSpeed = 12; // chars per second
  const scrollDuration = Math.max(40, Math.round(tickerContent.length / (2 * readingSpeed)));

  return (
    <main className="px-4 py-8 sm:p-8 max-w-5xl mx-auto flex-grow flex flex-col justify-between w-full">
      {/* 1. HERO SECTION WITH SCROLL PARALLAX */}
      <div 
        className="relative my-4 sm:my-8 py-10 sm:py-16 px-4 sm:px-8 rounded-lg border border-[#d4af37]/25 bg-[#0a0a0a]/75 overflow-hidden flex flex-col items-center justify-center text-center shadow-[inset_0_0_30px_rgba(212,175,55,0.05)]"
        style={{
          opacity: opacity,
          transform: `translateY(${translateY}px)`,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        }}
      >
        {/* CRT Scanline & Grain Texture overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute inset-0 scanline-overlay opacity-20"></div>
          <div className="absolute inset-0 animated-scanline"></div>
        </div>

        {/* Pulsing Logo */}
        <div className="mb-4 sm:mb-6 relative z-10">
          <img
            src="/Logo.jpg"
            alt="G11.5 Logo"
            className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-2 border-[#d4af37]/70 object-cover animate-logo-pulse p-1"
          />
        </div>

        {/* Dramatic Portal Title */}
        <h1 
          className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#d4af37] font-bold tracking-[3px] sm:tracking-[6px] uppercase gold-text-glow z-10 mb-4"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          G11.5 Agency Portal
        </h1>

        {/* Tagline */}
        <p className="text-gray-400 text-xs sm:text-sm md:text-base italic tracking-wider sm:tracking-widest font-mono uppercase max-w-xl z-10 border-t border-[#d4af37]/15 pt-4">
          Advanced Paranormal Investigation Agency
        </p>

        {/* Terminal decorative brackets */}
        <div className="hidden sm:block absolute top-4 left-4 font-mono text-[10px] text-[#d4af37]/40 tracking-wider">
          FEED_ID: CL-7889 // LATENCY: 24MS
        </div>
        <div className="hidden sm:block absolute bottom-4 right-4 font-mono text-[10px] text-[#d4af37]/40 tracking-wider">
          LEVEL_04_CLEARANCE // DECRYPT: OK
        </div>
      </div>

      {/* Spacer to allow scrolling and showcase parallax dissolving effect */}
      <div className="h-4"></div>

      {/* 2. LATEST INTELLIGENCE TICKER */}
      <div className="w-full bg-[#070707] border-y border-[#d4af37]/20 py-3 overflow-hidden relative mb-12 shadow-[0_0_15px_rgba(212,175,55,0.05)] rounded-sm">
        <div className="absolute left-0 top-0 bottom-0 bg-[#d4af37] text-[#050505] text-[9px] sm:text-[10px] font-bold uppercase tracking-[1px] sm:tracking-[2px] px-2.5 sm:px-4 flex items-center z-10 font-serif whitespace-nowrap">
          <span className="hidden sm:inline">INTELLIGENCE FEED</span>
          <span className="sm:hidden">INTEL FEED</span>
        </div>
        <div className="pl-[115px] sm:pl-48 relative overflow-hidden">
          <div 
            className="animate-marquee whitespace-nowrap text-[#d4af37]/90 text-[11px] tracking-[3px] font-mono uppercase"
            style={{ animationDuration: `${scrollDuration}s` }}
          >
            {tickerContent}
          </div>
        </div>
      </div>

      {/* 3. STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
        {/* Cases Card */}
        <TiltContainer>
          <div className="bg-[#0a0a0a]/90 border border-[#d4af37]/15 rounded-lg p-6 flex items-center justify-between gold-border-glow cursor-pointer transition-all duration-300">
            <div>
              <h2 className="text-xs uppercase tracking-[2px] text-[#d4af37]/70 font-serif font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>Cases</h2>
              <p className="text-4xl mt-2 font-mono text-white font-bold tracking-wider">
                <CountUp end={caseCount} />
              </p>
            </div>
            <div className="text-[#d4af37]/80">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
          </div>
        </TiltContainer>

        {/* Equipment Card */}
        <TiltContainer>
          <div className="bg-[#0a0a0a]/90 border border-[#d4af37]/15 rounded-lg p-6 flex items-center justify-between gold-border-glow cursor-pointer transition-all duration-300">
            <div>
              <h2 className="text-xs uppercase tracking-[2px] text-[#d4af37]/70 font-serif font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>Equipment</h2>
              <p className="text-4xl mt-2 font-mono text-white font-bold tracking-wider">
                <CountUp end={equipmentCount} />
              </p>
            </div>
            <div className="text-[#d4af37]/80">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21m0 0-.75-7.5M9 21h3m-3 0H6m9.813-5.096A4.001 4.001 0 1 0 8.018 7.915c.164.568.5 1.05.975 1.37a4.13 4.13 0 0 1 1.637 3.25c.018.22-.072.435-.23.593l-2.096 2.096a.75.75 0 0 0 0 1.061l3.03 3.03a.75.75 0 0 0 1.06 0l2.096-2.096a.75.75 0 0 0 .593-.23 4.13 4.13 0 0 1 3.25 1.637c.32.476.802.812 1.37.975a4.001 4.001 0 1 0-6.182-4.008ZM12 3v4.5m0 0-1.5-1.5M12 7.5l1.5-1.5M21 12h-4.5m0 0 1.5-1.5m-1.5 1.5 1.5 1.5M3 12h4.5m0 0L6 10.5M7.5 12 6 13.5m13.5 5.25-3-3m0 0 1.5-1.5m-1.5 1.5-1.5 1.5" />
              </svg>
            </div>
          </div>
        </TiltContainer>

        {/* Personnel Card */}
        <TiltContainer>
          <div className="bg-[#0a0a0a]/90 border border-[#d4af37]/15 rounded-lg p-6 flex items-center justify-between gold-border-glow cursor-pointer transition-all duration-300">
            <div>
              <h2 className="text-xs uppercase tracking-[2px] text-[#d4af37]/70 font-serif font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>Personnel</h2>
              <p className="text-4xl mt-2 font-mono text-white font-bold tracking-wider">
                <CountUp end={memberCount} />
              </p>
            </div>
            <div className="text-[#d4af37]/80">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm-7.125 7.125c0-1.294 1.05-2.343 2.344-2.343h3.75c1.295 0 2.344 1.05 2.344 2.343m-8.438 0H12" />
              </svg>
            </div>
          </div>
        </TiltContainer>

        {/* Entities Card */}
        <TiltContainer>
          <div className="bg-[#0a0a0a]/90 border border-[#d4af37]/15 rounded-lg p-6 flex items-center justify-between gold-border-glow cursor-pointer transition-all duration-300">
            <div>
              <h2 className="text-xs uppercase tracking-[2px] text-[#d4af37]/70 font-serif font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>Entities</h2>
              <p className="text-4xl mt-2 font-mono text-white font-bold tracking-wider">
                <CountUp end={entityCount} />
              </p>
            </div>
            <div className="text-[#d4af37]/80">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C7.03 2 3 6.03 3 11c0 2.28.85 4.36 2.25 5.96L4 21l3.5-1.5C8.83 20 10.38 20 12 20s3.17 0 4.5-.5L20 21l-1.25-4.04C20.15 15.36 21 13.28 21 11c0-4.97-4.03-9-9-9Zm-3 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </div>
          </div>
        </TiltContainer>
      </div>

      {/* 4. SYSTEM STATUS */}
      <section className="mt-4 pt-6 border-t border-[#d4af37]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg uppercase tracking-[3px] text-[#d4af37] font-serif mb-1" style={{ fontFamily: 'Cinzel, serif' }}>System Status</h2>
          <p className="text-xs text-gray-400 font-mono">ALL SUB-SYSTEMS MONITORING AND TRANSMITTING SIGNAL</p>
        </div>
        <StatusBadge status="online" />
      </section>
    </main>
  );
}
