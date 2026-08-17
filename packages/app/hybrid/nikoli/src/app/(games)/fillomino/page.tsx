'use client';

import { Fillomino } from '@/games/Fillomino';
import { NextPage } from 'next';

const FillominoPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Fillomino />
    </div>
  );
};

export default FillominoPage;
