'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { OverUnderSeven } from '@/games/stem/maths/probability/over-under-seven';

const OverUnderSevenPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/maths/probability"
      className="text-primary text-sm hover:underline">
      ← Back to Probability
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Over / Under Seven
    </h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Two dice and three bets — 2:1 is not the same thing as fifty-fifty.
    </p>
    <OverUnderSeven />
  </div>
);

export default OverUnderSevenPage;
