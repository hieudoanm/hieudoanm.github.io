'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { CapmGame } from '@/games/economics/capm';

const PortfolioPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/capm-and-risk"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Portfolio Lab
    </h1>
    <CapmGame />
  </div>
);

export default PortfolioPage;
