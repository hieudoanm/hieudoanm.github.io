'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { MarginalUtilityLab } from '@/games/economics/marginal-utility';

const MarginalUtilityLabPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/marginal-utility"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Marginal Utility Lab
    </h1>
    <MarginalUtilityLab />
  </div>
);

export default MarginalUtilityLabPage;
