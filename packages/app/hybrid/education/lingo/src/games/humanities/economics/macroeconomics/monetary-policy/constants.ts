import type { Scenario, TradeoffState } from './types';

export const RSTAR = 2;
export const INFLATION_TARGET = 2;
export const RATE_STEP = 0.5;
export const RATE_MIN = 0;
export const RATE_MAX = 30;
export const TRADEOFF_RATE_MIN = 0;
export const TRADEOFF_RATE_MAX = 10;
export const MAX_TRADEOFF_STEPS = 16;
export const TRADEOFF_TOLERANCE = 0.5;

export const SCENARIOS: Scenario[] = [
  {
    id: 'boom',
    name: 'Overheating boom',
    emoji: '🔥',
    inflation: 5,
    outputGap: 2,
    naturalRate: 1,
  },
  {
    id: 'slump',
    name: 'Deep slump',
    emoji: '🥶',
    inflation: 1,
    outputGap: -3,
    naturalRate: 1,
  },
  {
    id: 'balanced',
    name: 'Balanced economy',
    emoji: '🌤️',
    inflation: 2,
    outputGap: 0,
    naturalRate: 0,
  },
  {
    id: 'mild-boom',
    name: 'Mild boom',
    emoji: '😊',
    inflation: 4,
    outputGap: 1,
    naturalRate: 2,
  },
  {
    id: 'deflation',
    name: 'Deflation scare',
    emoji: '❄️',
    inflation: 0.5,
    outputGap: -1.5,
    naturalRate: 2,
  },
  {
    id: 'runaway',
    name: 'Runaway boom',
    emoji: '🚀',
    inflation: 6,
    outputGap: 3,
    naturalRate: 1,
  },
  {
    id: 'stagflation',
    name: 'Inflation with slack',
    emoji: '😵‍💫',
    inflation: 3,
    outputGap: -1,
    naturalRate: 2,
  },
];

export const TOTAL_ROUNDS = SCENARIOS.length;

export const TRADEOFF_START: TradeoffState = {
  rate: 4,
  inflation: 3.5,
  outputGap: 1.2,
  stepsUsed: 0,
};
