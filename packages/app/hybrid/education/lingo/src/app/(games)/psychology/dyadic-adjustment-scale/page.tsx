'use client';

import { DyadicAdjustmentScale } from '@/games/psychology/DyadicAdjustmentScale';
import { NextPage } from 'next';

const DyadicAdjustmentScalePage: NextPage = () => (
  <main className="mx-auto w-full max-w-2xl flex-1 p-6">
    <DyadicAdjustmentScale />
  </main>
);

export default DyadicAdjustmentScalePage;
