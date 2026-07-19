'use client';

import { useRouter } from 'next/navigation';
import { Pokedex } from '@hieudoanm.github.io/components/routes/apps/trivia/Pokedex';

const GamesTriviaPokedex = () => {
  const router = useRouter();
  return <Pokedex onClose={() => router.push('/trivia')} />;
};

export default GamesTriviaPokedex;
