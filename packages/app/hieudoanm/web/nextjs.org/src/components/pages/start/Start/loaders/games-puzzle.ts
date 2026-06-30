import { ComponentType } from 'react';

const loadGame2048 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-puzzle/Game2048Modal').then(
    (m) => ({ default: m.Game2048Modal })
  );

const loadLightsOut = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-puzzle/LightsOutModal').then(
    (m) => ({ default: m.LightsOutModal })
  );

const loadMaze = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-puzzle/MazeModal').then(
    (m) => ({ default: m.MazeModal })
  );

const loadSlidingPuzzle = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-puzzle/SlidingPuzzleModal').then(
    (m) => ({ default: m.SlidingPuzzleModal })
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
  'lights-out': loadLightsOut,
  maze: loadMaze,
  'sliding-puzzle': loadSlidingPuzzle,
  sudoku: loadSudoku,
  towers: loadTowers,
};
