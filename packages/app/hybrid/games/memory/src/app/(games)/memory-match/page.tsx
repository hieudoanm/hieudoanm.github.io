'use client';

import { MemoryMatch } from '@/games/MemoryMatch';
import { NextPage } from 'next';

const MemoryMatchPage: NextPage = () => (
  <div className="flex h-full flex-col">
    <MemoryMatch onClose={() => {}} />
  </div>
);

export default MemoryMatchPage;
