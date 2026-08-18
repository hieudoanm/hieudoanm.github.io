'use client';

import { Roulette } from '@/games/roulette';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Roulette />
    </div>
  );
};

export default Page;
