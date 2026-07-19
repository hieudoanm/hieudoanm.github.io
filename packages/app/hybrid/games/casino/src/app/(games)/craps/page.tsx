'use client';

import { Craps } from '@/games/craps';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Craps />
    </div>
  );
};

export default Page;
