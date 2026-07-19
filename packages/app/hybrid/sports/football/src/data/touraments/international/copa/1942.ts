import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1942: CopaYearData = {
  year: 1942,
  host: 'Uruguay',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
