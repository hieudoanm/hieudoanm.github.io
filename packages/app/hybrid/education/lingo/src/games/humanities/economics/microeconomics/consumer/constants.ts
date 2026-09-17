import type { GoodType } from './types';

export const DEFAULT_INCOME = 100;
export const DEFAULT_PX = 2;
export const DEFAULT_PY = 4;
export const DEFAULT_ALPHA = 0.5;

export const MIN_INCOME = 20;
export const MAX_INCOME = 200;
export const MIN_PRICE = 1;
export const MAX_PRICE = 10;
export const MIN_QX = 0;
export const MAX_QX = 50;
export const QX_STEP = 1;

export const ACCEPT_SCORE = 95;

export interface UtilityKind {
  id: GoodType;
  label: string;
  emoji: string;
  formula: string;
  description: string;
  alpha: number;
}

export const UTILITIES: UtilityKind[] = [
  {
    id: 'cobb-douglas',
    label: 'Cobb-Douglas',
    emoji: '🍎',
    formula: 'U = x\u00BD \u00B7 y\u00BD',
    description: 'MRS falls along the curve; an interior optimum.',
    alpha: DEFAULT_ALPHA,
  },
  {
    id: 'perfect-substitutes',
    label: 'Perfect Substitutes',
    emoji: '⚖️',
    formula: 'U = x + y',
    description: 'Linear; optimum at a corner (buy the cheaper good).',
    alpha: DEFAULT_ALPHA,
  },
  {
    id: 'perfect-complements',
    label: 'Perfect Complements',
    emoji: '👟',
    formula: 'U = min(x, y)',
    description: 'Goods consumed in fixed proportions (x = y).',
    alpha: DEFAULT_ALPHA,
  },
];

export const PRESET_ORDER: GoodType[] = [
  'cobb-douglas',
  'perfect-substitutes',
  'perfect-complements',
];
