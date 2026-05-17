import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2023: AseanYearData = {
  year: 2023,
  host: 'Southeast Asia',
  champion: 'Thailand',
  runnerUp: 'Vietnam',
  available: false,
  teams: {
    IDN: t('IDN', 'Indonesia', 'id'),
    KHM: t('KHM', 'Cambodia', 'kh'),
    MAS: t('MAS', 'Malaysia', 'my'),
    MMR: t('MMR', 'Myanmar', 'mm'),
    PHL: t('PHL', 'Philippines', 'ph'),
    SGP: t('SGP', 'Singapore', 'sg'),
    THA: t('THA', 'Thailand', 'th'),
    VIE: t('VIE', 'Vietnam', 'vn'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2023.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_PHL: 'PHL',
  KHM_THA: 'THA',
  MAS_SGP: 'MAS',
  MAS_VIE: 'VIE',
  MMR_VIE: 'VIE',
  PHL_THA: 'THA',
  THA_VIE: 'VIE',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['THA', 'KHM'],
    ['PHL', 'IDN'],
  ],
  [
    ['VIE', 'MMR'],
    ['MAS', 'SGP'],
  ],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
