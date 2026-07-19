'use client';

import { useRouter } from 'next/navigation';
import { LightsOut } from '@hieudoanm.github.io/components/routes/apps/puzzle/LightsOut';

const GamesPuzzleLightsOut = () => {
  const router = useRouter();
  return <LightsOut onClose={() => router.push('/apps/puzzle')} />;
};

export default GamesPuzzleLightsOut;
