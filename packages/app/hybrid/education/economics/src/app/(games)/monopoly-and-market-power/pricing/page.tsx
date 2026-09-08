'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { MonopolyGame } from '@/games/monopoly';

const MonopolyPricingPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/monopoly-and-market-power"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Monopoly Pricing Lab
    </h1>
    <MonopolyGame />
  </div>
);

export default MonopolyPricingPage;
