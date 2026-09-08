'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ISLMExplorer } from '@/games/is-lm';

const EquilibriumPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link href="/is-lm-model" className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      IS-LM Explorer
    </h1>
    <ISLMExplorer />
  </div>
);

export default EquilibriumPage;
