import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const ASEAN_CHAMPIONSHIP_2024: AseanYearData = {
  year: 2024,
  host: 'Southeast Asia',
  champion: 'Philippines',
  runnerUp: 'Thailand',
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
    group('A', ['THA', 'SGP', 'MAS', 'KHM', 'TLS'], {
      THA: s('THA', 4, 4, 0, 0, 18, 4),
      SGP: s('SGP', 4, 2, 1, 1, 7, 5),
      MAS: s('MAS', 4, 1, 2, 1, 5, 5),
      KHM: s('KHM', 4, 1, 1, 2, 7, 8),
      TLS: s('TLS', 4, 0, 0, 4, 3, 18),
    }),
    group('B', ['VIE', 'PHL', 'IDN', 'MMR', 'LAO'], {
      VIE: s('VIE', 4, 3, 1, 0, 11, 2),
      PHL: s('PHL', 4, 1, 3, 0, 4, 3),
      IDN: s('IDN', 4, 1, 1, 2, 4, 5),
      MMR: s('MMR', 4, 1, 1, 2, 4, 9),
      LAO: s('LAO', 4, 0, 2, 2, 7, 11),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(ASEAN_CHAMPIONSHIP_2024.teams);

const PREDETERMINED: Record<string, string> = {
  PHL_THA: 'PHL',
  SGP_VIE: 'VIE',
};

const BRACKET_RAW: BracketRaw = [
  ['SGP', 'VIE'],
  ['PHL', 'THA'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
