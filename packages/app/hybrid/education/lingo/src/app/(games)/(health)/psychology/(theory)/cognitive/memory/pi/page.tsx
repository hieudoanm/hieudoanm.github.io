'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Pi } from '@/games/health/psychology/cognitive/memory/pi';

const PiPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/memory"
      className="text-primary text-sm hover:underline">
      ← Back to Memory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Pi</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Digit memorisation — a fixed sequence with no structure to infer.
    </p>
    <Pi />
  </div>
);

export default PiPage;
