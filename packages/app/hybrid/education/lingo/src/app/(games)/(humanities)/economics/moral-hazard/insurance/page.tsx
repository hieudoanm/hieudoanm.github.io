'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { MoralHazardGame } from '@/games/economics/moral-hazard';

const InsurancePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/moral-hazard"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Hidden Effort
    </h1>
    <MoralHazardGame />
  </div>
);

export default InsurancePage;
