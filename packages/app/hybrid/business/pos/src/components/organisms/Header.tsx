import Link from 'next/link';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="border-base-300 border-b">
      <nav className="container mx-auto flex items-center gap-2 px-4 py-2 md:px-8 md:py-4">
        <Link href="/">
          <h1 className="text-sm font-bold">POS</h1>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <Link href="/about" className="btn btn-ghost btn-xs">
            About
          </Link>
          <Link href="/downloads" className="btn btn-ghost btn-xs">
            Downloads
          </Link>
          <Link href="/version" className="btn btn-ghost btn-xs">
            Version
          </Link>
        </div>
      </nav>
    </header>
  );
};
