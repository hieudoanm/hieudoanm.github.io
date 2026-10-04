'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Norinori } from '@/games/health/psychology/cognitive/reasoning/nikoli/Norinori';

const Page: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/reasoning/nikoli"
      className="text-primary text-sm hover:underline">
      ← Back to Nikoli
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Norinori</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Shade two cells in every domino region — adjacency and count together
      constrain the board.
    </p>
    <Norinori />
  </div>
);

export default Page;
