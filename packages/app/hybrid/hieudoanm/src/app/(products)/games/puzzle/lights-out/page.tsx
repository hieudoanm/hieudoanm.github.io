'use client';

import { useRouter } from 'next/navigation';
import { LightsOut } from '@hieudoanm.github.io/components/routes/games/puzzle/LightsOut';

const GamesPuzzleLightsOut = () => {
  const router = useRouter();
  return <LightsOut onClose={() => router.push('/games/puzzle')} />;
};

export default GamesPuzzleLightsOut;
