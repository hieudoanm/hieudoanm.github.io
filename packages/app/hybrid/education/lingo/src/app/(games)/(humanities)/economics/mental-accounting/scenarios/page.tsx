'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { MentalAccountingGame } from '@/games/economics/mental-accounting';

const MentalAccountingScenariosPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/mental-accounting"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Mental Accounting Game
    </h1>
    <MentalAccountingGame />
  </div>
);

export default MentalAccountingScenariosPage;
