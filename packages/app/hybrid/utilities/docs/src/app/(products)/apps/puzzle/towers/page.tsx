'use client';

import { useRouter } from 'next/navigation';
import { Towers } from '@hieudoanm.github.io/components/routes/apps/puzzle/Towers';

const GamesPuzzleTowers = () => {
  const router = useRouter();
  return <Towers onClose={() => router.push('/apps/puzzle')} />;
};

export default GamesPuzzleTowers;
