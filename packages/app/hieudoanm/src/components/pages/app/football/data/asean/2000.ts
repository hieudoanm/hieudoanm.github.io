import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2000: AseanYearData = {
  year: 2000,
  host: 'Thailand',
  champion: 'Vietnam',
  runnerUp: 'Malaysia',
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
    group('A', ['VIE', 'MAS', 'SGP', 'KHM', 'LAO'], {
      VIE: s('VIE', 4, 3, 1, 0, 12, 0),
      MAS: s('MAS', 4, 3, 1, 0, 9, 2),
      SGP: s('SGP', 4, 2, 0, 2, 4, 2),
      KHM: s('KHM', 4, 1, 0, 3, 5, 10),
      LAO: s('LAO', 4, 0, 0, 4, 0, 16),
    }),
    group('B', ['THA', 'IDN', 'MMR', 'PHL'], {
      THA: s('THA', 3, 3, 0, 0, 9, 2),
      IDN: s('IDN', 3, 2, 0, 1, 9, 4),
      MMR: s('MMR', 3, 1, 0, 2, 4, 8),
      PHL: s('PHL', 3, 0, 0, 3, 0, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2000.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_THA: 'THA',
  IDN_VIE: 'VIE',
  MAS_THA: 'THA',
  MAS_VIE: 'VIE',
};

const BRACKET_RAW: BracketRaw = [
  ['THA', 'MAS'],
  ['VIE', 'IDN'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
