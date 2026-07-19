import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1994: AfconYearData = {
  year: 1994,
  host: 'Tunisia',
  champion: 'Nigeria',
  runnerUp: 'Zambia',
  available: false,
  teams: {
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GAB: t('GAB', 'Gabon', 'ga'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GUI: t('GUI', 'Guinea', 'gn'),
    MLI: t('MLI', 'Mali', 'ml'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    SEN: t('SEN', 'Senegal', 'sn'),
    SLE: t('SLE', 'Sierra Leone', 'sl'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
    ZAÏ: t('ZAÏ', 'Zaïre', 'za'),
  },
  groups: [
    group('A', ['ZAÏ', 'MLI', 'TUN'], {
      ZAÏ: s('ZAÏ', 2, 1, 1, 0, 2, 1),
      MLI: s('MLI', 2, 1, 0, 1, 2, 1),
      TUN: s('TUN', 2, 0, 1, 1, 1, 3),
    }),
    group('B', ['NGA', 'EGY', 'GAB'], {
      NGA: s('NGA', 2, 1, 1, 0, 3, 0),
      EGY: s('EGY', 2, 1, 1, 0, 4, 0),
      GAB: s('GAB', 2, 0, 0, 2, 0, 7),
    }),
    group('C', ['ZAM', 'CIV', 'SLE'], {
      ZAM: s('ZAM', 2, 1, 1, 0, 1, 0),
      CIV: s('CIV', 2, 1, 0, 1, 4, 1),
      SLE: s('SLE', 2, 0, 1, 1, 0, 4),
    }),
    group('D', ['GHA', 'SEN', 'GUI'], {
      GHA: s('GHA', 2, 2, 0, 0, 2, 0),
      SEN: s('SEN', 2, 1, 0, 1, 2, 2),
      GUI: s('GUI', 2, 0, 0, 2, 1, 3),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1994.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  CIV_GHA: 'CIV',
  EGY_MLI: 'MLI',
  NGA_ZAÏ: 'NGA',
  SEN_ZAM: 'ZAM',
  // Final
  CIV_MLI: 'CIV',
  CIV_NGA: 'NGA',
  MLI_ZAM: 'ZAM',
  NGA_ZAM: 'NGA',
};

const THIRD_PLACE: [string, string] = ['CIV', 'MLI'];

const BRACKET_RAW: BracketRaw = [
  [
    ['ZAÏ', 'NGA'],
    ['EGY', 'MLI'],
  ],
  [
    ['GHA', 'CIV'],
    ['ZAM', 'SEN'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
