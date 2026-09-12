'use client';

import { Game2048 } from '@/games/puzzles/Game2048';
import { NextPage } from 'next';

const Game2048Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <Game2048 onClose={() => {}} />
  </div>
);

export default Game2048Page;
