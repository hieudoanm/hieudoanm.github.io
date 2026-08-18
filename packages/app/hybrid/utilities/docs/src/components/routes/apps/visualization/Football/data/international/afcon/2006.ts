import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2006: AfconYearData = {
  year: 2006,
  host: 'Egypt',
  champion: 'Egypt',
  runnerUp: 'Ivory Coast',
  available: false,
  teams: {
    ANG: t('ANG', 'Angola', 'ao'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GUI: t('GUI', 'Guinea', 'gn'),
    LBY: t('LBY', 'Libya', 'ly'),
    MAR: t('MAR', 'Morocco', 'ma'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    RSA: t('RSA', 'South Africa', 'za'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TOG: t('TOG', 'Togo', 'tg'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
    ZIM: t('ZIM', 'Zimbabwe', 'zw'),
  },
  groups: [
    group('A', ['EGY', 'CIV', 'MAR', 'LBY'], {
      EGY: s('EGY', 3, 2, 1, 0, 6, 1),
      CIV: s('CIV', 3, 2, 0, 1, 4, 4),
      MAR: s('MAR', 3, 0, 2, 1, 0, 1),
      LBY: s('LBY', 3, 0, 1, 2, 1, 5),
    }),
    group('B', ['CMR', 'ANG', 'COD', 'TOG'], {
      CMR: s('CMR', 3, 3, 0, 0, 7, 1),
      ANG: s('ANG', 3, 1, 1, 1, 4, 5),
      COD: s('COD', 3, 1, 1, 1, 2, 2),
      TOG: s('TOG', 3, 0, 0, 3, 2, 7),
    }),
    group('C', ['GUI', 'TUN', 'ZAM', 'RSA'], {
      GUI: s('GUI', 3, 3, 0, 0, 7, 1),
      TUN: s('TUN', 3, 2, 0, 1, 6, 4),
      ZAM: s('ZAM', 3, 1, 0, 2, 3, 6),
      RSA: s('RSA', 3, 0, 0, 3, 0, 5),
    }),
    group('D', ['NGA', 'ZIM', 'SEN', 'GHA'], {
      NGA: s('NGA', 3, 3, 0, 0, 5, 1),
      ZIM: s('ZIM', 3, 1, 0, 2, 2, 5),
      SEN: s('SEN', 3, 1, 0, 2, 3, 3),
      GHA: s('GHA', 3, 1, 0, 2, 2, 3),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2006.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  CIV_CMR: 'CIV',
  COD_EGY: 'EGY',
  GUI_SEN: 'SEN',
  NGA_TUN: 'NGA',
  // Semi Final
  CIV_NGA: 'CIV',
  EGY_SEN: 'EGY',
  // Final
  CIV_EGY: 'EGY',
  NGA_SEN: 'NGA',
};

const THIRD_PLACE: [string, string] = ['SEN', 'NGA'];

const BRACKET_RAW: BracketRaw = [
  [
    ['EGY', 'COD'],
    ['GUI', 'SEN'],
  ],
  [
    ['CMR', 'CIV'],
    ['NGA', 'TUN'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
