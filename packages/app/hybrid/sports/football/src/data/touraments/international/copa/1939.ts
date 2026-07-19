import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1939: CopaYearData = {
  year: 1939,
  host: 'Peru',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    CHI: t('CHI', 'Chile', 'cl'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
