'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { MonetaryPolicyGame } from '@/games/economics/monetary-policy';

const InterestPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/monetary-policy"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Monetary Policy Lab
    </h1>
    <MonetaryPolicyGame />
  </div>
);

export default InterestPage;
