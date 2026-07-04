import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2012: AseanYearData = {
  year: 2012,
  host: 'Malaysia/Thailand',
  champion: 'Singapore',
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
    group('A', ['THA', 'PHL', 'VIE', 'MMR'], {
      THA: s('THA', 3, 3, 0, 0, 9, 2),
      PHL: s('PHL', 3, 2, 0, 1, 4, 2),
      VIE: s('VIE', 3, 0, 1, 2, 2, 5),
      MMR: s('MMR', 3, 0, 1, 2, 1, 7),
    }),
    group('B', ['SGP', 'MAS', 'IDN', 'LAO'], {
      SGP: s('SGP', 3, 2, 0, 1, 7, 4),
      MAS: s('MAS', 3, 2, 0, 1, 6, 4),
      IDN: s('IDN', 3, 1, 1, 1, 3, 4),
      LAO: s('LAO', 3, 0, 1, 2, 6, 10),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2012.teams);

const PREDETERMINED: Record<string, string> = {
  MAS_THA: 'MAS',
  PHL_SGP: 'PHL',
  SGP_THA: 'SGP',
};

const BRACKET_RAW: BracketRaw = [
  ['PHL', 'SGP'],
  ['MAS', 'THA'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
