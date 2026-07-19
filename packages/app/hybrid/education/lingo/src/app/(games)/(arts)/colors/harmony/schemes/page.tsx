'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ColorSchemes } from '@/games/colors/schemes';
import { DEFAULT_BASE_COLOR } from '@/games/colors/shared/ColorsTool';

const SchemesPage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/harmony" className="btn btn-ghost btn-sm self-start">
      ← Back to Color Harmony
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Color Schemes
    </h1>
    <div className="w-full max-w-3xl">
      <ColorSchemes baseColor={DEFAULT_BASE_COLOR} />
    </div>
  </main>
);

export default SchemesPage;
