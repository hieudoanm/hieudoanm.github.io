import type { CandidateType } from './types';

export const HIGH = 100;
export const LOW = 60;
export const COST_HIGH = 5;
export const COST_LOW = 30;
export const COUNT = 8;
export const ACCEPT_RATIO = 0.75;

export const MIN_WAGE = 0;
export const MAX_WAGE = 150;

export const PRODUCTIVITY: Record<CandidateType, number> = {
  high: HIGH,
  low: LOW,
};

export const COST: Record<CandidateType, number> = {
  high: COST_HIGH,
  low: COST_LOW,
};

export const TYPE_LABEL: Record<CandidateType, string> = {
  high: 'High',
  low: 'Low',
};
