'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { RpsGame } from '@/games/rps';

const RpsPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/zero-sum-games"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Rock-Paper-Scissors
    </h1>
    <RpsGame />
  </div>
);

export default RpsPage;
