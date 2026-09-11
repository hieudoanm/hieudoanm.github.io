'use client';

import Link from 'next/link';
import type { NextPage } from 'next';
import { LaborMarketLab } from '@/games/economics/labor';

const WagePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/labor-markets"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Labor Market Lab
    </h1>
    <LaborMarketLab />
  </div>
);

export default WagePage;
