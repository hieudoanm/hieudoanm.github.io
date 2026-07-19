import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1953: CopaYearData = {
  year: 1953,
  host: 'Peru',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    BOL: t('BOL', 'Bolivia', 'bo'),
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
