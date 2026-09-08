'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { HumanCapitalGame } from '@/games/human-capital';

const HumanCapitalPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/human-capital"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Human Capital Decision
    </h1>
    <HumanCapitalGame />
  </div>
);

export default HumanCapitalPage;
