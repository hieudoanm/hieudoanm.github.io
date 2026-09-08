'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { TimeValueGame } from '@/games/time-value';

const LabPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/time-value-of-money"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Future Value Lab
    </h1>
    <TimeValueGame />
  </div>
);

export default LabPage;
