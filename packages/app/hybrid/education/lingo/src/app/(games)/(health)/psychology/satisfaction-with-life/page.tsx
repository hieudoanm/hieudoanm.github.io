'use client';

import { SatisfactionWithLifeScale } from '@/games/psychology/SatisfactionWithLifeScale';
import { NextPage } from 'next';

const SatisfactionWithLifeScalePage: NextPage = () => (
  <main className="mx-auto w-full max-w-2xl flex-1 p-6">
    <SatisfactionWithLifeScale />
  </main>
);

export default SatisfactionWithLifeScalePage;
