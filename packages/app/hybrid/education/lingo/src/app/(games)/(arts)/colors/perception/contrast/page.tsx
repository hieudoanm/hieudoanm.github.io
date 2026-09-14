'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ContrastChecker } from '@/games/colors/contrast';
import { DEFAULT_BASE_COLOR } from '@/games/colors/shared/ColorsTool';

const ContrastPage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/perception" className="btn btn-ghost btn-sm self-start">
      ← Back to Color & Perception
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Contrast Checker
    </h1>
    <div className="w-full max-w-3xl">
      <ContrastChecker baseColor={DEFAULT_BASE_COLOR} />
    </div>
  </main>
);

export default ContrastPage;
