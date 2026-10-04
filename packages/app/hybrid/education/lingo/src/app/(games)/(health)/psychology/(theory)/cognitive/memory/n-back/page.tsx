'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { NBack } from '@/games/health/psychology/cognitive/memory/n-back';

const NBackPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/memory"
      className="text-primary text-sm hover:underline">
      ← Back to Memory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">N-Back</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Spatial n-back test — updating a running representation of what just
      happened.
    </p>
    <NBack />
  </div>
);

export default NBackPage;
