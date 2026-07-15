'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Sudoku } from '@hieudoanm.github.io/components/pages/games/puzzle/Sudoku';

const GamesPuzzleSudoku = () => {
  return <ToolPage Component={Sudoku} backPath="/games/puzzle" />;
};
export default GamesPuzzleSudoku;
