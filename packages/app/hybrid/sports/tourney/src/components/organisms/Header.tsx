'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { PiMoonBold, PiSunBold } from 'react-icons/pi';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/version', label: 'Version' },
];

const ThemeToggle: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLight(
      document.documentElement.getAttribute('data-theme') === 'tourney-light'
    );
  }, []);

  if (!mounted) return <div className="btn btn-ghost btn-sm btn-circle" />;

  return (
    <button
      className="btn btn-ghost btn-sm btn-circle"
      onClick={() => {
        const next = isLight ? 'tourney-dark' : 'tourney-light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('tourney-theme', next);
        setIsLight(!isLight);
      }}
      title="Toggle theme"
      aria-label="Toggle theme">
      {isLight ? (
        <PiSunBold className="h-4 w-4" />
      ) : (
        <PiMoonBold className="h-4 w-4" />
      )}
    </button>
  );
};
ThemeToggle.displayName = 'ThemeToggle';

export const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-base-content font-bold">
            Tourney
          </Link>
          <div className="border-base-300 hidden items-center gap-2 border-l pl-3 sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`btn btn-ghost btn-sm ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-base-content/50'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
Header.displayName = 'Header';
