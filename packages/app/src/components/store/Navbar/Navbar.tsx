import { Theme } from '@web/hooks/use-theme';
import Link from 'next/link';
import { FC } from 'react';

export const Navbar: FC<{
  theme: Theme;
  onToggleTheme: () => void;
}> = ({ theme, onToggleTheme }) => {
  return (
    <header className="sticky top-4 z-50 flex justify-center px-4 md:px-8">
      <nav className="bg-base-200/55 border-base-300/30 ring-base-100/10 container w-full rounded-full border px-4 py-2 shadow-sm ring-1 backdrop-blur-xl backdrop-saturate-150 md:px-8 md:py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-lg font-black tracking-tight md:text-xl">
              App Store
            </span>
            <span className="text-xs opacity-60">
              Privacy-first in-browser utilities
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="btn btn-ghost btn-sm"
              aria-label="Toggle theme">
              {theme === Theme.DARK ? '🌙' : '☀️'}
            </button>

            <Link
              href="https://hieudoanm.github.io"
              target="_blank"
              className="text-sm opacity-70 transition-opacity hover:opacity-100">
              Hieu Doan
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
