'use client';

import { useRouter } from 'next/navigation';
import { Pokedex } from '@hieudoanm.github.io/components/routes/games/trivia/Pokedex';

const GamesTriviaPokedex = () => {
  const router = useRouter();
  return <Pokedex onClose={() => router.push('/games/trivia')} />;
};

export default GamesTriviaPokedex;
