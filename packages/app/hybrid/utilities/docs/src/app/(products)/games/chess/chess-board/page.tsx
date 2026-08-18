'use client';

import { useRouter } from 'next/navigation';
import { ChessBoard } from '@hieudoanm.github.io/components/routes/games/chess/ChessBoard';

const GamesChessChessBoard = () => {
  const router = useRouter();
  return <ChessBoard onClose={() => router.push('/games/chess')} />;
};

export default GamesChessChessBoard;
