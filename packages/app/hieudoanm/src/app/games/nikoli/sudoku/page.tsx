'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Sudoku } from '@hieudoanm.github.io/components/pages/games/nikoli/Sudoku';

const GamesNikoliSudoku = () => {
  return <ToolPage Component={Sudoku} backPath="/games/nikoli" />;
};
export default GamesNikoliSudoku;
