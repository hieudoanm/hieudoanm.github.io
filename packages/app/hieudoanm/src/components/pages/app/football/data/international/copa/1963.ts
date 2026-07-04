import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1963: CopaYearData = {
  year: 1963,
  host: 'Bolivia',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    COL: t('COL', 'Colombia', 'co'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
