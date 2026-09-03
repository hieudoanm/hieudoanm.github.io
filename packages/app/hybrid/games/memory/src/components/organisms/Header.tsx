'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'memory-theme';

const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'memory-dark';
  return localStorage.getItem(STORAGE_KEY) || 'memory-dark';
};

export const Header: FC = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) =>
      current === 'memory-dark' ? 'memory-light' : 'memory-dark'
    );

  return (
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b-2 px-4 py-3">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-primary text-xs font-bold tracking-wider">
          MEMORY GAMES
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/about"
            className="text-base-content/60 hover:text-primary px-2 py-1 text-[8px] transition-colors">
            ABOUT
          </Link>
          <Link
            href="/downloads"
            className="text-base-content/60 hover:text-primary px-2 py-1 text-[8px] transition-colors">
            DOWNLOADS
          </Link>
          <Link
            href="/version"
            className="text-base-content/60 hover:text-primary px-2 py-1 text-[8px] transition-colors">
            VERSION
          </Link>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={toggleTheme}
            data-testid="theme-toggle">
            {theme === 'memory-dark' ? '☀️' : '🧛'}
          </button>
        </nav>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
