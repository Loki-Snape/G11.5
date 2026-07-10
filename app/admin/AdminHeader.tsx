'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from './actions';

export default function AdminHeader() {
  const pathname = usePathname();
  const isBaseAdmin = pathname === '/admin';

  return (
    <header className="border-b border-[#d4af37]/30 bg-[#050505] py-4 px-6 fixed top-0 left-0 right-0 z-50 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link href="/admin" className="font-serif text-xl tracking-[3px] text-[#d4af37] hover:opacity-85 transition-opacity flex items-center space-x-3" style={{ fontFamily: 'Cinzel, serif' }}>
          <img
            src="/Logo.jpg"
            alt="G11.5 Logo"
            className="h-8 w-8 rounded-full border border-[#d4af37]/40 p-0.5 object-cover"
          />
          <span>G11.5 COMMAND</span>
        </Link>
        {!isBaseAdmin && (
          <Link
            href="/admin"
            className="text-xs uppercase tracking-wider text-[#d4af37]/70 hover:text-[#d4af37] transition-colors border-l border-[#d4af37]/20 pl-6 flex items-center gap-1"
          >
            ← Back to Agency Command
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <Link
          href="/"
          className="text-xs uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
        >
          Portal Home
        </Link>
        
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-xs uppercase tracking-wider font-semibold border border-red-500/40 text-red-400 px-4 py-1.5 rounded hover:bg-red-500/10 transition-all cursor-pointer"
          >
            Log Out
          </button>
        </form>
      </div>
    </header>
  );
}
