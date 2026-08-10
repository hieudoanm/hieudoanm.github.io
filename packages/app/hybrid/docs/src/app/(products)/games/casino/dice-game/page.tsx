'use client';

import { useRouter } from 'next/navigation';
import { DiceGame } from '@hieudoanm.github.io/components/routes/games/casino/DiceGame';

const GamesCasinoDiceGame = () => {
  const router = useRouter();
  return <DiceGame onClose={() => router.push('/games/casino')} />;
};

export default GamesCasinoDiceGame;
