import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_1996: AseanYearData = {
  year: 1996,
  host: 'Singapore',
  champion: 'Malaysia',
  runnerUp: 'Thailand',
  available: false,
  teams: {
    BRN: t('BRN', 'Brunei', 'bn'),
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
    group('A', ['THA', 'MAS', 'SGP', 'BRN', 'PHL'], {
      THA: s('THA', 4, 3, 1, 0, 13, 1),
      MAS: s('MAS', 4, 2, 2, 0, 15, 2),
      SGP: s('SGP', 4, 2, 1, 1, 7, 2),
      BRN: s('BRN', 4, 1, 0, 3, 1, 15),
      PHL: s('PHL', 4, 0, 0, 4, 0, 16),
    }),
    group('B', ['IDN', 'VIE', 'MMR', 'LAO', 'KHM'], {
      IDN: s('IDN', 4, 3, 1, 0, 15, 3),
      VIE: s('VIE', 4, 2, 2, 0, 9, 4),
      MMR: s('MMR', 4, 2, 0, 2, 11, 12),
      LAO: s('LAO', 4, 1, 1, 2, 5, 10),
      KHM: s('KHM', 4, 0, 0, 4, 1, 12),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_1996.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_MAS: 'MAS',
  IDN_VIE: 'VIE',
  MAS_THA: 'THA',
  THA_VIE: 'THA',
};

const BRACKET_RAW: BracketRaw = [
  ['MAS', 'IDN'],
  ['THA', 'VIE'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
