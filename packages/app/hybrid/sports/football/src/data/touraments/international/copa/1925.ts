import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1925: CopaYearData = {
  year: 1925,
  host: 'Argentina',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BRA: t('BRA', 'Brazil', 'br'),
    PAR: t('PAR', 'Paraguay', 'py'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
