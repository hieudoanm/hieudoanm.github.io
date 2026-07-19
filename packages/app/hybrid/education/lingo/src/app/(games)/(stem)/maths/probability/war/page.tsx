'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { War } from '@/games/stem/maths/probability/war';

const WarPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/maths/probability"
      className="text-primary text-sm hover:underline">
      ← Back to Probability
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">War</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Higher card takes the pot; a tie doubles it — expected value in one line.
    </p>
    <War />
  </div>
);

export default WarPage;
