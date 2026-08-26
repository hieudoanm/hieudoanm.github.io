'use client';

import { useRouter } from 'next/navigation';
import { Quizify } from '@hieudoanm.github.io/components/routes/games/trivia/Quizify';

const GamesTriviaQuizify = () => {
  const router = useRouter();
  return <Quizify onClose={() => router.push('/games/trivia')} />;
};

export default GamesTriviaQuizify;
