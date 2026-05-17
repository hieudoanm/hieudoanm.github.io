import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2000: AfconYearData = {
  year: 2000,
  host: 'Ghana',
  champion: 'Cameroon',
  runnerUp: 'Nigeria',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CGO: t('CGO', 'Congo', 'cg'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GAB: t('GAB', 'Gabon', 'ga'),
    GHA: t('GHA', 'Ghana', 'gh'),
    MAR: t('MAR', 'Morocco', 'ma'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    RSA: t('RSA', 'South Africa', 'za'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TOG: t('TOG', 'Togo', 'tg'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['GHA', 'CMR', 'CIV', 'TOG'], {
      GHA: s('GHA', 3, 1, 1, 1, 3, 3),
      CMR: s('CMR', 3, 1, 1, 1, 4, 2),
      CIV: s('CIV', 3, 1, 1, 1, 3, 4),
      TOG: s('TOG', 3, 1, 1, 1, 2, 3),
    }),
    group('B', ['RSA', 'ALG', 'COD', 'GAB'], {
      RSA: s('RSA', 3, 2, 1, 0, 5, 2),
      ALG: s('ALG', 3, 1, 2, 0, 4, 2),
      COD: s('COD', 3, 0, 2, 1, 0, 1),
      GAB: s('GAB', 3, 0, 1, 2, 2, 6),
    }),
    group('C', ['EGY', 'SEN', 'ZAM', 'BFA'], {
      EGY: s('EGY', 3, 3, 0, 0, 7, 2),
      SEN: s('SEN', 3, 1, 1, 1, 5, 4),
      ZAM: s('ZAM', 3, 0, 2, 1, 3, 5),
      BFA: s('BFA', 3, 0, 1, 2, 4, 8),
    }),
    group('D', ['NGA', 'TUN', 'MAR', 'CGO'], {
      NGA: s('NGA', 3, 2, 1, 0, 6, 2),
      TUN: s('TUN', 3, 1, 1, 1, 3, 4),
      MAR: s('MAR', 3, 1, 1, 1, 1, 2),
      CGO: s('CGO', 3, 0, 1, 2, 0, 2),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2000.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ALG_CMR: 'CMR',
  EGY_TUN: 'TUN',
  GHA_RSA: 'RSA',
  NGA_SEN: 'NGA',
  // Final
  CMR_NGA: 'CMR',
  CMR_TUN: 'CMR',
  NGA_RSA: 'NGA',
  RSA_TUN: 'RSA',
};

const THIRD_PLACE: [string, string] = ['RSA', 'TUN'];

const BRACKET_RAW: BracketRaw = [
  [
    ['CMR', 'ALG'],
    ['GHA', 'RSA'],
  ],
  [
    ['EGY', 'TUN'],
    ['NGA', 'SEN'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
