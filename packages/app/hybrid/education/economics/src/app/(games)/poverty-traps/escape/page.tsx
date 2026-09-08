'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { PovertyTrapGame } from '@/games/poverty-trap';

const PovertyTrapEscapePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/poverty-traps"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Poverty Trap Escape
    </h1>
    <PovertyTrapGame />
  </div>
);

export default PovertyTrapEscapePage;
