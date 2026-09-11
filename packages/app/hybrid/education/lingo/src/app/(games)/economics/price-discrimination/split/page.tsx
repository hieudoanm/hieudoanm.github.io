'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { SplitPricingGame } from '@/games/economics/price-discrimination';

const SplitPricingPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/price-discrimination"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Segment Pricing Lab
    </h1>
    <SplitPricingGame />
  </div>
);

export default SplitPricingPage;
