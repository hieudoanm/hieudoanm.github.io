import type { Rule } from './types';

export const COST = 150;
export const SHARE = 50;

export const MIN_VALUE = 0;
export const MAX_VALUE = 100;

export const TOTAL_ROUNDS = 5;

export const PLAYER_INDEX = 0;

export const RULES: Rule[] = ['equal', 'pivot'];

export const RULE_LABELS: Record<Rule, string> = {
  equal: '⚖️ Equal Share',
  pivot: '🎯 Pivot (Clarke) rule',
};

export const RULE_DESCRIPTIONS: Record<Rule, string> = {
  equal:
    'Everyone reports freely; the project builds if reports sum to 150, and each pays a flat 50.',
  pivot:
    'Same build rule, but the pivotal agent additionally pays a Clarke tax equal to the externality they impose.',
};
