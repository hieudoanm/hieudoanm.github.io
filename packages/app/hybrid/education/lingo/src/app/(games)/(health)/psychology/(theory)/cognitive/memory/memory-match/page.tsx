'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { MemoryMatch } from '@/games/health/psychology/cognitive/memory/memory-match';

const MemoryMatchPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/memory"
      className="text-primary text-sm hover:underline">
      ← Back to Memory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Memory Match
    </h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Emoji card pairing grid — spatial recall under a growing load.
    </p>
    <MemoryMatch />
  </div>
);

export default MemoryMatchPage;
