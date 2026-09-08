'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { AggregateDemandGame } from '@/games/ad-as';

const AggregateDemandShocksPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/aggregate-demand-supply"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      AD-AS Shocks Lab
    </h1>
    <AggregateDemandGame />
  </div>
);

export default AggregateDemandShocksPage;
