'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { TintShadeTone } from '@/games/arts/colors/tint-shade-tone';
import { DEFAULT_BASE_COLOR } from '@/games/arts/colors/shared/ColorsTool';

const TintShadeTonePage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/scales" className="btn btn-ghost btn-sm self-start">
      ← Back to Color Scales
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Tint, Shade & Tone
    </h1>
    <div className="w-full max-w-3xl">
      <TintShadeTone baseColor={DEFAULT_BASE_COLOR} />
    </div>
  </main>
);

export default TintShadeTonePage;
