import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const ASEAN_CHAMPIONSHIP_2025: AseanYearData = {
  year: 2025,
  host: 'Thailand/Vietnam',
  champion: 'Thailand',
  runnerUp: 'Vietnam',
  available: false,
  teams: {
    THA: t('THA', 'Thailand', 'th'),
    VIE: t('VIE', 'Vietnam', 'vn'),
  },
  groups: [],
};

export const KNOCKOUT: AseanKnockoutYearData | null = null;
