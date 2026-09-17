'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Game2048 } from '@/games/health/psychology/cognitive/reasoning/game2048';

const Page: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/reasoning"
      className="text-primary text-sm hover:underline">
      ← Back to Reasoning
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">2048</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Merge equal tiles to reach 2048 — planning several moves ahead.
    </p>
    <Game2048 />
  </div>
);

export default Page;
