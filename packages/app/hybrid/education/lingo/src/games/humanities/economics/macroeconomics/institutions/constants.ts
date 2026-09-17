import type { CountryPreset, Institutions } from './types';

export const TOTAL_ROUNDS = 4;

export const BASE_TFP = 100;

export const MAX_GROWTH = 0.12;

export const DEPRECIATION = 0.06;

export const SAVINGS_BASE = 0.05;

export const SAVINGS_SCALE = 0.25;

export const WEIGHTS: Record<keyof Institutions, number> = {
  propertyRights: 0.4,
  contracts: 0.35,
  stability: 0.25,
};

export const PRESETS: Record<
  CountryPreset,
  { label: string; emoji: string; institutions: Institutions }
> = {
  extractive: {
    label: 'Extractive',
    emoji: '⛓️',
    institutions: { propertyRights: 20, contracts: 25, stability: 15 },
  },
  crony: {
    label: 'Crony',
    emoji: '🤝',
    institutions: { propertyRights: 50, contracts: 40, stability: 60 },
  },
  inclusive: {
    label: 'Inclusive',
    emoji: '🏛️',
    institutions: { propertyRights: 80, contracts: 85, stability: 80 },
  },
};

export const TARGETS: number[] = [50, 80, 110, 150];
