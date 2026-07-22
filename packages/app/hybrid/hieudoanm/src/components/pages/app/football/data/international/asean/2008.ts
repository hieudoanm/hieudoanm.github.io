import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2008: AseanYearData = {
  year: 2008,
  host: 'Indonesia/Thailand',
  champion: 'Vietnam',
  runnerUp: 'Thailand',
  available: false,
  teams: {
    IDN: t('IDN', 'Indonesia', 'id'),
    KHM: t('KHM', 'Cambodia', 'kh'),
    LAO: t('LAO', 'Laos', 'la'),
    MAS: t('MAS', 'Malaysia', 'my'),
    MMR: t('MMR', 'Myanmar', 'mm'),
    SGP: t('SGP', 'Singapore', 'sg'),
    THA: t('THA', 'Thailand', 'th'),
    VIE: t('VIE', 'Vietnam', 'vn'),
  },
  groups: [
    group('A', ['SGP', 'IDN', 'MMR', 'KHM'], {
      SGP: s('SGP', 3, 3, 0, 0, 10, 1),
      IDN: s('IDN', 3, 2, 0, 1, 7, 2),
      MMR: s('MMR', 3, 1, 0, 2, 4, 8),
      KHM: s('KHM', 3, 0, 0, 3, 2, 12),
    }),
    group('B', ['THA', 'VIE', 'MAS', 'LAO'], {
      THA: s('THA', 3, 3, 0, 0, 11, 0),
      VIE: s('VIE', 3, 2, 0, 1, 7, 4),
      MAS: s('MAS', 3, 1, 0, 2, 5, 6),
      LAO: s('LAO', 3, 0, 0, 3, 0, 13),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2008.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_THA: 'THA',
  SGP_VIE: 'VIE',
  THA_VIE: 'VIE',
};

const BRACKET_RAW: BracketRaw = [
  ['IDN', 'THA'],
  ['VIE', 'SGP'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
