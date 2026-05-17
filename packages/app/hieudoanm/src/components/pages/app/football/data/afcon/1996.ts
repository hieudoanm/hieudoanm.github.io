import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1996: AfconYearData = {
  year: 1996,
  host: 'South Africa',
  champion: 'South Africa',
  runnerUp: 'Tunisia',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    ANG: t('ANG', 'Angola', 'ao'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GAB: t('GAB', 'Gabon', 'ga'),
    GHA: t('GHA', 'Ghana', 'gh'),
    LBR: t('LBR', 'Liberia', 'lr'),
    MOZ: t('MOZ', 'Mozambique', 'mz'),
    RSA: t('RSA', 'South Africa', 'za'),
    SLE: t('SLE', 'Sierra Leone', 'sl'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
    ZAÏ: t('ZAÏ', 'Zaïre', 'za'),
  },
  groups: [
    group('A', ['RSA', 'EGY', 'CMR', 'ANG'], {
      RSA: s('RSA', 3, 2, 0, 1, 4, 1),
      EGY: s('EGY', 3, 2, 0, 1, 4, 3),
      CMR: s('CMR', 3, 1, 1, 1, 5, 7),
      ANG: s('ANG', 3, 0, 1, 2, 4, 6),
    }),
    group('B', ['ZAM', 'ALG', 'SLE', 'BFA'], {
      ZAM: s('ZAM', 3, 2, 1, 0, 9, 1),
      ALG: s('ALG', 3, 2, 1, 0, 4, 1),
      SLE: s('SLE', 3, 1, 0, 2, 2, 7),
      BFA: s('BFA', 3, 0, 0, 3, 3, 9),
    }),
    group('C', ['GAB', 'LBR', 'ZAÏ'], {
      GAB: s('GAB', 2, 1, 0, 1, 3, 2),
      LBR: s('LBR', 2, 1, 0, 1, 2, 3),
      ZAÏ: s('ZAÏ', 2, 1, 0, 1, 2, 2),
    }),
    group('D', ['GHA', 'TUN', 'CIV', 'MOZ'], {
      GHA: s('GHA', 3, 3, 0, 0, 6, 1),
      TUN: s('TUN', 3, 1, 1, 1, 5, 4),
      CIV: s('CIV', 3, 1, 0, 2, 2, 5),
      MOZ: s('MOZ', 3, 0, 1, 2, 1, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1996.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ALG_RSA: 'RSA',
  EGY_ZAM: 'ZAM',
  GAB_TUN: 'TUN',
  GHA_ZAÏ: 'GHA',
  // Final
  GHA_RSA: 'RSA',
  GHA_ZAM: 'ZAM',
  RSA_TUN: 'RSA',
  TUN_ZAM: 'TUN',
};

const THIRD_PLACE: [string, string] = ['ZAM', 'GHA'];

const BRACKET_RAW: BracketRaw = [
  [
    ['RSA', 'ALG'],
    ['ZAM', 'EGY'],
  ],
  [
    ['GAB', 'TUN'],
    ['GHA', 'ZAÏ'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
