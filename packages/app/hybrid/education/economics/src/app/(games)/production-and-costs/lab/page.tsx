'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ProductionGame } from '@/games/production';

const ProductionLabPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/production-and-costs"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Production &amp; Cost Lab
    </h1>
    <p className="text-base-content/60 text-sm">
      Drag the sliders to see short-run production and cost curves, then take
      the quiz.
    </p>
    <ProductionGame />
  </div>
);

export default ProductionLabPage;
