import { Move, Round, Strategy } from '../types';
import { STRATEGIES } from '../constants';

export const pickStrategy = (): Strategy =>
  STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)].id;

export const chooseOpponent = (
  strategy: Strategy,
  history: Round[],
  playerHistory: Move[]
): Move => {
  switch (strategy) {
    case 'alwayscooperate':
      return 'cooperate';
    case 'alwaysdefect':
      return 'defect';
    case 'titfortat':
      return history.length === 0
        ? 'cooperate'
        : playerHistory[playerHistory.length - 1];
    case 'grimtrigger':
      return playerHistory.includes('defect') ? 'defect' : 'cooperate';
    case 'random':
      return Math.random() < 0.5 ? 'cooperate' : 'defect';
    default:
      const _exhaustive: never = strategy;
      return 'cooperate';
  }
};

export const formatScore = (s: number) => `${s}yr`;
