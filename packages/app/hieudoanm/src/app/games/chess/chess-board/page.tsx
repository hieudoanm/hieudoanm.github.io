'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { ChessBoardModal } from '@hieudoanm.github.io/components/pages/games/chess/ChessBoardModal';

const GamesChessChessBoard = () => {
  return <ToolPage Component={ChessBoardModal} backPath="/games/chess" />;
};
export default GamesChessChessBoard;
