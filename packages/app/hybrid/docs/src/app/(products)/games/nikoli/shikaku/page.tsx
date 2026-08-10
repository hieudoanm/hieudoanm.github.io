'use client';

import { useRouter } from 'next/navigation';
import { Shikaku } from '@hieudoanm.github.io/components/routes/games/nikoli/Shikaku';

const GamesNikoliShikaku = () => {
  const router = useRouter();
  return <Shikaku onClose={() => router.push('/games/nikoli')} />;
};

export default GamesNikoliShikaku;
