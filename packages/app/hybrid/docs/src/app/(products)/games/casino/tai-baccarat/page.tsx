'use client';

import { useRouter } from 'next/navigation';
import { Baccarat } from '@hieudoanm.github.io/components/routes/games/casino/Baccarat';

const GamesCasinoTaiBaccarat = () => {
  const router = useRouter();
  return <Baccarat onClose={() => router.push('/games/casino')} />;
};

export default GamesCasinoTaiBaccarat;
