import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2010: AseanYearData = {
  year: 2010,
  host: 'Indonesia/Vietnam',
  champion: 'Indonesia',
  runnerUp: 'Malaysia',
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
    group('A', ['IDN', 'MAS', 'THA', 'LAO'], {
      IDN: s('IDN', 3, 3, 0, 0, 13, 2),
      MAS: s('MAS', 3, 1, 1, 1, 6, 6),
      THA: s('THA', 3, 0, 2, 1, 3, 4),
      LAO: s('LAO', 3, 0, 1, 2, 3, 13),
    }),
    group('B', ['VIE', 'PHL', 'SGP', 'MMR'], {
      VIE: s('VIE', 3, 2, 0, 1, 8, 3),
      PHL: s('PHL', 3, 1, 2, 0, 3, 1),
      SGP: s('SGP', 3, 1, 1, 1, 3, 3),
      MMR: s('MMR', 3, 0, 1, 2, 2, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2010.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_MAS: 'MAS',
  IDN_PHL: 'IDN',
  MAS_VIE: 'MAS',
};

const BRACKET_RAW: BracketRaw = [
  ['MAS', 'VIE'],
  ['IDN', 'PHL'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
