import { s, t, group } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1936: CopaYearData = {
  year: 1936,
  host: 'Argentina',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    PER: t('PER', 'Peru', 'pe'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
