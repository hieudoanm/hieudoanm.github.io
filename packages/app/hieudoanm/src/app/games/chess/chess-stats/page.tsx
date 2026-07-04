'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { ChessStatsModal } from '@hieudoanm.github.io/components/pages/games/chess/ChessStatsModal';

const GamesChessChessStats = () => {
  return <ToolPage Component={ChessStatsModal} backPath="/games/chess" />;
};
export default GamesChessChessStats;
