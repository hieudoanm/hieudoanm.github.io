'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { LemonsGame } from '@/games/lemons';

const LemonsPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/adverse-selection"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      The Market for Lemons
    </h1>
    <LemonsGame />
  </div>
);

export default LemonsPage;
