'use client';

import Link from 'next/link';
import type { NextPage } from 'next';
import { DictatorGame } from '@/games/dictator';

const DictatorPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/social-preferences"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Dictator Game
    </h1>
    <DictatorGame />
  </div>
);

export default DictatorPage;
