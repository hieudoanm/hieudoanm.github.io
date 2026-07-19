'use client';

import { useRouter } from 'next/navigation';
import { Blackjack } from '@hieudoanm.github.io/components/routes/games/casino/Blackjack';

const GamesCasinoBlackjack = () => {
  const router = useRouter();
  return <Blackjack onClose={() => router.push('/games/casino')} />;
};

export default GamesCasinoBlackjack;
