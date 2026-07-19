import { Move, Strategy } from './types';

export const PAYOFF: Record<Move, Record<Move, [number, number]>> = {
  cooperate: { cooperate: [1, 1], defect: [3, 0] },
  defect: { cooperate: [0, 3], defect: [2, 2] },
};

export const STRATEGIES: { id: Strategy; label: string; emoji: string }[] = [
  { id: 'titfortat', label: 'Tit for Tat', emoji: '🪞' },
  { id: 'alwaysdefect', label: 'Always Defect', emoji: '🔪' },
  { id: 'alwayscooperate', label: 'Always Cooperate', emoji: '🕊️' },
  { id: 'grimtrigger', label: 'Grim Trigger', emoji: '💣' },
  { id: 'random', label: 'Random', emoji: '🎲' },
];

export const TOTAL_ROUNDS = 10;
