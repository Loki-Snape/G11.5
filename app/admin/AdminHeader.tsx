'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from './actions';

export default function AdminHeader() {
  const pathname = usePathname();
  const isBaseAdmin = pathname === '/admin';

  return (
    <header className="border-b border-[#d4af37]/30 bg-[#050505] py-4 px-4 sm:px-6 fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2">
      <div className="flex items-center space-x-2 sm:space-x-6 min-w-0">
        <Link href="/admin" className="font-serif text-base sm:text-xl tracking-[2px] sm:tracking-[3px] text-[#d4af37] hover:opacity-85 transition-opacity flex items-center space-x-2 flex-shrink-0" style={{ fontFamily: 'Cinzel, serif' }}>
          <img
            src="/Logo.jpg"
            alt="G11.5 Logo"
            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border border-[#d4af37]/40 p-0.5 object-cover"
          />
          <span className="hidden sm:inline">G11.5 COMMAND</span>
          <span className="sm:hidden text-xs">G11.5 CMD</span>
        </Link>
        {!isBaseAdmin && (
          <Link
            href="/admin"
            className="text-[10px] sm:text-xs uppercase tracking-wider text-[#d4af37]/70 hover:text-[#d4af37] transition-colors border-l border-[#d4af37]/20 pl-2 sm:pl-6 flex items-center gap-0.5 whitespace-nowrap"
          >
            <span className="hidden sm:inline">← Back to Agency Command</span>
            <span className="sm:hidden">← CMD</span>
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-2 sm:space-x-6 flex-shrink-0">
        <Link
          href="/"
          className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
        >
          <span className="hidden sm:inline">Portal Home</span>
          <span className="sm:hidden">Home</span>
        </Link>
        
        <form action={logoutAction} className="m-0">
          <button
            type="submit"
            className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold border border-red-500/40 text-red-400 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded hover:bg-red-500/10 transition-all cursor-pointer"
          >
            Log Out
          </button>
        </form>
      </div>
    </header>
  );
}
