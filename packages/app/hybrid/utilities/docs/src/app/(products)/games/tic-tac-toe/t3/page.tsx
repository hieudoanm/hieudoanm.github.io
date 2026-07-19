'use client';

import { useRouter } from 'next/navigation';
import { TicTacToe } from '@hieudoanm.github.io/components/routes/games/tic-tac-toe/T3';

const GamesTicTacToeT3 = () => {
  const router = useRouter();
  return <TicTacToe onClose={() => router.push('/games/tic-tac-toe')} />;
};

export default GamesTicTacToeT3;
