'use client';

import { useRouter } from 'next/navigation';
import { Connection } from '@hieudoanm.github.io/components/routes/games/countries/Connection';

const GamesCountriesCountriesConnection = () => {
  const router = useRouter();
  return <Connection onClose={() => router.push('/games/countries')} />;
};

export default GamesCountriesCountriesConnection;
