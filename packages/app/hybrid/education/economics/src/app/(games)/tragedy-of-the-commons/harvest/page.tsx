'use client';

import Link from 'next/link';
import type { NextPage } from 'next';
import { CommonsHarvest } from '@/games/commons';

const HarvestPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/tragedy-of-the-commons"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Commons Harvest
    </h1>
    <CommonsHarvest />
  </div>
);

export default HarvestPage;
