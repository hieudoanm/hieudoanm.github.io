import type { Mode, ModeMeta, QuizScenario } from './types';

export const MC = 8;
export const FIXED_COST = 100;
export const MAX_DIFFERENTIATION = 100;
export const MAX_QUANTITY = 100;
export const TOTAL_QUIZ_ROUNDS = 3;

export const MODE_ORDER: Mode[] = ['perfect', 'monopolistic', 'monopoly'];

export const MODES: Record<Mode, ModeMeta> = {
  perfect: {
    id: 'perfect',
    label: 'Perfect Competition',
    emoji: '⚖️',
    description: 'Price takers: P = MC and zero long-run economic profit.',
    fixedCost: 0,
    erodes: false,
  },
  monopolistic: {
    id: 'monopolistic',
    label: 'Monopolistic Competition',
    emoji: '🍜',
    description:
      'Differentiated products: short-run pricing power, entry erodes it.',
    fixedCost: FIXED_COST,
    erodes: true,
  },
  monopoly: {
    id: 'monopoly',
    label: 'Monopoly',
    emoji: '👑',
    description:
      'A single seller: persistent pricing power and deadweight loss.',
    fixedCost: FIXED_COST,
    erodes: false,
  },
};

export const QUIZ_SCENARIOS: QuizScenario[] = [
  { a: 60, b: 0.5, options: [25, 40, 52, 65] },
  { a: 80, b: 1, options: [20, 36, 50, 70] },
  { a: 50, b: 0.8, options: [12, 26, 40, 55] },
];
