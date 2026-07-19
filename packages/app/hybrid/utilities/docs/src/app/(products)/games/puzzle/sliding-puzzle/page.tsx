'use client';

import { useRouter } from 'next/navigation';
import { SlidingPuzzle } from '@hieudoanm.github.io/components/routes/games/puzzle/SlidingPuzzle';

const GamesPuzzleSlidingPuzzle = () => {
  const router = useRouter();
  return <SlidingPuzzle onClose={() => router.push('/games/puzzle')} />;
};

export default GamesPuzzleSlidingPuzzle;
