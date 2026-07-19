import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2021: AseanYearData = {
  year: 2021,
  host: 'Singapore',
  champion: 'Thailand',
  runnerUp: 'Indonesia',
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
    group('A', ['THA', 'SGP', 'PHL', 'MMR', 'TLS'], {
      THA: s('THA', 4, 4, 0, 0, 10, 1),
      SGP: s('SGP', 4, 3, 0, 1, 7, 3),
      PHL: s('PHL', 4, 2, 0, 2, 12, 6),
      MMR: s('MMR', 4, 1, 0, 3, 4, 10),
      TLS: s('TLS', 4, 0, 0, 4, 0, 13),
    }),
    group('B', ['IDN', 'VIE', 'MAS', 'KHM', 'LAO'], {
      IDN: s('IDN', 4, 3, 1, 0, 13, 4),
      VIE: s('VIE', 4, 3, 1, 0, 9, 0),
      MAS: s('MAS', 4, 2, 0, 2, 8, 8),
      KHM: s('KHM', 4, 1, 0, 3, 6, 11),
      LAO: s('LAO', 4, 0, 0, 4, 1, 14),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2021.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_SGP: 'SGP',
  IDN_THA: 'THA',
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
