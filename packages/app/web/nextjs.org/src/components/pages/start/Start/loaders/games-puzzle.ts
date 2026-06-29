import { ComponentType } from 'react';

const loadGame2048 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-puzzle/Game2048Modal').then(
    (m) => ({ default: m.Game2048Modal })
  );

const loadSudoku = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-puzzle/SudokuModal').then(
    (m) => ({ default: m.SudokuModal })
  );

const loadTowers = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-puzzle/TowersModal').then(
    (m) => ({ default: m.TowersModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  game2048: loadGame2048,
  sudoku: loadSudoku,
  towers: loadTowers,
};
