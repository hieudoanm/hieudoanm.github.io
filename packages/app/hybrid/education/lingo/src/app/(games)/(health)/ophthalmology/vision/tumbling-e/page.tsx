'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { TumblingEChart } from '@/games/ophthalmology/tumbling-e';

const TumblingEPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/ophthalmology/vision"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Tumbling E Chart
    </h1>
    <TumblingEChart />
  </div>
);

export default TumblingEPage;
