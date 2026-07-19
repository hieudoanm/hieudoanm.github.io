'use client';

import { useRouter } from 'next/navigation';
import { Wordle } from '@hieudoanm.github.io/components/routes/games/word/Wordle';

const GamesWordWordle = () => {
  const router = useRouter();
  return <Wordle onClose={() => router.push('/games/word')} />;
};

export default GamesWordWordle;
