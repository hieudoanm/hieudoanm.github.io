'use client';

import { CardCounter } from '@/games/card-counter';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <CardCounter />
    </div>
  );
};

export default Page;
