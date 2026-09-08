import type { Mode } from './types';

export const POLICY_MIN = 0;
export const POLICY_MAX = 100;

export const PRIZE = 100000;

export const MODE_ORDER: Mode[] = [
  'median',
  'paradox',
  'rent',
  'median',
  'paradox',
  'rent',
  'median',
  'paradox',
  'rent',
];

export const TOTAL_ROUNDS = MODE_ORDER.length;

export const MODE_META: Record<
  Mode,
  { label: string; emoji: string; description: string }
> = {
  median: {
    label: 'Median Voter',
    emoji: '🎯',
    description:
      'The candidate closest to the median voter wins under majority rule.',
  },
  paradox: {
    label: 'Voting Paradox',
    emoji: '🌀',
    description:
      'Preference cycles leave no Condorcet winner — the agenda decides.',
  },
  rent: {
    label: 'Rent Seeking',
    emoji: '💰',
    description:
      'Lobby budgets are waste; expected payoff is p×V − your spending.',
  },
};

export interface MedianScenario {
  voters: number[];
  bot: number;
}

export const MEDIAN_SCENARIOS: MedianScenario[] = [
  { voters: [5, 15, 50, 55, 95], bot: 70 },
  { voters: [10, 20, 45, 60, 95], bot: 10 },
  { voters: [5, 5, 30, 60, 95], bot: 95 },
];

export const PARADOX_OPTION_SETS: { name: string; emoji: string }[][] = [
  [
    { name: 'Roads', emoji: '🛣️' },
    { name: 'Bridge', emoji: '🌉' },
    { name: 'Tunnel', emoji: '🚇' },
  ],
  [
    { name: 'Stadium', emoji: '🏟️' },
    { name: 'Library', emoji: '📚' },
    { name: 'Park', emoji: '🌳' },
  ],
  [
    { name: 'Harbor', emoji: '🚢' },
    { name: 'Airport', emoji: '✈️' },
    { name: 'Rail', emoji: '🚄' },
  ],
];

export const RENT_BOT_SPENDS = [20000, 40000, 60000];
