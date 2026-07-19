import { s, t, group } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1956: AfcYearData = {
  year: 1956,
  host: 'Hong Kong',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    HKG: t('HKG', 'Hong Kong', 'hk'),
    ISR: t('ISR', 'Israel', 'il'),
    KOR: t('KOR', 'South Korea', 'kr'),
    VSO: t('VSO', 'Vietnam Republic', 'vn'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
