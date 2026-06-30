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
    <nav className="fixed top-0 left-0 right-0 bg-[#050505] border-b border-[#d4af37]/30 z-50">
      <ul className="flex justify-center space-x-6 py-3">
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
