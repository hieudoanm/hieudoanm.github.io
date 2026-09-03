'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiSun, PiMoon } from 'react-icons/pi';

const STORAGE_KEY = 'store-theme';

const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'store-dark';
  return localStorage.getItem(STORAGE_KEY) || 'store-dark';
};

export const Header: FC = () => {
  const pathname = usePathname();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) =>
      current === 'store-dark' ? 'store-light' : 'store-dark'
    );

  return (
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-base-content text-sm font-bold">
          Store
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/about/"
            className={`btn btn-ghost btn-sm ${pathname === '/about/' ? 'btn-active' : ''}`}>
            About
          </Link>
          <Link
            href="/downloads/"
            className={`btn btn-ghost btn-sm ${pathname === '/downloads/' ? 'btn-active' : ''}`}>
            Downloads
          </Link>
          <Link
            href="/version/"
            className={`btn btn-ghost btn-sm ${pathname === '/version/' ? 'btn-active' : ''}`}>
            Version
          </Link>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={toggleTheme}
            data-testid="theme-toggle">
            {theme === 'store-dark' ? (
              <PiSun className="text-lg" />
            ) : (
              <PiMoon className="text-lg" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
