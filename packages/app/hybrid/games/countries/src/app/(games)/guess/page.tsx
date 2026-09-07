'use client';

import { Guess } from '@/games/guess';
import { NextPage } from 'next';

const GuessPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Guess />
    </div>
  );
};

export default GuessPage;
