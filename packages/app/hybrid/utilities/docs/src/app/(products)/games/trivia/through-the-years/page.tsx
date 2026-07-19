'use client';

import { useRouter } from 'next/navigation';
import { ThroughTheYears } from '@hieudoanm.github.io/components/routes/games/trivia/ThroughTheYears';

const GamesTriviaThroughTheYears = () => {
  const router = useRouter();
  return <ThroughTheYears onClose={() => router.push('/games/trivia')} />;
};

export default GamesTriviaThroughTheYears;
