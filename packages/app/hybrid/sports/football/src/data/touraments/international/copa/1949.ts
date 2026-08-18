import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1949: CopaYearData = {
  year: 1949,
  host: 'Brazil',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
