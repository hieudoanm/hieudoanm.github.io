import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2002: AfconYearData = {
  year: 2002,
  host: 'Mali',
  champion: 'Cameroon',
  runnerUp: 'Senegal',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GHA: t('GHA', 'Ghana', 'gh'),
    LBR: t('LBR', 'Liberia', 'lr'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    RSA: t('RSA', 'South Africa', 'za'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TOG: t('TOG', 'Togo', 'tg'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['NGA', 'MLI', 'LBR', 'ALG'], {
      NGA: s('NGA', 3, 2, 1, 0, 2, 0),
      MLI: s('MLI', 3, 1, 2, 0, 3, 1),
      LBR: s('LBR', 3, 0, 2, 1, 3, 4),
      ALG: s('ALG', 3, 0, 1, 2, 2, 5),
    }),
    group('B', ['RSA', 'GHA', 'MAR', 'BFA'], {
      RSA: s('RSA', 3, 1, 2, 0, 3, 1),
      GHA: s('GHA', 3, 1, 2, 0, 2, 1),
      MAR: s('MAR', 3, 1, 1, 1, 3, 4),
      BFA: s('BFA', 3, 0, 1, 2, 2, 4),
    }),
    group('C', ['CMR', 'COD', 'TOG', 'CIV'], {
      CMR: s('CMR', 3, 3, 0, 0, 5, 0),
      COD: s('COD', 3, 1, 1, 1, 3, 2),
      TOG: s('TOG', 3, 0, 2, 1, 0, 3),
      CIV: s('CIV', 3, 0, 1, 2, 1, 4),
    }),
    group('D', ['SEN', 'EGY', 'TUN', 'ZAM'], {
      SEN: s('SEN', 3, 2, 1, 0, 2, 0),
      EGY: s('EGY', 3, 2, 0, 1, 3, 2),
      TUN: s('TUN', 3, 0, 2, 1, 0, 1),
      ZAM: s('ZAM', 3, 0, 1, 2, 1, 3),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2002.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  CMR_EGY: 'CMR',
  COD_SEN: 'SEN',
  GHA_NGA: 'NGA',
  MLI_RSA: 'MLI',
  // Semi Final
  CMR_SEN: 'CMR',
  MLI_NGA: 'NGA',
  // Final
  CMR_MLI: 'CMR',
  NGA_SEN: 'SEN',
};

const THIRD_PLACE: [string, string] = ['MLI', 'NGA'];

const BRACKET_RAW: BracketRaw = [
  [
    ['MLI', 'RSA'],
    ['NGA', 'GHA'],
  ],
  [
    ['CMR', 'EGY'],
    ['SEN', 'COD'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
