'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ColorTemperature } from '@/games/arts/colors/temperature';
import { DEFAULT_BASE_COLOR } from '@/games/arts/colors/shared/ColorsTool';

const TemperaturePage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/perception" className="btn btn-ghost btn-sm self-start">
      ← Back to Color & Perception
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Color Temperature
    </h1>
    <div className="w-full max-w-3xl">
      <ColorTemperature baseColor={DEFAULT_BASE_COLOR} />
    </div>
  </main>
);

export default TemperaturePage;
