'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { SlidingPuzzle } from '@/games/health/psychology/cognitive/reasoning/sliding-puzzle';

const Page: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/reasoning"
      className="text-primary text-sm hover:underline">
      ← Back to Reasoning
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Sliding Puzzle
    </h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Reassemble an image by sliding tiles — a spatial planning problem.
    </p>
    <SlidingPuzzle />
  </div>
);

export default Page;
