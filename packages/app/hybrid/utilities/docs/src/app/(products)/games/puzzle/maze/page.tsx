'use client';

import { useRouter } from 'next/navigation';
import { Maze } from '@hieudoanm.github.io/components/routes/games/puzzle/Maze';

const GamesPuzzleMaze = () => {
  const router = useRouter();
  return <Maze onClose={() => router.push('/games/puzzle')} />;
};

export default GamesPuzzleMaze;
