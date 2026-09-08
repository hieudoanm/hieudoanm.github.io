'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { FiscalGame } from '@/games/fiscal';

const FiscalStimulusPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/fiscal-policy"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Fiscal Multiplier Lab
    </h1>
    <FiscalGame />
  </div>
);

export default FiscalStimulusPage;
