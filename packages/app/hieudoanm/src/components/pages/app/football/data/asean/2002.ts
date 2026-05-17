import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2002: AseanYearData = {
  year: 2002,
  host: 'Indonesia/Singapore',
  champion: 'Malaysia',
  runnerUp: 'Vietnam',
  available: false,
  teams: {
    IDN: t('IDN', 'Indonesia', 'id'),
    KHM: t('KHM', 'Cambodia', 'kh'),
    LAO: t('LAO', 'Laos', 'la'),
    MAS: t('MAS', 'Malaysia', 'my'),
    MMR: t('MMR', 'Myanmar', 'mm'),
    PHL: t('PHL', 'Philippines', 'ph'),
    SGP: t('SGP', 'Singapore', 'sg'),
    THA: t('THA', 'Thailand', 'th'),
    VIE: t('VIE', 'Vietnam', 'vn'),
  },
  groups: [
    group('A', ['VIE', 'IDN', 'MMR', 'KHM', 'PHL'], {
      VIE: s('VIE', 4, 3, 1, 0, 19, 7),
      IDN: s('IDN', 4, 2, 2, 0, 19, 5),
      MMR: s('MMR', 4, 2, 1, 1, 13, 5),
      KHM: s('KHM', 4, 1, 0, 3, 5, 18),
      PHL: s('PHL', 4, 0, 0, 4, 3, 24),
    }),
    group('B', ['MAS', 'THA', 'SGP', 'LAO'], {
      MAS: s('MAS', 3, 2, 1, 0, 8, 2),
      THA: s('THA', 3, 1, 1, 1, 7, 5),
      SGP: s('SGP', 3, 1, 1, 1, 3, 6),
      LAO: s('LAO', 3, 0, 1, 2, 3, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2002.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_MAS: 'IDN',
  IDN_THA: 'IDN',
  MAS_VIE: 'VIE',
  THA_VIE: 'VIE',
};

const BRACKET_RAW: BracketRaw = [
  ['IDN', 'MAS'],
  ['VIE', 'THA'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
