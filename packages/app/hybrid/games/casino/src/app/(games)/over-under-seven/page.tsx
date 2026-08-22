'use client';

import { OverUnderSeven } from '@/games/over-under-seven';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <OverUnderSeven />
    </div>
  );
};

export default Page;
