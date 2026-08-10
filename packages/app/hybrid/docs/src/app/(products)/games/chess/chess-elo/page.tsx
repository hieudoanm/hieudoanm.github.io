'use client';

import { useRouter } from 'next/navigation';
import { ChessElo } from '@hieudoanm.github.io/components/routes/games/chess/ChessElo';

const GamesChessChessElo = () => {
  const router = useRouter();
  return <ChessElo onClose={() => router.push('/games/chess')} />;
};

export default GamesChessChessElo;
