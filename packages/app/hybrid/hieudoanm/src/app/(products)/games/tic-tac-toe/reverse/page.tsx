'use client';

import { useRouter } from 'next/navigation';
import { Reverse } from '@hieudoanm.github.io/components/routes/games/tic-tac-toe/Reverse';

const GamesTicTacToeReverse = () => {
  const router = useRouter();
  return <Reverse onClose={() => router.push('/games/tic-tac-toe')} />;
};

export default GamesTicTacToeReverse;
