'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { ChessBoard } from '@hieudoanm.github.io/components/pages/games/chess/ChessBoard';

const GamesChessChessBoard = () => {
  return <ToolPage Component={ChessBoard} backPath="/games/chess" />;
};
export default GamesChessChessBoard;
