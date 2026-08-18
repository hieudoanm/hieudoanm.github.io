'use client';

import { useRouter } from 'next/navigation';
import { SlotMachine } from '@hieudoanm.github.io/components/routes/games/casino/SlotMachine';

const GamesCasinoSlotMachine = () => {
  const router = useRouter();
  return <SlotMachine onClose={() => router.push('/games/casino')} />;
};

export default GamesCasinoSlotMachine;
