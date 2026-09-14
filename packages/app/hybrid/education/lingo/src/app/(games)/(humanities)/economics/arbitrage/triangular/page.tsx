'use client';

import Link from 'next/link';
import type { NextPage } from 'next';
import { TriangularArbitrageGame } from '@/games/economics/arbitrage';

const TriangularArbitragePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/arbitrage"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Triangular Arbitrage Lab
    </h1>
    <TriangularArbitrageGame />
  </div>
);

export default TriangularArbitragePage;
