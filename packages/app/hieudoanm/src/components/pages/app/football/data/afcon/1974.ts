import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1974: AfconYearData = {
  year: 1974,
  host: 'Egypt',
  champion: 'Zaïre',
  runnerUp: 'Zambia',
  available: false,
  teams: {
    CGO: t('CGO', 'Congo', 'cg'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GUI: t('GUI', 'Guinea', 'gn'),
    MRI: t('MRI', 'Mauritius', 'mu'),
    UGA: t('UGA', 'Uganda', 'ug'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
    ZAÏ: t('ZAÏ', 'Zaïre', 'za'),
  },
  groups: [
    group('A', ['EGY', 'ZAM', 'UGA', 'CIV'], {
      EGY: s('EGY', 3, 3, 0, 0, 7, 2),
      ZAM: s('ZAM', 3, 2, 0, 1, 3, 3),
      UGA: s('UGA', 3, 0, 1, 2, 3, 5),
      CIV: s('CIV', 3, 0, 1, 2, 2, 5),
    }),
    group('B', ['CGO', 'ZAÏ', 'GUI', 'MRI'], {
      CGO: s('CGO', 3, 2, 1, 0, 5, 2),
      ZAÏ: s('ZAÏ', 3, 2, 0, 1, 7, 4),
      GUI: s('GUI', 3, 1, 1, 1, 4, 4),
      MRI: s('MRI', 3, 0, 0, 3, 2, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1974.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  CGO_ZAM: 'ZAM',
  EGY_ZAÏ: 'ZAÏ',
  // Final
  CGO_EGY: 'EGY',
  ZAM_ZAÏ: 'ZAÏ',
};

const THIRD_PLACE: [string, string] = ['EGY', 'CGO'];

const BRACKET_RAW: BracketRaw = [
  ['CGO', 'ZAM'],
  ['EGY', 'ZAÏ'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
