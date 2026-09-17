import { GAMES } from './constants';
import type { Cell, Game, GameId, PayoffPair, Review, Strategy } from './types';

const rand = (min: number, max: number): number =>
  Math.round(min + Math.random() * (max - min));

const randPair = (): PayoffPair => [rand(-2, 4), rand(-2, 4)];

const LABEL_POOLS = [
  ['High', 'Low'],
  ['Enter', 'Stay Out'],
  ['Fast', 'Slow'],
  ['Attack', 'Wait'],
] as const;

export const gameById = (id: GameId): Game | undefined =>
  GAMES.find((g) => g.id === id);

export const payoffAt = (game: Game, row: number, col: number): PayoffPair =>
  game.payoffs[row][col];

export const randomGame = (): Game => {
  const pool = LABEL_POOLS[rand(0, LABEL_POOLS.length - 1)];
  const rowStrategies: [Strategy, Strategy] = [
    { id: pool[0].toLowerCase(), label: pool[0] },
    { id: pool[1].toLowerCase(), label: pool[1] },
  ];
  return {
    id: 'challenge',
    name: 'Random Challenge',
    note: 'Randomized payoffs — find the Nash equilibrium, if one exists.',
    rowStrategies,
    colStrategies: rowStrategies,
    payoffs: [
      [randPair(), randPair()],
      [randPair(), randPair()],
    ],
  };
};

export const rowBestResponses = (game: Game, col: number): number[] => {
  const best = Math.max(game.payoffs[0][col][0], game.payoffs[1][col][0]);
  return [0, 1].filter((r) => game.payoffs[r][col][0] === best);
};

export const colBestResponses = (game: Game, row: number): number[] => {
  const best = Math.max(game.payoffs[row][0][1], game.payoffs[row][1][1]);
  return [0, 1].filter((c) => game.payoffs[row][c][1] === best);
};

export const findNash = (game: Game): Cell[] => {
  const cells: Cell[] = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      const rowBest = rowBestResponses(game, col);
      const colBest = colBestResponses(game, row);
      if (rowBest.includes(row) && colBest.includes(col)) {
        cells.push({ row, col });
      }
    }
  }
  return cells;
};

export const hasPureNash = (game: Game): boolean => findNash(game).length > 0;

export const isCellNash = (game: Game, row: number, col: number): boolean =>
  findNash(game).some((c) => c.row === row && c.col === col);

export const dominantStrategy = (
  game: Game,
  player: 'row' | 'col',
  index: number
): boolean => {
  const other = index === 0 ? 1 : 0;
  if (player === 'row') {
    return (
      game.payoffs[index][0][0] > game.payoffs[other][0][0] &&
      game.payoffs[index][1][0] > game.payoffs[other][1][0]
    );
  }
  return (
    game.payoffs[0][index][1] > game.payoffs[0][other][1] &&
    game.payoffs[1][index][1] > game.payoffs[1][other][1]
  );
};

export const dominantStrategyOf = (
  game: Game,
  player: 'row' | 'col'
): Strategy | null => {
  const strategies = player === 'row' ? game.rowStrategies : game.colStrategies;
  if (dominantStrategy(game, player, 0)) return strategies[0];
  if (dominantStrategy(game, player, 1)) return strategies[1];
  return null;
};

export const buildReview = (game: Game, row: number, col: number): Review => {
  const [payoffA, payoffB] = payoffAt(game, row, col);
  const nash = findNash(game);
  return {
    cell: { row, col },
    payoffA,
    payoffB,
    rowBestToCol: { row: rowBestResponses(game, col)[0], col },
    colBestToRow: { row, col: colBestResponses(game, row)[0] },
    rowBestIsOwn: rowBestResponses(game, col).includes(row),
    colBestIsOwn: colBestResponses(game, row).includes(col),
    rowDominant: dominantStrategyOf(game, 'row'),
    colDominant: dominantStrategyOf(game, 'col'),
    nash,
    nashCount: nash.length,
    isNash: isCellNash(game, row, col),
  };
};

export const cellLabel = (game: Game, row: number, col: number): string =>
  `(${game.rowStrategies[row].label}, ${game.colStrategies[col].label})`;

export const nashSummary = (game: Game, nash: Cell[]): string => {
  if (nash.length === 0) {
    return 'There is no pure-strategy Nash equilibrium: the players must randomize.';
  }
  const list = nash
    .map((cell) => cellLabel(game, cell.row, cell.col))
    .join(' and ');
  const intro =
    nash.length === 1
      ? 'There is one pure-strategy Nash equilibrium'
      : 'There are two pure-strategy Nash equilibria';
  return `${intro}: ${list}.`;
};

export const dominantSummary = (review: Review, game: Game): string => {
  const parts: string[] = [];
  if (review.rowDominant) {
    parts.push(`Row's dominant strategy is ${review.rowDominant.label}.`);
  }
  if (review.colDominant) {
    parts.push(`Col's dominant strategy is ${review.colDominant.label}.`);
  }
  return parts.length > 0
    ? parts.join(' ')
    : 'Neither player has a dominant strategy.';
};

export const bestResponseSummary = (review: Review, game: Game): string => {
  const colLabel = game.colStrategies[review.cell.col].label;
  const own = game.rowStrategies[review.cell.row].label;
  if (review.rowBestIsOwn) {
    return `Given Col's ${colLabel}, Row's ${own} is a best response.`;
  }
  const best = game.rowStrategies[review.rowBestToCol.row].label;
  return `Given Col's ${colLabel}, Row's best response is ${best}, not ${own}.`;
};

export const quizFeedback = (game: Game, cell: Cell): string => {
  if (!hasPureNash(game)) {
    return 'No cell here is a pure-strategy Nash equilibrium: players must randomize.';
  }
  const label = cellLabel(game, cell.row, cell.col);
  return isCellNash(game, cell.row, cell.col)
    ? `Correct — ${label} is a pure-strategy Nash equilibrium.`
    : `${label} is not a pure-strategy Nash equilibrium; someone can deviate to improve.`;
};
