'use client';

import Link from 'next/link';
import { type FC } from 'react';
import { FiMenu, FiUser } from 'react-icons/fi';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-base-200 border-base-300 sticky top-0 z-30 border-b px-4 py-3 md:hidden">
      <div className="flex items-center justify-between">
        <button
          className="btn btn-ghost btn-sm btn-circle"
          onClick={onMenuToggle}
          aria-label="Toggle menu">
          <FiMenu className="h-5 w-5" />
        </button>

        <Link href="/" className="text-lg font-bold">
          🧾 Tax
        </Link>

        <Link href="/profile" className="btn btn-ghost btn-sm btn-circle">
          <FiUser className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
};
