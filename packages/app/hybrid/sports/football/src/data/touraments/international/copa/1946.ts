import type { CopaYearData, KnockoutYearData } from './types';
import { t } from './types';

export const COPA_1946: CopaYearData = {
  year: 1946,
  host: 'Argentina',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    PAR: t('PAR', 'Paraguay', 'py'),
    URU: t('URU', 'Uruguay', 'uy'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
