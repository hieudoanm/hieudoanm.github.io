'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ColorAdjuster } from '@/games/colors/adjuster';
import { DEFAULT_BASE_COLOR } from '@/games/colors/shared/ColorsTool';

const AdjusterPage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/models" className="btn btn-ghost btn-sm self-start">
      ← Back to Color Models
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Color Adjuster
    </h1>
    <div className="w-full max-w-3xl">
      <ColorAdjuster baseColor={DEFAULT_BASE_COLOR} />
    </div>
  </main>
);

export default AdjusterPage;
