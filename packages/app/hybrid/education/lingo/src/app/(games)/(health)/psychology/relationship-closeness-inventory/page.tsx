'use client';

import { RelationshipClosenessInventory } from '@/games/health/psychology/RelationshipClosenessInventory';
import { NextPage } from 'next';

const RelationshipClosenessInventoryPage: NextPage = () => (
  <main className="mx-auto w-full max-w-2xl flex-1 p-6">
    <RelationshipClosenessInventory />
  </main>
);

export default RelationshipClosenessInventoryPage;
