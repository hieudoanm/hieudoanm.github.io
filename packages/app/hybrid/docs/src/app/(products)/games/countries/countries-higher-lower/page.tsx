'use client';

import { useRouter } from 'next/navigation';
import { HigherOrLower } from '@hieudoanm.github.io/components/routes/games/countries/HigherOrLower';

const GamesCountriesCountriesHigherLower = () => {
  const router = useRouter();
  return <HigherOrLower onClose={() => router.push('/games/countries')} />;
};

export default GamesCountriesCountriesHigherLower;
