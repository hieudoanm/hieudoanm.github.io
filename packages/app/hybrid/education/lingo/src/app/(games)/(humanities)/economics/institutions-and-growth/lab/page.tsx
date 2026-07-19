'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { InstitutionsGame } from '@/games/economics/institutions';

const InstitutionsLabPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/institutions-and-growth"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Institutions Game
    </h1>
    <InstitutionsGame />
  </div>
);

export default InstitutionsLabPage;
