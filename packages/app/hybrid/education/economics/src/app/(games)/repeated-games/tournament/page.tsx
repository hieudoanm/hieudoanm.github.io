'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { RepeatedDilemmaGame } from '@/games/repeated';

const RepeatedDilemmaPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/repeated-games"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Repeated Dilemma Tournament
    </h1>
    <RepeatedDilemmaGame />
  </div>
);

export default RepeatedDilemmaPage;
