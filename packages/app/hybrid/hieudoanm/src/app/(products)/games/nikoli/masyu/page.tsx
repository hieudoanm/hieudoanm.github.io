'use client';

import { useRouter } from 'next/navigation';
import { Masyu } from '@hieudoanm.github.io/components/routes/games/nikoli/Masyu';

const GamesNikoliMasyu = () => {
  const router = useRouter();
  return <Masyu onClose={() => router.push('/games/nikoli')} />;
};

export default GamesNikoliMasyu;
