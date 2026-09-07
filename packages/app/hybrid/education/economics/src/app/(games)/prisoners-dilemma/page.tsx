'use client';

import Link from 'next/link';
import { PrisonerDilemma } from '@/games/prisoners-dilemma';
import { NextPage } from 'next';

const PrisonerDilemmaPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Prisoner Dilemma
    </h1>
    <PrisonerDilemma />
    <div className="flex flex-wrap justify-center gap-2">
      <Link
        href="/prisoners-dilemma/bots"
        className="btn btn-outline btn-primary btn-sm">
        View Bots 🤖
      </Link>
      <Link
        href="/prisoners-dilemma/stimulation"
        className="btn btn-outline btn-primary btn-sm">
        Simulation 🏆
      </Link>
    </div>
  </div>
);

export default PrisonerDilemmaPage;
