'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { KeynesianGame } from '@/games/keynesian';

const KeynesianCrossPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/keynesian-economics"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Keynesian Cross
    </h1>
    <KeynesianGame />
  </div>
);

export default KeynesianCrossPage;
