'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Fillomino } from '@/games/health/psychology/cognitive/reasoning/nikoli/Fillomino';

const Page: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/reasoning/nikoli"
      className="text-primary text-sm hover:underline">
      ← Back to Nikoli
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Fillomino
    </h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Fill regions so each matches its number — every cell arbitrated by the
      size rule.
    </p>
    <Fillomino />
  </div>
);

export default Page;
