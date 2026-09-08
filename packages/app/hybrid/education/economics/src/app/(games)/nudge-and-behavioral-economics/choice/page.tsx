'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { NudgeGame } from '@/games/nudge';

const NudgeChoicePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/nudge-and-behavioral-economics"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Nudge Design Lab
    </h1>
    <NudgeGame />
  </div>
);

export default NudgeChoicePage;
