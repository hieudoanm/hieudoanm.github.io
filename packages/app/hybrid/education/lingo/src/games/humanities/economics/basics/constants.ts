import type { Game, GameId, Strategy } from './types';

export const CHALLENGE_ID = 'challenge';

export const GAME_IDS: GameId[] = [
  'pd',
  'stag-hunt',
  'chicken',
  'coordination',
  'matching-pennies',
  'harmony',
];

export const pair = (a: number, b: number): [number, number] => [a, b];

export const s = (label: string): Strategy => ({
  id: label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  label,
});

export const GAMES: Game[] = [
  {
    id: 'pd',
    name: "Prisoner's Dilemma",
    note: 'Defect is dominant for both, even though both prefer Cooperate.',
    rowStrategies: [s('Cooperate'), s('Defect')],
    colStrategies: [s('Cooperate'), s('Defect')],
    payoffs: [
      [pair(3, 3), pair(0, 5)],
      [pair(5, 0), pair(1, 1)],
    ],
  },
  {
    id: 'stag-hunt',
    name: 'Stag Hunt',
    note: 'Coordination risk: Stag pays more, but only if Col also hunts Stag.',
    rowStrategies: [s('Stag'), s('Hare')],
    colStrategies: [s('Stag'), s('Hare')],
    payoffs: [
      [pair(4, 4), pair(0, 3)],
      [pair(3, 0), pair(3, 3)],
    ],
  },
  {
    id: 'chicken',
    name: 'Chicken',
    note: 'Bravely swerving loses face; both daring ends in a crash.',
    rowStrategies: [s('Swerve'), s('Dare')],
    colStrategies: [s('Swerve'), s('Dare')],
    payoffs: [
      [pair(0, 0), pair(-1, 1)],
      [pair(1, -1), pair(-10, -10)],
    ],
  },
  {
    id: 'coordination',
    name: 'Coordination',
    note: 'Mismatched choices pay nothing; both prefer coordinating on Left.',
    rowStrategies: [s('Left'), s('Right')],
    colStrategies: [s('Left'), s('Right')],
    payoffs: [
      [pair(2, 2), pair(0, 0)],
      [pair(0, 0), pair(1, 1)],
    ],
  },
  {
    id: 'matching-pennies',
    name: 'Matching Pennies',
    note: 'A zero-sum game: any pure strategy is exploitable, so play is mixed.',
    rowStrategies: [s('Heads'), s('Tails')],
    colStrategies: [s('Heads'), s('Tails')],
    payoffs: [
      [pair(1, -1), pair(-1, 1)],
      [pair(-1, 1), pair(1, -1)],
    ],
  },
  {
    id: 'harmony',
    name: 'Harmony',
    note: 'Cooperate dominates for both players, so the outcome is never in doubt.',
    rowStrategies: [s('Cooperate'), s('Defect')],
    colStrategies: [s('Cooperate'), s('Defect')],
    payoffs: [
      [pair(3, 3), pair(2, 0)],
      [pair(0, 2), pair(1, 1)],
    ],
  },
];
