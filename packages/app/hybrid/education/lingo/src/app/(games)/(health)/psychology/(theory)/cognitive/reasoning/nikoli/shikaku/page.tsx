'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Shikaku } from '@/games/health/psychology/cognitive/reasoning/nikoli/Shikaku';

const Page: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/reasoning/nikoli"
      className="text-primary text-sm hover:underline">
      ← Back to Nikoli
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Shikaku</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Divide the grid into numbered rectangles — each clue pins one region.
    </p>
    <Shikaku />
  </div>
);

export default Page;
