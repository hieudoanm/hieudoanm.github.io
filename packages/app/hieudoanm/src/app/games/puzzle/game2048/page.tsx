'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Game2048 } from '@hieudoanm.github.io/components/pages/games/puzzle/Game2048';

const GamesPuzzleGame2048 = () => {
  return <ToolPage Component={Game2048} backPath="/games/puzzle" />;
};
export default GamesPuzzleGame2048;
