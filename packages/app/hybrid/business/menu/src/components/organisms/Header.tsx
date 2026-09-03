'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { FiCoffee, FiMoon, FiSun } from 'react-icons/fi';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/version', label: 'Version' },
] as const;

const STORAGE_KEY = 'menu-theme';

const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'dim';
  return localStorage.getItem(STORAGE_KEY) || 'dim';
};

const Header: FC = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === 'dim' ? 'light' : 'dim'));

  return (
    <header className="navbar border-b border-base-300 bg-base-200 px-4">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl normal-case">
          <FiCoffee className="text-xl" />
          Menu
        </Link>
      </div>
      <div className="navbar-end flex items-center gap-1">
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
          {theme === 'dim' ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
