'use client';

import { SlidingPuzzle } from '@/games/puzzles/SlidingPuzzle';
import { NextPage } from 'next';

const SlidingPuzzlePage: NextPage = () => (
  <div className="flex h-full flex-col">
    <SlidingPuzzle onClose={() => {}} />
  </div>
);

export default SlidingPuzzlePage;
