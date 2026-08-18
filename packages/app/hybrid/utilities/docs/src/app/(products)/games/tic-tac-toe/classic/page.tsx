'use client';

import { useRouter } from 'next/navigation';
import { Classic } from '@hieudoanm.github.io/components/routes/games/tic-tac-toe/Classic';

const GamesTicTacToeClassic = () => {
  const router = useRouter();
  return <Classic onClose={() => router.push('/games/tic-tac-toe')} />;
};

export default GamesTicTacToeClassic;
