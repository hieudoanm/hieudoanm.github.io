'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { SudokuModal } from '@hieudoanm.github.io/components/pages/games/puzzle/SudokuModal';

const GamesPuzzleSudoku = () => {
  return <ToolPage Component={SudokuModal} backPath="/games/puzzle" />;
};
export default GamesPuzzleSudoku;
