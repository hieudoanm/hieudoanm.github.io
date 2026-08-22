'use client';

import { Baccarat } from '@/games/baccarat';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Baccarat />
    </div>
  );
};

export default Page;
