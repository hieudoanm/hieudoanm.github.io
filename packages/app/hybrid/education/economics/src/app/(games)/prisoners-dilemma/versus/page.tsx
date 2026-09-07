'use client';

import Link from 'next/link';
import { PrisonerDilemma } from '@/games/prisoners-dilemma';
import { NextPage } from 'next';

const PrisonerDilemmaPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/prisoners-dilemma"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Prisoner Dilemma
    </h1>
    <PrisonerDilemma />
  </div>
);

export default PrisonerDilemmaPage;
