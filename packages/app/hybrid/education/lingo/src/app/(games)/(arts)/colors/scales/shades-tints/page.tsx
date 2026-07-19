'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ShadesTints } from '@/games/colors/shades-tints';
import { DEFAULT_BASE_COLOR } from '@/games/colors/shared/ColorsTool';

const ShadesTintsPage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/scales" className="btn btn-ghost btn-sm self-start">
      ← Back to Color Scales
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Shades & Tints
    </h1>
    <div className="w-full max-w-3xl">
      <ShadesTints baseColor={DEFAULT_BASE_COLOR} />
    </div>
  </main>
);

export default ShadesTintsPage;
