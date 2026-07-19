'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { PiPalette } from 'react-icons/pi';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

const NAV_LINKS = [
  { label: 'About', href: '/about/' },
  { label: 'Downloads', href: '/downloads/' },
  { label: 'Version', href: '/version/' },
];

export const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className="border-base-300 bg-base-100 sticky top-0 z-20 border-b px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PiPalette className="text-primary text-xl" />
          <span className="text-base-content text-sm font-bold tracking-wide">
            Colors
          </span>
        </Link>

        <nav className="flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-base-content/60 hover:text-primary px-2 py-1 text-xs transition-colors sm:px-3 ${
                pathname === href ? 'text-primary font-semibold' : ''
              }`}>
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
