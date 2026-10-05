'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { HiLo } from '@/games/stem/maths/probability/hi-lo';

const HiLoPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/maths/probability"
      className="text-primary text-sm hover:underline">
      ← Back to Probability
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Hi-Lo</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Higher or lower — odds that shift as the deck depletes, and streaks that
      are mostly variance.
    </p>
    <HiLo />
  </div>
);

export default HiLoPage;
