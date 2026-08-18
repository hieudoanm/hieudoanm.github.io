'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'countries-theme';

const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'dracula';
  return localStorage.getItem(STORAGE_KEY) || 'dracula';
};

export const Header: FC = () => {
  const pathname = usePathname();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === 'dracula' ? 'bumblebee' : 'dracula'));

  return (
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-base-content text-sm font-bold">
          Countries
        </Link>
        <nav className="flex items-center gap-1">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={toggleTheme}
            data-testid="theme-toggle">
            {theme === 'dracula' ? '☀️' : '🧛'}
          </button>
        </nav>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
