'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ColorsTool } from '@/games/arts/colors/shared/ColorsTool';

const ThemePage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/css" className="btn btn-ghost btn-sm self-start">
      ← Back to Color in CSS
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Theme Colors
    </h1>
    <div className="w-full max-w-3xl">
      <ColorsTool />
    </div>
  </main>
);

export default ThemePage;
