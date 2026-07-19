import { s, t, group } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1959: AfconYearData = {
  year: 1959,
  host: 'United Arab Republic',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ETH: t('ETH', 'Ethiopia', 'et'),
    SDN: t('SDN', 'Sudan', 'sd'),
    UNA: t('UNA', 'United Arab Republic', 'un'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
