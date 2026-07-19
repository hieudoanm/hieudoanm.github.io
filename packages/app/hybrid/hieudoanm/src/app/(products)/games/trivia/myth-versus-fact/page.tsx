'use client';

import { useRouter } from 'next/navigation';
import { MythVersusFact } from '@hieudoanm.github.io/components/routes/games/trivia/MythVersusFact';

const GamesTriviaMythVersusFact = () => {
  const router = useRouter();
  return <MythVersusFact onClose={() => router.push('/games/trivia')} />;
};

export default GamesTriviaMythVersusFact;
