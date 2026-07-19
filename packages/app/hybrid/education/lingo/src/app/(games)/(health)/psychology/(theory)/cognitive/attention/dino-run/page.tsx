'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { DinoRun } from '@/games/health/psychology/cognitive/attention/dino-run';

const DinoRunPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/attention"
      className="text-primary text-sm hover:underline">
      ← Back to Attention
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Dino Run</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Infinite runner — vigilance decay while the obstacle rate climbs.
    </p>
    <DinoRun />
  </div>
);

export default DinoRunPage;
