import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2014: AseanYearData = {
  year: 2014,
  host: 'Singapore/Vietnam',
  champion: 'Malaysia',
  runnerUp: 'Thailand',
  available: false,
  teams: {
    IDN: t('IDN', 'Indonesia', 'id'),
    LAO: t('LAO', 'Laos', 'la'),
    MAS: t('MAS', 'Malaysia', 'my'),
    MMR: t('MMR', 'Myanmar', 'mm'),
    PHL: t('PHL', 'Philippines', 'ph'),
    SGP: t('SGP', 'Singapore', 'sg'),
    THA: t('THA', 'Thailand', 'th'),
    VIE: t('VIE', 'Vietnam', 'vn'),
  },
  groups: [
    group('A', ['VIE', 'PHL', 'IDN', 'LAO'], {
      VIE: s('VIE', 3, 2, 1, 0, 8, 3),
      PHL: s('PHL', 3, 2, 0, 1, 9, 4),
      IDN: s('IDN', 3, 1, 1, 1, 7, 7),
      LAO: s('LAO', 3, 0, 0, 3, 2, 12),
    }),
    group('B', ['THA', 'MAS', 'SGP', 'MMR'], {
      THA: s('THA', 3, 3, 0, 0, 7, 3),
      MAS: s('MAS', 3, 1, 1, 1, 5, 4),
      SGP: s('SGP', 3, 1, 0, 2, 6, 7),
      MMR: s('MMR', 3, 0, 1, 2, 2, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2014.teams);

const PREDETERMINED: Record<string, string> = {
  MAS_THA: 'THA',
  MAS_VIE: 'VIE',
  PHL_THA: 'PHL',
};

const BRACKET_RAW: BracketRaw = [
  ['PHL', 'THA'],
  ['MAS', 'VIE'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
