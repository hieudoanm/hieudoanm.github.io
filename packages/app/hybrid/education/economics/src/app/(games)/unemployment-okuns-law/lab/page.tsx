'use client';

import Link from 'next/link';
import type { NextPage } from 'next';
import { OkunLab } from '@/games/okuns';

const OkunLabPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/unemployment-okuns-law"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Okun&rsquo;s Law Lab
    </h1>
    <OkunLab />
  </div>
);

export default OkunLabPage;
