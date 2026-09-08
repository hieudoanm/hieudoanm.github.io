'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { OpportunityCostGame } from '@/games/opportunity-cost';

const TradeOffsPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/opportunity-cost"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Trade-Off Builder
    </h1>
    <OpportunityCostGame />
  </div>
);

export default TradeOffsPage;
