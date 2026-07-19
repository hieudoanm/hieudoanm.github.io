'use client';

import { useRouter } from 'next/navigation';
import { Poker } from '@hieudoanm.github.io/components/routes/games/casino/Poker';

const GamesCasinoPoker = () => {
  const router = useRouter();
  return <Poker onClose={() => router.push('/games/casino')} />;
};

export default GamesCasinoPoker;
