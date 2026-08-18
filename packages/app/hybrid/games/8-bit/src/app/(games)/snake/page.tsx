'use client';

import { Snake } from '@/games/Snake';
import { NextPage } from 'next';

const SnakePage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Snake />
    </div>
  );
};

export default SnakePage;
