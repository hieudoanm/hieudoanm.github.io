'use client';

import { useRouter } from 'next/navigation';
import { PrisonerDilemma } from '@hieudoanm.github.io/components/routes/games/trivia/PrisonerDilemma';

const GamesTriviaPd = () => {
  const router = useRouter();
  return <PrisonerDilemma onClose={() => router.push('/games/trivia')} />;
};

export default GamesTriviaPd;
