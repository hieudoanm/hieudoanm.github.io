'use client';

import { useRouter } from 'next/navigation';
import { DinoRun } from '@hieudoanm.github.io/components/routes/games/arcade/DinoRun';

const GamesArcadeDinoRun = () => {
  const router = useRouter();
  return <DinoRun onClose={() => router.push('/games/arcade')} />;
};

export default GamesArcadeDinoRun;
