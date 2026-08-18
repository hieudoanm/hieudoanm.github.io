'use client';

import type { FC } from 'react';
import Link from 'next/link';

export const Header: FC = () => (
  <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b-2 px-4 py-3">
    <div className="flex items-center justify-between">
      <Link href="/" className="text-primary text-xs font-bold tracking-wider">
        8-BIT GAMES
      </Link>

      <nav className="flex items-center gap-1">
        <Link
          href="/about"
          className="text-base-content/60 hover:text-primary px-2 py-1 text-[8px] transition-colors">
          ABOUT
        </Link>
      </nav>
    </div>
  </header>
);

Header.displayName = 'Header';
