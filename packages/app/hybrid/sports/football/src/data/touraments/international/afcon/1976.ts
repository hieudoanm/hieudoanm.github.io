import { s, t, group } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1976: AfconYearData = {
  year: 1976,
  host: 'Ethiopia',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    EGY: t('EGY', 'Egypt', 'eg'),
    ETH: t('ETH', 'Ethiopia', 'et'),
    GUI: t('GUI', 'Guinea', 'gn'),
    MAR: t('MAR', 'Morocco', 'ma'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    SDN: t('SDN', 'Sudan', 'sd'),
    UGA: t('UGA', 'Uganda', 'ug'),
    ZAÏ: t('ZAÏ', 'Zaïre', 'za'),
  },
  groups: [
    group('A', ['GUI', 'EGY', 'ETH', 'UGA'], {
      GUI: s('GUI', 3, 2, 1, 0, 5, 3),
      EGY: s('EGY', 3, 1, 2, 0, 4, 3),
      ETH: s('ETH', 3, 1, 1, 1, 4, 3),
      UGA: s('UGA', 3, 0, 0, 3, 2, 6),
    }),
    group('B', ['MAR', 'NGA', 'SDN', 'ZAÏ'], {
      MAR: s('MAR', 3, 2, 1, 0, 6, 3),
      NGA: s('NGA', 3, 2, 0, 1, 6, 5),
      SDN: s('SDN', 3, 0, 2, 1, 3, 4),
      ZAÏ: s('ZAÏ', 3, 0, 1, 2, 3, 6),
    }),
  ],
};

export const KNOCKOUT: KnockoutYearData | null = null;
