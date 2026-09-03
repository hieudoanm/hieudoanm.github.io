'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/version', label: 'Version' },
] as const;

const STORAGE_KEY = 'pos-theme';

const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'dim';
  return localStorage.getItem(STORAGE_KEY) || 'dim';
};

export const Header: FC = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === 'dim' ? 'light' : 'dim'));

  return (
    <header className="border-base-300 border-b">
      <nav className="container mx-auto flex items-center gap-2 px-4 py-2 md:px-8 md:py-4">
        <Link href="/">
          <h1 className="text-sm font-bold">POS</h1>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className="btn btn-ghost btn-xs">
              {label}
            </Link>
          ))}
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={toggleTheme}
            data-testid="theme-toggle"
            aria-label="Toggle theme">
            {theme === 'dim' ? <FiSun className="text-sm" /> : <FiMoon className="text-sm" />}
          </button>
        </div>
      </nav>
    </header>
  );
};
