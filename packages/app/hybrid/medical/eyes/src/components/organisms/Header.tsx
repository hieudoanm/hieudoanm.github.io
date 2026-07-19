'use client';

import Link from 'next/link';
import { FC } from 'react';
import { FiArrowLeft, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Version', href: '/version' },
];

export const Header: FC<{ title: string }> = ({ title }) => {
  const [theme, toggle] = useTheme();
  const isLight = theme === 'eyes-light';

  return (
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="btn btn-ghost btn-sm" aria-label="Home">
          <h1 className="text-sm font-bold">{title}</h1>{' '}
        </Link>
        <nav className="flex flex-0 items-center gap-4">
          <ul className="flex list-none items-center gap-4">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-base-content/70 hover:text-base-content text-sm">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={toggle}
            className="btn btn-ghost btn-sm gap-1.5"
            aria-label={
              isLight ? 'Switch to dark theme' : 'Switch to light theme'
            }>
            {isLight ? (
              <FiMoon className="text-lg" />
            ) : (
              <FiSun className="text-lg" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
