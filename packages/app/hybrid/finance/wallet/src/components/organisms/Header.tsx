'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { FiCreditCard, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/version', label: 'Version' },
] as const;

const Header: FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className="border-base-300 bg-base-200 sticky top-0 z-50 border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <FiCreditCard /> Wallet
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className="btn btn-ghost btn-sm">
              {label}
            </Link>
          ))}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={toggleTheme}
            data-testid="theme-toggle"
            aria-label="Toggle theme">
            {isDark ? (
              <FiSun className="text-lg" />
            ) : (
              <FiMoon className="text-lg" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
