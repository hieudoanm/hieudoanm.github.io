'use client';

import { useRouter } from 'next/navigation';
import { RockPaperScissors } from '@hieudoanm.github.io/components/routes/games/arcade/RockPaperScissors';

const GamesArcadeRps = () => {
  const router = useRouter();
  return <RockPaperScissors onClose={() => router.push('/games/arcade')} />;
};

export default GamesArcadeRps;
