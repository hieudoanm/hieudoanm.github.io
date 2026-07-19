import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2007: AseanYearData = {
  year: 2007,
  host: 'Singapore/Thailand',
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
    group('A', ['THA', 'MAS', 'MMR', 'PHL'], {
      THA: s('THA', 3, 2, 1, 0, 6, 1),
      MAS: s('MAS', 3, 1, 1, 1, 4, 1),
      MMR: s('MMR', 3, 0, 3, 0, 1, 1),
      PHL: s('PHL', 3, 0, 1, 2, 0, 8),
    }),
    group('B', ['SGP', 'VIE', 'IDN', 'LAO'], {
      SGP: s('SGP', 3, 1, 2, 0, 13, 2),
      VIE: s('VIE', 3, 1, 2, 0, 10, 1),
      IDN: s('IDN', 3, 1, 2, 0, 6, 4),
      LAO: s('LAO', 3, 0, 0, 3, 1, 23),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2007.teams);

const PREDETERMINED: Record<string, string> = {
  MAS_SGP: 'MAS',
  SGP_THA: 'SGP',
  THA_VIE: 'VIE',
};

const BRACKET_RAW: BracketRaw = [
  ['MAS', 'SGP'],
  ['VIE', 'THA'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
