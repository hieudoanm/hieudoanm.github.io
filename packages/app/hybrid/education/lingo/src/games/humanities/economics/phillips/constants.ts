import type { Policy, Scenario } from './types';

export const NATURAL_RATE = 5;
export const BETA = 0.5;
export const EXPECTATIONS_INFLATION = 3;
export const INFLATION_TARGET = 2;

export const TOTAL_ROUNDS = 5;

export const SCENARIOS: Scenario[] = [
  { startInflation: 3, startUnemployment: 5 },
  { startInflation: 3, startUnemployment: 3 },
  { startInflation: 5, startUnemployment: 4 },
  { startInflation: 6, startUnemployment: 6 },
  { startInflation: 4, startUnemployment: 5 },
];

export const POLICY_META: Record<
  Policy,
  { label: string; emoji: string; description: string }
> = {
  expansion: {
    label: 'Expansion',
    emoji: '▲',
    description: 'Stimulate: lower u, higher π',
  },
  contraction: {
    label: 'Contraction',
    emoji: '▼',
    description: 'Cool down: higher u, lower π',
  },
  hold: {
    label: 'Hold',
    emoji: '●',
    description: 'Maintain current policy',
  },
};

export const POLICY_ORDER: Policy[] = ['expansion', 'contraction', 'hold'];
