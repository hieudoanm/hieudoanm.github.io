import { s, t, group } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1964: AfcYearData = {
  year: 1964,
  host: 'Israel',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    HKG: t('HKG', 'Hong Kong', 'hk'),
    IND: t('IND', 'India', 'in'),
    ISR: t('ISR', 'Israel', 'il'),
    KOR: t('KOR', 'South Korea', 'kr'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
