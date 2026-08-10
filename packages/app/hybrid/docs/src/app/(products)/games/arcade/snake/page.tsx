'use client';

import { useRouter } from 'next/navigation';
import { Snake } from '@hieudoanm.github.io/components/routes/games/arcade/Snake';

const GamesArcadeSnake = () => {
  const router = useRouter();
  return <Snake onClose={() => router.push('/games/arcade')} />;
};

export default GamesArcadeSnake;
