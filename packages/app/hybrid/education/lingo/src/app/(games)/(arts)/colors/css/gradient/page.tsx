'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { GradientBuilder } from '@/games/colors/gradient';
import { DEFAULT_BASE_COLOR } from '@/games/colors/shared/ColorsTool';

const GradientPage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/css" className="btn btn-ghost btn-sm self-start">
      ← Back to Color in CSS
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Gradient Builder
    </h1>
    <div className="w-full max-w-3xl">
      <GradientBuilder baseColor={DEFAULT_BASE_COLOR} />
    </div>
  </main>
);

export default GradientPage;
