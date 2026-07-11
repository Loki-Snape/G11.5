"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

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

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6">
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

      {/* Hamburger Icon for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-[#d4af37] hover:text-white focus:outline-none cursor-pointer"
        aria-label="Toggle Menu"
      >
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          {isOpen ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.829 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
            />
          )}
        </svg>
      </button>

      {/* Mobile Links Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#050505]/95 border-b border-[#d4af37]/30 md:hidden flex flex-col py-4 px-6 space-y-4 shadow-lg backdrop-blur-md animate-fade-in z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-[#d4af37] hover:text-white text-sm font-serif tracking-wider ${
                pathname === link.href ? 'underline text-white font-bold' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

