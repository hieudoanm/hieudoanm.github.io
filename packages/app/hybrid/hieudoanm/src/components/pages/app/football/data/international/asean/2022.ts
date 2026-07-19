import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2022: AseanYearData = {
  year: 2022,
  host: 'Southeast Asia',
  champion: null,
  runnerUp: null,
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
    group('A', ['THA', 'IDN', 'KHM', 'PHL', 'BRN'], {
      THA: s('THA', 4, 2, 2, 0, 12, 3),
      IDN: s('IDN', 4, 2, 2, 0, 12, 4),
      KHM: s('KHM', 3, 2, 0, 1, 9, 5),
      PHL: s('PHL', 3, 1, 0, 2, 7, 8),
      BRN: s('BRN', 4, 0, 0, 4, 2, 22),
    }),
    group('B', ['VIE', 'SGP', 'MAS', 'MMR', 'LAO'], {
      VIE: s('VIE', 3, 2, 1, 0, 9, 0),
      SGP: s('SGP', 3, 2, 1, 0, 5, 2),
      MAS: s('MAS', 3, 2, 0, 1, 6, 3),
      MMR: s('MMR', 3, 0, 1, 2, 4, 6),
      LAO: s('LAO', 4, 0, 1, 3, 2, 15),
    }),
  ],
};

export const KNOCKOUT: AseanKnockoutYearData | null = null;
