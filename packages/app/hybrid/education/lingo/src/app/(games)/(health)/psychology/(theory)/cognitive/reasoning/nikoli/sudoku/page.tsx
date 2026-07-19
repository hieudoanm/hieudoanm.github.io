'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Sudoku } from '@/games/health/psychology/cognitive/reasoning/nikoli/Sudoku';

const Page: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/reasoning/nikoli"
      className="text-primary text-sm hover:underline">
      ← Back to Nikoli
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Sudoku</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Fill each row, column and box with digits 1–9 — deduction from what the
      grid already forbids.
    </p>
    <Sudoku />
  </div>
);

export default Page;
