'use client';

import Link from 'next/link';
import { type FC, useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/version', label: 'Version' },
] as const;

const STORAGE_KEY = 'tax-theme';

const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'nothing';
  return localStorage.getItem(STORAGE_KEY) || 'nothing';
};

export const Header: FC = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === 'nothing' ? 'winter' : 'nothing'));

  return (
    <header className="border-base-300 bg-base-200 sticky top-0 z-30 border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          🧾 Tax
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
            {theme === 'nothing' ? (
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
