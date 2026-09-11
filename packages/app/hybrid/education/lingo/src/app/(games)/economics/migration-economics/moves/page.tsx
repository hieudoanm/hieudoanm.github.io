'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { MigrationGame } from '@/games/economics/migration';

const MigrationMovesPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/migration-economics"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Migration Decision Lab
    </h1>
    <MigrationGame />
  </div>
);

export default MigrationMovesPage;
