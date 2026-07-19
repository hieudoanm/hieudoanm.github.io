import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1923: CopaYearData = {
  year: 1923,
  host: 'Uruguay',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BRA: t('BRA', 'Brazil', 'br'),
    PAR: t('PAR', 'Paraguay', 'py'),
    URU: t('URU', 'Uruguay', 'uy'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
