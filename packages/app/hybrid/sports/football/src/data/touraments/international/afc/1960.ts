import { s, t, group } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1960: AfcYearData = {
  year: 1960,
  host: 'South Korea',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ISR: t('ISR', 'Israel', 'il'),
    KOR: t('KOR', 'South Korea', 'kr'),
    TPE: t('TPE', 'Taiwan', 'tw'),
    VSO: t('VSO', 'Vietnam Republic', 'vn'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
