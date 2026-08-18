import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2004: AseanYearData = {
  year: 2004,
  host: 'Malaysia/Vietnam',
  champion: null,
  runnerUp: null,
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
    group('A', ['IDN', 'SGP', 'VIE', 'LAO', 'KHM'], {
      IDN: s('IDN', 4, 3, 1, 0, 17, 0),
      SGP: s('SGP', 4, 2, 2, 0, 10, 3),
      VIE: s('VIE', 4, 2, 1, 1, 13, 5),
      LAO: s('LAO', 4, 1, 0, 3, 4, 16),
      KHM: s('KHM', 4, 0, 0, 4, 2, 22),
    }),
    group('B', ['MMR', 'MAS', 'THA', 'PHL', 'TLS'], {
      MMR: s('MMR', 4, 3, 1, 0, 6, 2),
      MAS: s('MAS', 4, 3, 0, 1, 11, 3),
      THA: s('THA', 4, 2, 1, 1, 13, 4),
      PHL: s('PHL', 4, 1, 0, 3, 4, 9),
      TLS: s('TLS', 4, 0, 0, 4, 2, 18),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2004.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_MAS: 'MAS',
  MMR_SGP: 'SGP',
};

const BRACKET_RAW: BracketRaw = [
  ['IDN', 'MAS'],
  ['MMR', 'SGP'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
