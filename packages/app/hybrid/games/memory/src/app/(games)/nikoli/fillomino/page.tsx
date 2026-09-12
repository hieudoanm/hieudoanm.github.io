'use client';

import { NextPage } from 'next';

import { Fillomino } from '@/games/nikoli/Fillomino';

const FillominoPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Fillomino />
    </div>
  );
};

export default FillominoPage;
