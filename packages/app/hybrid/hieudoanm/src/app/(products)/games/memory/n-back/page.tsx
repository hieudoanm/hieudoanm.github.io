'use client';

import { useRouter } from 'next/navigation';
import { NBack } from '@hieudoanm.github.io/components/routes/games/memory/NBack';

const GamesMemoryNBack = () => {
  const router = useRouter();
  return <NBack onClose={() => router.push('/games/memory')} />;
};

export default GamesMemoryNBack;
