'use client';

import { useRouter } from 'next/navigation';
import { FlagGuesser } from '@hieudoanm.github.io/components/routes/games/countries/FlagGuesser';

const GamesCountriesFlagGuesser = () => {
  const router = useRouter();
  return <FlagGuesser onClose={() => router.push('/games/countries')} />;
};

export default GamesCountriesFlagGuesser;
