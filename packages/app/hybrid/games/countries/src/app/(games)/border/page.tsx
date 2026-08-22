'use client';

import { Border } from '@/games/border';
import { NextPage } from 'next';

const BorderPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Border />
    </div>
  );
};

export default BorderPage;
