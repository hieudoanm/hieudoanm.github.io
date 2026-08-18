'use client';

import { useRouter } from 'next/navigation';
import { ContinentsSort } from '@hieudoanm.github.io/components/routes/games/countries/ContinentsSort';

const GamesCountriesCountriesContinentsSort = () => {
  const router = useRouter();
  return <ContinentsSort onClose={() => router.push('/games/countries')} />;
};

export default GamesCountriesCountriesContinentsSort;
