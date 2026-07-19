'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { Keno } from '@/games/stem/maths/probability/keno';

const KenoPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/maths/probability"
      className="text-primary text-sm hover:underline">
      ← Back to Probability
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">Keno</h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Pick up to five spots from eighty and reach for a 700× multiplier.
    </p>
    <Keno />
  </div>
);

export default KenoPage;
