import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1967: CopaYearData = {
  year: 1967,
  host: 'Uruguay',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    CHI: t('CHI', 'Chile', 'cl'),
    PAR: t('PAR', 'Paraguay', 'py'),
    URU: t('URU', 'Uruguay', 'uy'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
