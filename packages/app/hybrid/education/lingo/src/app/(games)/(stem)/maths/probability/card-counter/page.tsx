'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { CardCounter } from '@/games/stem/maths/probability/card-counter';

const CardCounterPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/maths/probability"
      className="text-primary text-sm hover:underline">
      ← Back to Probability
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Card Counter
    </h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Hi-Lo running count across a full deck, which must return to zero.
    </p>
    <CardCounter />
  </div>
);

export default CardCounterPage;
