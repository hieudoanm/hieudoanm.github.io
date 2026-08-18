'use client';

import { useRouter } from 'next/navigation';
import { MemoryMatch } from '@hieudoanm.github.io/components/routes/games/memory/MemoryMatch';

const GamesMemoryMemoryMatch = () => {
  const router = useRouter();
  return <MemoryMatch onClose={() => router.push('/games/memory')} />;
};

export default GamesMemoryMemoryMatch;
