'use client';

import { useRouter } from 'next/navigation';
import { Game2048 } from '@hieudoanm.github.io/components/routes/apps/puzzle/Game2048';

const GamesPuzzleGame2048 = () => {
  const router = useRouter();
  return <Game2048 onClose={() => router.push('/apps/puzzle')} />;
};

export default GamesPuzzleGame2048;
