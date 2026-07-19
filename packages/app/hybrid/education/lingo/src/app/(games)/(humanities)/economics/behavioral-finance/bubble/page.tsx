'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { BubbleLabGame } from '@/games/economics/bubbles';

const BubblePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/behavioral-finance"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Bubble Lab
    </h1>
    <BubbleLabGame />
  </div>
);

export default BubblePage;
