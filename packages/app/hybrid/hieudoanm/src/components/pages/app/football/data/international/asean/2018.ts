import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2018: AseanYearData = {
  year: 2018,
  host: 'Southeast Asia',
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
    TLS: t('TLS', 'Timor-Leste', 'tl'),
    VIE: t('VIE', 'Vietnam', 'vn'),
  },
  groups: [
    group('A', ['VIE', 'MAS', 'MMR', 'KHM', 'LAO'], {
      VIE: s('VIE', 4, 3, 1, 0, 8, 0),
      MAS: s('MAS', 4, 3, 0, 1, 7, 3),
      MMR: s('MMR', 4, 2, 1, 1, 7, 5),
      KHM: s('KHM', 4, 1, 0, 3, 4, 9),
      LAO: s('LAO', 4, 0, 0, 4, 3, 12),
    }),
    group('B', ['THA', 'PHL', 'SGP', 'IDN', 'TLS'], {
      THA: s('THA', 4, 3, 1, 0, 15, 3),
      PHL: s('PHL', 4, 2, 2, 0, 5, 3),
      SGP: s('SGP', 4, 2, 0, 2, 7, 5),
      IDN: s('IDN', 4, 1, 1, 2, 5, 6),
      TLS: s('TLS', 4, 0, 0, 4, 4, 19),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2018.teams);

const PREDETERMINED: Record<string, string> = {
  MAS_THA: 'MAS',
  MAS_VIE: 'MAS',
  PHL_VIE: 'VIE',
};

const BRACKET_RAW: BracketRaw = [
  ['MAS', 'THA'],
  ['PHL', 'VIE'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
