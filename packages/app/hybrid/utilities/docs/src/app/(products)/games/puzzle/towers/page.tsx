'use client';

import { useRouter } from 'next/navigation';
import { Towers } from '@hieudoanm.github.io/components/routes/games/puzzle/Towers';

const GamesPuzzleTowers = () => {
  const router = useRouter();
  return <Towers onClose={() => router.push('/games/puzzle')} />;
};

export default GamesPuzzleTowers;
