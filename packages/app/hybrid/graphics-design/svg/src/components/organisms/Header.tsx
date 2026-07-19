'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/version', label: 'Version' },
] as const;

const STORAGE_KEY = 'svg-theme';

const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'svg-light';
  return localStorage.getItem(STORAGE_KEY) || 'svg-light';
};

export const Header: FC = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === 'svg-light' ? 'svg-dark' : 'svg-light'));

  return (
    <header className="border-base-300 bg-base-100 sticky top-0 z-20 border-b px-4 py-3">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-base-content text-sm font-bold tracking-wide">
            SVG
          </span>
        </Link>

        <nav className="flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-base-content/60 hover:text-primary px-2 py-1 text-xs transition-colors sm:px-3">
              {label}
            </Link>
          ))}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={toggleTheme}
            aria-label="Toggle theme">
            {theme === 'svg-dark' ? <FiSun /> : <FiMoon />}
          </button>
        </nav>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
