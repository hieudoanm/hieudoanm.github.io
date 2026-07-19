'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { ThemeToggle } from '../atoms/ThemeToggle';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/version', label: 'Version' },
];

export const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className="border-base-300 bg-base-200 flex shrink-0 items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="text-base-content font-mono text-sm font-normal tracking-widest uppercase">
          Clock
        </Link>
        <div className="border-base-300 hidden items-center gap-2 border-l pl-3 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`btn btn-ghost btn-xs ${
                pathname === link.href ? 'text-primary' : 'text-base-content/50'
              }`}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
};
Header.displayName = 'Header';
