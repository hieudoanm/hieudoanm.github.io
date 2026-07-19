'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { VotingPowerLab } from '@/games/economics/public-choice';

const VotingPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/public-choice"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Voting Power Lab
    </h1>
    <VotingPowerLab />
  </div>
);

export default VotingPage;
