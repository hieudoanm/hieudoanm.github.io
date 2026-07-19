import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1924: CopaYearData = {
  year: 1924,
  host: 'Uruguay',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    CHI: t('CHI', 'Chile', 'cl'),
    PAR: t('PAR', 'Paraguay', 'py'),
    URU: t('URU', 'Uruguay', 'uy'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
