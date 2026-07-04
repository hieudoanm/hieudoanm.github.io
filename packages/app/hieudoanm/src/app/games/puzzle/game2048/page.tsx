'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Game2048Modal } from '@hieudoanm.github.io/components/pages/games/puzzle/Game2048Modal';

const GamesPuzzleGame2048 = () => {
  return <ToolPage Component={Game2048Modal} backPath="/games/puzzle" />;
};
export default GamesPuzzleGame2048;
