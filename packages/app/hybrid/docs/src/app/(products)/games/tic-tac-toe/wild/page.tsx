'use client';

import { useRouter } from 'next/navigation';
import { Wild } from '@hieudoanm.github.io/components/routes/games/tic-tac-toe/Wild';

const GamesTicTacToeWild = () => {
  const router = useRouter();
  return <Wild onClose={() => router.push('/games/tic-tac-toe')} />;
};

export default GamesTicTacToeWild;
