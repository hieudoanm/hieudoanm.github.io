'use client';

import { useRouter } from 'next/navigation';
import { Nurikabe } from '@hieudoanm.github.io/components/routes/games/nikoli/Nurikabe';

const GamesNikoliNurikabe = () => {
  const router = useRouter();
  return <Nurikabe onClose={() => router.push('/games/nikoli')} />;
};

export default GamesNikoliNurikabe;
