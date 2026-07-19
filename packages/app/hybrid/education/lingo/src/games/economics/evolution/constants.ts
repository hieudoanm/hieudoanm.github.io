import type { PayoffMatrix, PresetId } from './types';

export interface Preset {
  id: PresetId;
  label: string;
  emoji: string;
  strategyA: string;
  strategyB: string;
  startP: number;
  matrix: PayoffMatrix;
  tippingPoint: number | null;
  essText: string;
  description: string;
}

export const CONVERGE_EPSILON = 0.001;

export const DEFAULT_PRESET: PresetId = 'hawk-dove';

export const STEP_OPTIONS = [1, 10, 100];

export const PRESET_ORDER: PresetId[] = [
  'hawk-dove',
  'prisoner',
  'coordination',
];

export const PRESETS: Record<PresetId, Preset> = {
  'hawk-dove': {
    id: 'hawk-dove',
    label: 'Hawk–Dove',
    emoji: '🐺',
    strategyA: 'Hawk',
    strategyB: 'Dove',
    startP: 0.5,
    matrix: { aA: -1, aB: 4, bA: 0, bB: 2 },
    tippingPoint: null,
    essText:
      'ESS: the population settles on a hawk share of ~2/3 — aggression is checked exactly at the point where its cost cancels its gains.',
    description:
      'Payoffs: Hawk v Hawk = -1, Hawk v Dove = 4, Dove v Hawk = 0, Dove v Dove = 2. Interior ESS at p = 2/3.',
  },
  prisoner: {
    id: 'prisoner',
    label: 'Prisoner’s Dilemma',
    emoji: '🔒',
    strategyA: 'Cooperator',
    strategyB: 'Defector',
    startP: 0.5,
    matrix: { aA: 3, aB: 0, bA: 5, bB: 1 },
    tippingPoint: null,
    essText:
      'ESS: defection strictly dominates — cooperators are driven to extinction.',
    description:
      'Payoffs (R=3, S=0, T=5, P=1): Coop v Coop = 3, Coop v Defect = 0, Defect v Coop = 5, Defect v Defect = 1.',
  },
  coordination: {
    id: 'coordination',
    label: 'Coordination (Stag Hunt)',
    emoji: '🦌',
    strategyA: 'Stag',
    strategyB: 'Hare',
    startP: 0.5,
    matrix: { aA: 4, aB: 0, bA: 3, bB: 2 },
    tippingPoint: 2 / 3,
    essText:
      'Bistable: the interior equilibrium at p = 2/3 is unstable. Start above the tipping point and Stag (mutual benefit) sweeps in; start below it and Hare (safe fallback) takes over.',
    description:
      'Payoffs: Stag v Stag = 4, Stag v Hare = 0, Hare v Stag = 3, Hare v Hare = 2. Two stable equilibria plus an unstable interior one at p = 2/3.',
  },
};
