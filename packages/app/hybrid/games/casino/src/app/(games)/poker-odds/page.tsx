'use client';

import { PokerOdds } from '@/games/poker-odds';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <PokerOdds />
    </div>
  );
};

export default Page;
