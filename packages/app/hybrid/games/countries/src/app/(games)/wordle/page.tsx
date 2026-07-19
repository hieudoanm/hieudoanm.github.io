'use client';

import { Wordle } from '@/games/wordle';
import { NextPage } from 'next';

const WordlePage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Wordle />
    </div>
  );
};

export default WordlePage;
