'use client';

import { useRouter } from 'next/navigation';
import { Pi } from '@hieudoanm.github.io/components/routes/games/memory/PiNumber';

const GamesMemoryPi = () => {
  const router = useRouter();
  return <Pi onClose={() => router.push('/games/memory')} />;
};

export default GamesMemoryPi;
