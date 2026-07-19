'use client';

import Link from 'next/link';
import type { NextPage } from 'next';
import { StagHuntGame } from '@/games/economics/stag-hunt';

const StagHuntPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/coordination-games"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Stag Hunt
    </h1>
    <StagHuntGame />
  </div>
);

export default StagHuntPage;
