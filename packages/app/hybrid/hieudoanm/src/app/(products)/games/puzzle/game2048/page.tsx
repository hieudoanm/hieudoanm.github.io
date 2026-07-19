'use client';

import { useRouter } from 'next/navigation';
import { Game2048 } from '@hieudoanm.github.io/components/routes/games/puzzle/Game2048';

const GamesPuzzleGame2048 = () => {
  const router = useRouter();
  return <Game2048 onClose={() => router.push('/games/puzzle')} />;
};

export default GamesPuzzleGame2048;
