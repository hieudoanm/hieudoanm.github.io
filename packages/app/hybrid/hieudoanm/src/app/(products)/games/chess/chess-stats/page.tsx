'use client';

import { useRouter } from 'next/navigation';
import { ChessStats } from '@hieudoanm.github.io/components/routes/games/chess/ChessStats';

const GamesChessChessStats = () => {
  const router = useRouter();
  return <ChessStats onClose={() => router.push('/games/chess')} />;
};

export default GamesChessChessStats;
