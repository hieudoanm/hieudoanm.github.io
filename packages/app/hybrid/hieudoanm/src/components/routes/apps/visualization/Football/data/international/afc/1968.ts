import { s, t, group } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1968: AfcYearData = {
  year: 1968,
  host: 'Iran',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    BUR: t('BUR', 'Burma', 'bu'),
    HKG: t('HKG', 'Hong Kong', 'hk'),
    IRN: t('IRN', 'Iran', 'ir'),
    ISR: t('ISR', 'Israel', 'il'),
    TPE: t('TPE', 'Taiwan', 'tw'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
