export const GRID_SIZE = 5;

export const PAR_MOVES = 8;

export const PUZZLE_MOVES = 8;

export const AUTO_SOLVE_DELAY = 200;

export const DIFFICULTIES = [
  { size: 4, moves: 6, label: 'Gentle' },
  { size: 5, moves: 8, label: 'Standard' },
  { size: 6, moves: 10, label: 'Demanding' },
] as const;

export const DIFFICULTY_STEPS = DIFFICULTIES.map((difficulty) => ({
  size: difficulty.size,
  moves: difficulty.moves,
  label: difficulty.label,
}));

export const initialDifficulty = DIFFICULTY_STEPS[1];
