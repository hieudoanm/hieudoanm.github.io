import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1998: AfconYearData = {
  year: 1998,
  host: 'Burkina Faso',
  champion: 'Egypt',
  runnerUp: 'South Africa',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    ANG: t('ANG', 'Angola', 'ao'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GUI: t('GUI', 'Guinea', 'gn'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MOZ: t('MOZ', 'Mozambique', 'mz'),
    NAM: t('NAM', 'Namibia', 'na'),
    RSA: t('RSA', 'South Africa', 'za'),
    TOG: t('TOG', 'Togo', 'tg'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['CMR', 'BFA', 'GUI', 'ALG'], {
      CMR: s('CMR', 3, 2, 1, 0, 5, 3),
      BFA: s('BFA', 3, 2, 0, 1, 3, 2),
      GUI: s('GUI', 3, 1, 1, 1, 3, 3),
      ALG: s('ALG', 3, 0, 0, 3, 2, 5),
    }),
    group('B', ['TUN', 'COD', 'GHA', 'TOG'], {
      TUN: s('TUN', 3, 2, 0, 1, 5, 4),
      COD: s('COD', 3, 2, 0, 1, 4, 3),
      GHA: s('GHA', 3, 1, 0, 2, 3, 3),
      TOG: s('TOG', 3, 1, 0, 2, 4, 6),
    }),
    group('C', ['CIV', 'RSA', 'ANG', 'NAM'], {
      CIV: s('CIV', 3, 2, 1, 0, 10, 6),
      RSA: s('RSA', 3, 1, 2, 0, 5, 2),
      ANG: s('ANG', 3, 0, 2, 1, 5, 8),
      NAM: s('NAM', 3, 0, 1, 2, 7, 11),
    }),
    group('D', ['MAR', 'EGY', 'ZAM', 'MOZ'], {
      MAR: s('MAR', 3, 2, 1, 0, 5, 1),
      EGY: s('EGY', 3, 2, 0, 1, 6, 1),
      ZAM: s('ZAM', 3, 1, 1, 1, 4, 6),
      MOZ: s('MOZ', 3, 0, 0, 3, 1, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1998.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  BFA_TUN: 'BFA',
  CIV_EGY: 'EGY',
  CMR_COD: 'COD',
  MAR_RSA: 'RSA',
  // Semi Final
  BFA_COD: 'COD',
  EGY_RSA: 'EGY',
  // Final
  BFA_EGY: 'EGY',
  COD_RSA: 'RSA',
};

const THIRD_PLACE: [string, string] = ['BFA', 'COD'];

const BRACKET_RAW: BracketRaw = [
  [
    ['CMR', 'COD'],
    ['BFA', 'TUN'],
  ],
  [
    ['CIV', 'EGY'],
    ['MAR', 'RSA'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
