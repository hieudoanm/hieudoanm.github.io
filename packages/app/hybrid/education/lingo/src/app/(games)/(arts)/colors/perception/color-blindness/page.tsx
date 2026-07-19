'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ColorBlindnessSimulator } from '@/games/arts/colors/color-blindness';
import { DEFAULT_BASE_COLOR } from '@/games/arts/colors/shared/ColorsTool';

const ColorBlindnessPage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/perception" className="btn btn-ghost btn-sm self-start">
      ← Back to Color & Perception
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Color Blindness
    </h1>
    <div className="w-full max-w-3xl">
      <ColorBlindnessSimulator baseColor={DEFAULT_BASE_COLOR} />
    </div>
  </main>
);

export default ColorBlindnessPage;
