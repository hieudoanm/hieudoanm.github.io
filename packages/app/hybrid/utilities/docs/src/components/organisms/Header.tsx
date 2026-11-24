'use client';

import Link from 'next/link';
import type { FC } from 'react';

const APP_NAME: string = 'Store';

export const Header: FC = () => (
  <header className="border-base-300 bg-base-100 sticky top-0 z-10 w-full border-b px-4 py-3 sm:px-6">
    <div className="flex items-center justify-between">
      <div>
        <Link href="/open" className="text-base-content text-sm font-bold">
          {APP_NAME}
        </Link>
      </div>
    </div>
  </header>
);

Header.displayName = 'Header';
