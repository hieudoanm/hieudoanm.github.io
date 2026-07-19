'use client';

import { Maze } from '@/games/Maze';
import { NextPage } from 'next';

const MazePage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Maze />
    </div>
  );
};

export default MazePage;
