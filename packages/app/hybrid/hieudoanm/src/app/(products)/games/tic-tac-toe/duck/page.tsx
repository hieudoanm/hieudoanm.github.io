'use client';

import { useRouter } from 'next/navigation';
import { Duck } from '@hieudoanm.github.io/components/routes/games/tic-tac-toe/Duck';

const GamesTicTacToeDuck = () => {
  const router = useRouter();
  return <Duck onClose={() => router.push('/games/tic-tac-toe')} />;
};

export default GamesTicTacToeDuck;
