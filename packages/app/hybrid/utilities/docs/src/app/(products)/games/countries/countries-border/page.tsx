'use client';

import { useRouter } from 'next/navigation';
import { Border } from '@hieudoanm.github.io/components/routes/games/countries/Border';

const GamesCountriesCountriesBorder = () => {
  const router = useRouter();
  return <Border onClose={() => router.push('/games/countries')} />;
};

export default GamesCountriesCountriesBorder;
