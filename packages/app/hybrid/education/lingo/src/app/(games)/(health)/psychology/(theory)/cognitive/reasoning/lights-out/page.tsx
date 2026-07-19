'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { LightsOut } from '@/games/health/psychology/cognitive/reasoning/lights-out';

const Page: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/reasoning"
      className="text-primary text-sm hover:underline">
      ← Back to Reasoning
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Lights Out
    </h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Toggle a cell and its neighbours off — planning under a reversal rule.
    </p>
    <LightsOut />
  </div>
);

export default Page;
