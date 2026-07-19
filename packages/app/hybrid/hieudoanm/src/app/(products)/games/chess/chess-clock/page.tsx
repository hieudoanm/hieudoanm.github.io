'use client';

import { useRouter } from 'next/navigation';
import { ChessClock } from '@hieudoanm.github.io/components/routes/games/chess/ChessClock';

const GamesChessChessClock = () => {
  const router = useRouter();
  return <ChessClock onClose={() => router.push('/games/chess')} />;
};

export default GamesChessChessClock;
