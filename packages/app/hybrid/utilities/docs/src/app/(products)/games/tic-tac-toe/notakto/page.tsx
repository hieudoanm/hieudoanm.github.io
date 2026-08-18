'use client';

import { useRouter } from 'next/navigation';
import { Notakto } from '@hieudoanm.github.io/components/routes/games/tic-tac-toe/Notakto';

const GamesTicTacToeNotakto = () => {
  const router = useRouter();
  return <Notakto onClose={() => router.push('/games/tic-tac-toe')} />;
};

export default GamesTicTacToeNotakto;
