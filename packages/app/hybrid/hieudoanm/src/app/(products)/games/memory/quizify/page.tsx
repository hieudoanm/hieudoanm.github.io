'use client';

import { useRouter } from 'next/navigation';
import { Quizify } from '@hieudoanm.github.io/components/routes/games/memory/Quizify';

const GamesMemoryQuizify = () => {
  const router = useRouter();
  return <Quizify onClose={() => router.push('/games/memory')} />;
};

export default GamesMemoryQuizify;
