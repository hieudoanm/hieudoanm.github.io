'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { ChessElo } from '@hieudoanm.github.io/components/pages/games/chess/ChessElo';

const GamesChessChessElo = () => {
  return <ToolPage Component={ChessElo} backPath="/games/chess" />;
};
export default GamesChessChessElo;
