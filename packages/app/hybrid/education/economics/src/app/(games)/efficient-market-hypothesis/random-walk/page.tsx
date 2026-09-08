'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { EmhGame } from '@/games/emh';

const RandomWalkPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/efficient-market-hypothesis"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Random Walk Market
    </h1>
    <EmhGame />
  </div>
);

export default RandomWalkPage;
