'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { ChessClock } from '@hieudoanm.github.io/components/pages/games/chess/ChessClock';

const GamesChessChessClock = () => {
  return <ToolPage Component={ChessClock} backPath="/games/chess" />;
};
export default GamesChessChessClock;
