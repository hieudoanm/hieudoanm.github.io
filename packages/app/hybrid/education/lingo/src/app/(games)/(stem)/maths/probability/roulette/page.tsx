'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Roulette } from '@/games/stem/maths/probability/roulette';

const RoulettePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/maths/probability"
      className="text-primary text-sm hover:underline">
      ← Back to Probability
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Roulette</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Single-zero wheel where the zero is what makes every outside bet a losing
      bet.
    </p>
    <Roulette />
  </div>
);

export default RoulettePage;
