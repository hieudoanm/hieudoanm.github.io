'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { APPS, AppKey } from '@/data/constants';

interface ClockAppProps {
  activeApp: AppKey;
  onNavigate: (app: AppKey) => void;
  children: React.ReactNode;
}

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/version', label: 'Version' },
];

export const ClockApp: FC<ClockAppProps> = ({
  activeApp,
  onNavigate,
  children,
}) => {
  const pathname = usePathname();

  return (
    <div className="bg-base-100 text-base-content flex h-screen w-screen flex-col overflow-hidden">
      <header className="border-base-300 bg-base-200 flex shrink-0 items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-3">
          <h1 className="text-base-content font-mono text-sm font-normal tracking-widest uppercase">
            Clock
          </h1>
          <div className="border-base-300 hidden items-center gap-2 border-l pl-3 sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`btn btn-ghost btn-xs ${pathname === link.href ? 'text-primary' : 'text-base-content/50'}`}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {children}
      </main>

      <footer className="border-base-300 flex shrink-0 justify-center gap-2 border-t px-4 py-3">
        {APPS.map((app) => (
          <button
            key={app.key}
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 transition-all ${
              activeApp === app.key
                ? 'bg-primary/10 text-primary'
                : 'text-base-content/40 hover:bg-base-200 hover:text-base-content/70'
            }`}
            onClick={() => onNavigate(app.key)}>
            <app.Icon className="h-6 w-6" />
            <span className="font-mono text-[10px] tracking-wider uppercase">
              {app.label}
            </span>
          </button>
        ))}
      </footer>
    </div>
  );
};

ClockApp.displayName = 'ClockApp';
