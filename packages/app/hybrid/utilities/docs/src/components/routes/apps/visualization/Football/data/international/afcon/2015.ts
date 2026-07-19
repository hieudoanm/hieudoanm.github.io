import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2015: AfconYearData = {
  year: 2015,
  host: 'Equatorial Guinea',
  champion: 'Ivory Coast',
  runnerUp: 'Ghana',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CGO: t('CGO', 'Congo', 'cg'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    CPV: t('CPV', 'Cape Verde', 'cv'),
    EQG: t('EQG', 'Equatorial Guinea', 'gq'),
    GAB: t('GAB', 'Gabon', 'ga'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GUI: t('GUI', 'Guinea', 'gn'),
    MLI: t('MLI', 'Mali', 'ml'),
    RSA: t('RSA', 'South Africa', 'za'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['CGO', 'EQG', 'GAB', 'BFA'], {
      CGO: s('CGO', 3, 2, 1, 0, 4, 2),
      EQG: s('EQG', 3, 1, 2, 0, 3, 1),
      GAB: s('GAB', 3, 1, 0, 2, 2, 3),
      BFA: s('BFA', 3, 0, 1, 2, 1, 4),
    }),
    group('B', ['TUN', 'CPV', 'COD', 'ZAM'], {
      TUN: s('TUN', 3, 1, 2, 0, 4, 3),
      CPV: s('CPV', 3, 0, 3, 0, 1, 1),
      COD: s('COD', 3, 0, 3, 0, 2, 2),
      ZAM: s('ZAM', 3, 0, 2, 1, 2, 3),
    }),
    group('C', ['GHA', 'ALG', 'SEN', 'RSA'], {
      GHA: s('GHA', 3, 2, 0, 1, 4, 3),
      ALG: s('ALG', 3, 2, 0, 1, 5, 2),
      SEN: s('SEN', 3, 1, 1, 1, 3, 4),
      RSA: s('RSA', 3, 0, 1, 2, 3, 6),
    }),
    group('D', ['CIV', 'MLI', 'GUI', 'CMR'], {
      CIV: s('CIV', 3, 1, 2, 0, 3, 2),
      MLI: s('MLI', 3, 0, 3, 0, 3, 3),
      GUI: s('GUI', 3, 0, 3, 0, 3, 3),
      CMR: s('CMR', 3, 0, 2, 1, 2, 3),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2015.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ALG_CIV: 'CIV',
  CGO_COD: 'COD',
  EQG_TUN: 'EQG',
  GHA_GUI: 'GHA',
  // Semi Final
  CIV_GHA: 'CIV',
  COD_EQG: 'COD',
  // Final
  CIV_COD: 'CIV',
  EQG_GHA: 'GHA',
};

const THIRD_PLACE: [string, string] = ['EQG', 'COD'];

const BRACKET_RAW: BracketRaw = [
  [
    ['CGO', 'COD'],
    ['EQG', 'TUN'],
  ],
  [
    ['GHA', 'GUI'],
    ['CIV', 'ALG'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
