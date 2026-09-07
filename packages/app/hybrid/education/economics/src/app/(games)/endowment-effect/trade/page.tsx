'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { EndowmentGame } from '@/games/endowment';

const EndowmentTradePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/endowment-effect"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Endowment Experiment
    </h1>
    <EndowmentGame />
  </div>
);

export default EndowmentTradePage;
