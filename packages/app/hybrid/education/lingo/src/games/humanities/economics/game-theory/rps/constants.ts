import type { BotId, BotStrategy, Move } from './types';

export const MOVES = ['rock', 'paper', 'scissors'] as const;

export const EMOJIS: Record<Move, string> = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️',
};

export const TOTAL_ROUNDS = 10;

export const BOT_STRATEGIES: BotStrategy[] = [
  {
    id: 'cycler',
    label: 'Cycler',
    emoji: '🔁',
    description: 'Plays Rock, Paper, Scissors on repeat.',
  },
  {
    id: 'mirror',
    label: 'Mirror',
    emoji: '🪞',
    description: 'Plays your previous move (random on round 1).',
  },
  {
    id: 'randomizer',
    label: 'Randomizer',
    emoji: '🎲',
    description: '0.5 rock / 0.25 paper / 0.25 scissors.',
  },
  {
    id: 'statistician',
    label: 'Statistician',
    emoji: '🧠',
    description: 'Plays the move that beats your most frequent move.',
  },
];
