"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'APPLY', href: '/apply' },
  { name: 'REPORT CASE', href: '/report-case' },
  { name: 'TEAM', href: '/team' },
  { name: 'CASES', href: '/cases' },
  { name: 'INVENTORY', href: '/inventory' },
  { name: 'ENTITIES', href: '/entities' },
  { name: 'GHOSTOPEDIA', href: '/ghostopedia' },
];

export default function NavBar() {
  const pathname = usePathname();
  // hide on admin routes (middleware already blocks, but keep for safety)
  if (pathname.startsWith('/admin')) return null;
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#050505] border-b border-[#d4af37]/30 z-50 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img
          src="/Logo.jpg"
          alt="G11.5 Logo"
          className="h-8 w-8 rounded-full border border-[#d4af37]/40 p-0.5 object-cover"
        />
        <span className="text-[#d4af37] font-serif tracking-[2px] text-sm font-bold uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
          G11.5 Agency Portal
        </span>
      </div>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-[#d4af37] hover:text-white text-sm font-serif ${pathname === link.href ? 'underline' : ''}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
