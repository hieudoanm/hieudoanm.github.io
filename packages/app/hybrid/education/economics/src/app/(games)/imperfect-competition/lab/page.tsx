'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { MonopolisticCompetitionGame } from '@/games/monopolistic';

const MonopolisticCompetitionLabPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/imperfect-competition"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Monopolistic Competition Firm Lab
    </h1>
    <MonopolisticCompetitionGame />
  </div>
);

export default MonopolisticCompetitionLabPage;
