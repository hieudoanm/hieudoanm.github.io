'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { CausationChallenge } from '@/games/economics/causal';

const ExperimentsPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/causal-inference"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Causation Challenge
    </h1>
    <CausationChallenge />
  </div>
);

export default ExperimentsPage;
