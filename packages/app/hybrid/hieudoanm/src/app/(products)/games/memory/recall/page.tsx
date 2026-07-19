'use client';

import { useRouter } from 'next/navigation';
import { Recall } from '@hieudoanm.github.io/components/routes/games/memory/Recall';

const GamesMemoryRecall = () => {
  const router = useRouter();
  return <Recall onClose={() => router.push('/games/memory')} />;
};

export default GamesMemoryRecall;
