'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Craps } from '@/games/stem/maths/probability/craps';

const CrapsPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/maths/probability"
      className="text-primary text-sm hover:underline">
      ← Back to Probability
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Craps</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Pass line betting where the stated payout is honest and the edge hides in
      the rules.
    </p>
    <Craps />
  </div>
);

export default CrapsPage;
