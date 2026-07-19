'use client';

import { Keno } from '@/games/keno';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Keno />
    </div>
  );
};

export default Page;
