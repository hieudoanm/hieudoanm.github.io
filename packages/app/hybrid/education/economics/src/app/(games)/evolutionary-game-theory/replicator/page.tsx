'use client';

import Link from 'next/link';
import type { NextPage } from 'next';
import { ReplicatorGame } from '@/games/evolution';

const ReplicatorPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/evolutionary-game-theory"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Replicator Dynamics Lab
    </h1>
    <ReplicatorGame />
  </div>
);

export default ReplicatorPage;
