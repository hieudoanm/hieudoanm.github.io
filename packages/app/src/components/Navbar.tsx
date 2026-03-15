import Link from 'next/link';
import { FC } from 'react';

export const Navbar: FC = () => {
  return (
    <nav className="border-b border-neutral-800">
      <div className="container mx-auto px-4 py-2 md:px-8 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="font-black">Hieu Doan</h1>
          </Link>
        </div>
      </div>
    </nav>
  );
};
