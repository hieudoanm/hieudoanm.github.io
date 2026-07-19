'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ColorWheel } from '@/games/arts/colors/wheel';
import { DEFAULT_BASE_COLOR } from '@/games/arts/colors/shared/ColorsTool';

const WheelPage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/harmony" className="btn btn-ghost btn-sm self-start">
      ← Back to Color Harmony
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Color Wheel
    </h1>
    <div className="w-full max-w-3xl">
      <ColorWheel baseColor={DEFAULT_BASE_COLOR} />
    </div>
  </main>
);

export default WheelPage;
