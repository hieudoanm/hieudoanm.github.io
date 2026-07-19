'use client';

import { HiLo } from '@/games/hi-lo';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <HiLo />
    </div>
  );
};

export default Page;
