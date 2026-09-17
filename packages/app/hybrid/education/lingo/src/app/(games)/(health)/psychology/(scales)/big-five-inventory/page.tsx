'use client';

import { BigFiveInventory } from '@/games/health/psychology/BigFiveInventory';
import { NextPage } from 'next';

const BigFiveInventoryPage: NextPage = () => (
  <main className="mx-auto w-full max-w-2xl flex-1 p-6">
    <BigFiveInventory />
  </main>
);

export default BigFiveInventoryPage;
