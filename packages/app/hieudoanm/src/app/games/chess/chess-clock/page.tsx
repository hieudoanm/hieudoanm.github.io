'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { ChessClockModal } from '@hieudoanm.github.io/components/pages/games/chess/ChessClockModal';

const GamesChessChessClock = () => {
  return <ToolPage Component={ChessClockModal} backPath="/games/chess" />;
};
export default GamesChessChessClock;
