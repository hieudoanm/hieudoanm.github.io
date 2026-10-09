'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Heyawake } from '@/games/health/psychology/cognitive/reasoning/nikoli/Heyawake';

const Page: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/reasoning/nikoli"
      className="text-primary text-sm hover:underline">
      ← Back to Nikoli
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Heyawake</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Shade rooms to match clues and avoid 2×2 — local counts with global
      connectivity.
    </p>
    <Heyawake />
  </div>
);

export default Page;
