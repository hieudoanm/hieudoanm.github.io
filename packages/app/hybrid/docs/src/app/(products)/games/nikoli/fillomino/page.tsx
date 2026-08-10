'use client';

import { useRouter } from 'next/navigation';
import { Fillomino } from '@hieudoanm.github.io/components/routes/games/nikoli/Fillomino';

const GamesNikoliFillomino = () => {
  const router = useRouter();
  return <Fillomino onClose={() => router.push('/games/nikoli')} />;
};

export default GamesNikoliFillomino;
