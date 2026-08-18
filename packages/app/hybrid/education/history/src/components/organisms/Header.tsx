'use client';

import Link from 'next/link';
import { FC } from 'react';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

export const Header: FC = () => (
  <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-4 py-3">
    <div className="flex items-center justify-between">
      <Link href="/" className="text-primary text-sm font-bold tracking-wider">
        History
      </Link>

      <nav className="flex items-center gap-1">
        <Link
          href="/about/"
          className="text-base-content/60 hover:text-primary px-2 py-1 text-xs transition-colors">
          About
        </Link>
        <Link
          href="/downloads/"
          className="text-base-content/60 hover:text-primary px-2 py-1 text-xs transition-colors">
          Downloads
        </Link>
        <Link
          href="/version/"
          className="text-base-content/60 hover:text-primary px-2 py-1 text-xs transition-colors">
          Version
        </Link>
        <ThemeToggle />
      </nav>
    </div>
  </header>
);

Header.displayName = 'Header';
