'use client';

import { NextPage } from 'next';

import { Shikaku } from '@/games/nikoli/Shikaku';

const ShikakuPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Shikaku />
    </div>
  );
};

export default ShikakuPage;
