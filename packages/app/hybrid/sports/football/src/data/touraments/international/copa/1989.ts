import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1989: CopaYearData = {
  year: 1989,
  host: 'Brazil',
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
    group('A', ['PAR', 'BRA', 'COL', 'PER', 'VEN'], {
      PAR: s('PAR', 4, 3, 0, 1, 9, 4),
      BRA: s('BRA', 4, 2, 2, 0, 5, 1),
      COL: s('COL', 4, 1, 2, 1, 5, 4),
      PER: s('PER', 4, 0, 3, 1, 4, 7),
      VEN: s('VEN', 4, 0, 1, 3, 4, 11),
    }),
    group('B', ['ARG', 'URU', 'CHI', 'ECU', 'BOL'], {
      ARG: s('ARG', 4, 2, 2, 0, 2, 0),
      URU: s('URU', 4, 2, 0, 2, 6, 2),
      CHI: s('CHI', 4, 2, 0, 2, 7, 5),
      ECU: s('ECU', 4, 1, 2, 1, 2, 2),
      BOL: s('BOL', 4, 0, 2, 2, 0, 8),
    }),
  ],
};

export const KNOCKOUT: KnockoutYearData | null = null;
