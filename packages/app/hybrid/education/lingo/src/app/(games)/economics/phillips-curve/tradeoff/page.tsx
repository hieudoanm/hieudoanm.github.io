'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { PhillipsGame } from '@/games/economics/phillips';

const PhillipsTradeoffPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/phillips-curve"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Phillips Curve Lab
    </h1>
    <PhillipsGame />
  </div>
);

export default PhillipsTradeoffPage;
