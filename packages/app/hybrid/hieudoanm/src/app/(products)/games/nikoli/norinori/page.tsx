'use client';

import { useRouter } from 'next/navigation';
import { Norinori } from '@hieudoanm.github.io/components/routes/games/nikoli/Norinori';

const GamesNikoliNorinori = () => {
  const router = useRouter();
  return <Norinori onClose={() => router.push('/games/nikoli')} />;
};

export default GamesNikoliNorinori;
