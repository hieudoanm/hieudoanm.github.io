import type { GameModule, PayoffMatrix } from './types';

export const TOTAL_PLAYS = 8;

export const GAMES: Record<GameModule, PayoffMatrix> = {
  'battle-of-the-sexes': {
    label: 'Battle of the Sexes',
    rows: ['Up', 'Down'],
    cols: ['Left', 'Right'],
    matrix: [
      [
        [3, 2],
        [0, 0],
      ],
      [
        [0, 0],
        [2, 3],
      ],
    ],
    ne: [
      ['Up', 'Left'],
      ['Down', 'Right'],
    ],
  },
  'stag-hunt': {
    label: 'Stag Hunt',
    rows: ['Up', 'Down'],
    cols: ['Left', 'Right'],
    matrix: [
      [
        [4, 4],
        [0, 3],
      ],
      [
        [3, 0],
        [2, 2],
      ],
    ],
    ne: [
      ['Up', 'Left'],
      ['Down', 'Right'],
    ],
  },
  'matching-pennies': {
    label: 'Matching Pennies',
    rows: ['Up', 'Down'],
    cols: ['Left', 'Right'],
    matrix: [
      [
        [1, -1],
        [-1, 1],
      ],
      [
        [-1, 1],
        [1, -1],
      ],
    ],
    ne: [],
  },
};

export const GAME_ORDER: GameModule[] = [
  'battle-of-the-sexes',
  'stag-hunt',
  'matching-pennies',
];
