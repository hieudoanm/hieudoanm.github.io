'use client';

import { BeckDepressionInventory } from '@/games/psychology/BeckDepressionInventory';
import { NextPage } from 'next';

const BeckDepressionInventoryPage: NextPage = () => (
  <main className="mx-auto w-full max-w-2xl flex-1 p-6">
    <BeckDepressionInventory />
  </main>
);

export default BeckDepressionInventoryPage;
