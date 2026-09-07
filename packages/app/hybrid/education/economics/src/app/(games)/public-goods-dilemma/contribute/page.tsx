'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { PublicGoodsGame } from '@/games/public-goods';

const ContributePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/public-goods-dilemma"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Contribute to the Public Good
    </h1>
    <PublicGoodsGame />
  </div>
);

export default ContributePage;
