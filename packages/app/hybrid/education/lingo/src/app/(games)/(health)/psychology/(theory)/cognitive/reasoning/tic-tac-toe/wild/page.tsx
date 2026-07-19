'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Wild } from '@/games/health/psychology/cognitive/reasoning/tic-tac-toe/wild';

const Page: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/reasoning/tic-tac-toe"
      className="text-primary text-sm hover:underline">
      ← Back to Tic-Tac-Toe
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Wild</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Pick X or O every turn — either mark can win the game.
    </p>
    <Wild />
  </div>
);

export default Page;
