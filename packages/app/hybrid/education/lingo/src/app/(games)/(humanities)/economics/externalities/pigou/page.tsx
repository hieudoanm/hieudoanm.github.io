'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ExternalitiesGame } from '@/games/economics/externalities';

const PigouPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/externalities"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Pigou&rsquo;s Factory
    </h1>
    <ExternalitiesGame />
  </div>
);

export default PigouPage;
