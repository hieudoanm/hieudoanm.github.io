'use client';

import { War } from '@/games/war';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <War />
    </div>
  );
};

export default Page;
