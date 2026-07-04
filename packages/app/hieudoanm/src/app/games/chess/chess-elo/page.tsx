'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { ChessEloModal } from '@hieudoanm.github.io/components/pages/games/chess/ChessEloModal';

const GamesChessChessElo = () => {
  return <ToolPage Component={ChessEloModal} backPath="/games/chess" />;
};
export default GamesChessChessElo;
