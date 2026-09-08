'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { MarketFailuresGame } from '@/games/market-failures';

const PoliciesPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/market-failures"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Market Failure Fixer
    </h1>
    <MarketFailuresGame />
  </div>
);

export default PoliciesPage;
