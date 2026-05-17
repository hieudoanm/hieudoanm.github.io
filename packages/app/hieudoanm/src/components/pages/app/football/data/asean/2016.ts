import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2016: AseanYearData = {
  year: 2016,
  host: 'Myanmar/Philippines',
  champion: 'Indonesia',
  runnerUp: 'Thailand',
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
  groups: [
    group('A', ['THA', 'IDN', 'PHL', 'SGP'], {
      THA: s('THA', 3, 3, 0, 0, 6, 2),
      IDN: s('IDN', 3, 1, 1, 1, 6, 7),
      PHL: s('PHL', 3, 0, 2, 1, 2, 3),
      SGP: s('SGP', 3, 0, 1, 2, 1, 3),
    }),
    group('B', ['VIE', 'MMR', 'MAS', 'KHM'], {
      VIE: s('VIE', 3, 3, 0, 0, 5, 2),
      MMR: s('MMR', 3, 2, 0, 1, 5, 3),
      MAS: s('MAS', 3, 1, 0, 2, 3, 4),
      KHM: s('KHM', 3, 0, 0, 3, 4, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2016.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_THA: 'IDN',
  IDN_VIE: 'IDN',
  MMR_THA: 'MMR',
};

const BRACKET_RAW: BracketRaw = [
  ['IDN', 'VIE'],
  ['MMR', 'THA'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
