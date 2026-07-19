import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1991: CopaYearData = {
  year: 1991,
  host: 'Chile',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [
    group('A', ['ARG', 'CHI', 'PAR', 'PER', 'VEN'], {
      ARG: s('ARG', 4, 4, 0, 0, 11, 3),
      CHI: s('CHI', 4, 3, 0, 1, 10, 3),
      PAR: s('PAR', 4, 2, 0, 2, 7, 8),
      PER: s('PER', 4, 1, 0, 3, 9, 9),
      VEN: s('VEN', 4, 0, 0, 4, 1, 15),
    }),
    group('B', ['COL', 'BRA', 'URU', 'ECU', 'BOL'], {
      COL: s('COL', 4, 2, 1, 1, 3, 1),
      BRA: s('BRA', 4, 2, 1, 1, 6, 5),
      URU: s('URU', 4, 1, 3, 0, 4, 3),
      ECU: s('ECU', 4, 1, 1, 2, 6, 5),
      BOL: s('BOL', 4, 0, 2, 2, 2, 7),
    }),
  ],
};

export const KNOCKOUT: KnockoutYearData | null = null;
