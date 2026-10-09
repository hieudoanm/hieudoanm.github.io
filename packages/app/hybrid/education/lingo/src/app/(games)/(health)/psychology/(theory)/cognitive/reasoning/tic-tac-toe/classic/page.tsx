'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Classic } from '@/games/health/psychology/cognitive/reasoning/tic-tac-toe/classic';

const Page: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/reasoning/tic-tac-toe"
      className="text-primary text-sm hover:underline">
      ← Back to Tic-Tac-Toe
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Classic</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      X and O on a 3×3 grid — line up three to win.
    </p>
    <Classic />
  </div>
);

export default Page;
