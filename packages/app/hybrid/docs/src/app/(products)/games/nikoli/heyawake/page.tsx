'use client';

import { useRouter } from 'next/navigation';
import { Heyawake } from '@hieudoanm.github.io/components/routes/games/nikoli/Heyawake';

const GamesNikoliHeyawake = () => {
  const router = useRouter();
  return <Heyawake onClose={() => router.push('/games/nikoli')} />;
};

export default GamesNikoliHeyawake;
