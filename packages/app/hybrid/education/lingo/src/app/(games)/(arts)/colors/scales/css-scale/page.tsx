'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { CssScaleExporter } from '@/games/colors/css-scale';
import { DEFAULT_BASE_COLOR } from '@/games/colors/shared/ColorsTool';

const CssScalePage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/scales" className="btn btn-ghost btn-sm self-start">
      ← Back to Color Scales
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      CSS Scale Exporter
    </h1>
    <div className="w-full max-w-3xl">
      <CssScaleExporter baseColor={DEFAULT_BASE_COLOR} />
    </div>
  </main>
);

export default CssScalePage;
