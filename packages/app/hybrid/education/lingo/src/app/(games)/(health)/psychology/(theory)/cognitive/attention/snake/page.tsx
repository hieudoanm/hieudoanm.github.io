'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Snake } from '@/games/health/psychology/cognitive/attention/snake';

const SnakePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/attention"
      className="text-primary text-sm hover:underline">
      ← Back to Attention
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Snake</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Classic snake on a 12×12 grid — inhibition under a shrinking time budget.
    </p>
    <Snake />
  </div>
);

export default SnakePage;
