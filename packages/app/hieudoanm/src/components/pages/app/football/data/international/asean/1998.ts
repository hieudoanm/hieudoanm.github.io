import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_1998: AseanYearData = {
  year: 1998,
  host: 'Vietnam',
  champion: 'Vietnam',
  runnerUp: 'Singapore',
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
    group('A', ['SGP', 'VIE', 'MAS', 'LAO'], {
      SGP: s('SGP', 3, 2, 1, 0, 6, 1),
      VIE: s('VIE', 3, 2, 1, 0, 5, 1),
      MAS: s('MAS', 3, 0, 1, 2, 0, 3),
      LAO: s('LAO', 3, 0, 1, 2, 2, 8),
    }),
    group('B', ['THA', 'IDN', 'MMR', 'PHL'], {
      THA: s('THA', 3, 2, 1, 0, 7, 4),
      IDN: s('IDN', 3, 2, 0, 1, 11, 5),
      MMR: s('MMR', 3, 1, 1, 1, 8, 9),
      PHL: s('PHL', 3, 0, 0, 3, 3, 11),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_1998.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_SGP: 'SGP',
  IDN_THA: 'IDN',
  SGP_VIE: 'VIE',
  THA_VIE: 'VIE',
};

const BRACKET_RAW: BracketRaw = [
  ['SGP', 'IDN'],
  ['VIE', 'THA'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
