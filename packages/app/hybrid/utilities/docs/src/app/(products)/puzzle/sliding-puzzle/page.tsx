'use client';

import { useRouter } from 'next/navigation';
import { SlidingPuzzle } from '@hieudoanm.github.io/components/routes/apps/puzzle/SlidingPuzzle';

const GamesPuzzleSlidingPuzzle = () => {
  const router = useRouter();
  return <SlidingPuzzle onClose={() => router.push('/puzzle')} />;
};

export default GamesPuzzleSlidingPuzzle;
