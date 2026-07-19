import type { Opponent } from './types';

export const TOTAL_ROUNDS = 10;

export const PAYOFFS = {
  mutualCooperate: 3,
  tempt: 5,
  sucker: 0,
  mutualDefect: 1,
} as const;

export const STRATEGIES: Opponent[] = [
  {
    id: 'tit-for-tat',
    name: 'Tit For Tat',
    emoji: '🪞',
    description: 'Opens with cooperate, then mirrors your previous move.',
  },
  {
    id: 'grim-trigger',
    name: 'Grim Trigger',
    emoji: '💣',
    description: 'Cooperates until you defect once, then punishes forever.',
  },
  {
    id: 'forgiving-tit-for-tat',
    name: 'Forgiving Tit For Tat',
    emoji: '🌤️',
    description: 'Forgives one defection, but defects forever after a second.',
  },
  {
    id: 'random',
    name: 'Random',
    emoji: '🎲',
    description: 'Cooperates or defects with a 50/50 chance.',
  },
  {
    id: 'always-defect',
    name: 'Always Defect',
    emoji: '🗡️',
    description: 'Defects on every single round.',
  },
  {
    id: 'mostly-cooperate',
    name: 'Mostly Cooperate',
    emoji: '🕊️',
    description: 'Cooperates 90% of the time.',
  },
];
