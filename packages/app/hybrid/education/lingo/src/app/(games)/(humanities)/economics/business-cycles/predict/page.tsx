'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { BusinessCyclesGame } from '@/games/economics/business-cycles';

const BusinessCyclesPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/business-cycles"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Business Cycle Forecaster
    </h1>
    <BusinessCyclesGame />
  </div>
);

export default BusinessCyclesPage;
