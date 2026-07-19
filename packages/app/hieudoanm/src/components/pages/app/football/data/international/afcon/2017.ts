import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2017: AfconYearData = {
  year: 2017,
  host: 'Gabon',
  champion: 'Cameroon',
  runnerUp: 'Egypt',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GAB: t('GAB', 'Gabon', 'ga'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GNB: t('GNB', 'Guinea-Bissau', 'gw'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TOG: t('TOG', 'Togo', 'tg'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    UGA: t('UGA', 'Uganda', 'ug'),
    ZIM: t('ZIM', 'Zimbabwe', 'zw'),
  },
  groups: [
    group('A', ['BFA', 'CMR', 'GAB', 'GNB'], {
      BFA: s('BFA', 3, 1, 2, 0, 4, 2),
      CMR: s('CMR', 3, 1, 2, 0, 3, 2),
      GAB: s('GAB', 3, 0, 3, 0, 2, 2),
      GNB: s('GNB', 3, 0, 1, 2, 2, 5),
    }),
    group('B', ['SEN', 'TUN', 'ALG', 'ZIM'], {
      SEN: s('SEN', 3, 2, 1, 0, 6, 2),
      TUN: s('TUN', 3, 2, 0, 1, 6, 5),
      ALG: s('ALG', 3, 0, 2, 1, 5, 6),
      ZIM: s('ZIM', 3, 0, 1, 2, 4, 8),
    }),
    group('C', ['COD', 'MAR', 'CIV', 'TOG'], {
      COD: s('COD', 3, 2, 1, 0, 6, 3),
      MAR: s('MAR', 3, 2, 0, 1, 4, 2),
      CIV: s('CIV', 3, 0, 2, 1, 2, 3),
      TOG: s('TOG', 3, 0, 1, 2, 2, 6),
    }),
    group('D', ['EGY', 'GHA', 'MLI', 'UGA'], {
      EGY: s('EGY', 3, 2, 1, 0, 2, 0),
      GHA: s('GHA', 3, 2, 0, 1, 2, 1),
      MLI: s('MLI', 3, 0, 2, 1, 1, 2),
      UGA: s('UGA', 3, 0, 1, 2, 1, 3),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2017.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  BFA_TUN: 'BFA',
  CMR_SEN: 'CMR',
  COD_GHA: 'GHA',
  EGY_MAR: 'EGY',
  // Final
  BFA_EGY: 'EGY',
  BFA_GHA: 'BFA',
  CMR_EGY: 'CMR',
  CMR_GHA: 'CMR',
};

const THIRD_PLACE: [string, string] = ['BFA', 'GHA'];

const BRACKET_RAW: BracketRaw = [
  [
    ['BFA', 'TUN'],
    ['SEN', 'CMR'],
  ],
  [
    ['COD', 'GHA'],
    ['EGY', 'MAR'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
