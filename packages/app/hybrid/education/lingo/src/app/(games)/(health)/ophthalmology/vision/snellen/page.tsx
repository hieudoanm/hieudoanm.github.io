'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { SnellenChart } from '@/games/ophthalmology/snellen';

const SnellenPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/ophthalmology/vision"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Snellen Chart
    </h1>
    <SnellenChart />
  </div>
);

export default SnellenPage;
