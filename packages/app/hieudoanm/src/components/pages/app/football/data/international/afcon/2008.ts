import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2008: AfconYearData = {
  year: 2008,
  host: 'Ghana',
  champion: 'Egypt',
  runnerUp: 'Cameroon',
  available: false,
  teams: {
    ANG: t('ANG', 'Angola', 'ao'),
    BEN: t('BEN', 'Benin', 'be'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GUI: t('GUI', 'Guinea', 'gn'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    NAM: t('NAM', 'Namibia', 'na'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    RSA: t('RSA', 'South Africa', 'za'),
    SDN: t('SDN', 'Sudan', 'sd'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['GHA', 'GUI', 'MAR', 'NAM'], {
      GHA: s('GHA', 3, 3, 0, 0, 5, 1),
      GUI: s('GUI', 3, 1, 1, 1, 5, 5),
      MAR: s('MAR', 3, 1, 0, 2, 7, 6),
      NAM: s('NAM', 3, 0, 1, 2, 2, 7),
    }),
    group('B', ['CIV', 'MLI', 'NGA', 'BEN'], {
      CIV: s('CIV', 3, 3, 0, 0, 8, 1),
      MLI: s('MLI', 3, 1, 1, 1, 1, 3),
      NGA: s('NGA', 3, 1, 1, 1, 2, 1),
      BEN: s('BEN', 3, 0, 0, 3, 1, 7),
    }),
    group('C', ['EGY', 'CMR', 'ZAM', 'SDN'], {
      EGY: s('EGY', 3, 2, 1, 0, 8, 3),
      CMR: s('CMR', 3, 2, 0, 1, 10, 5),
      ZAM: s('ZAM', 3, 1, 1, 1, 5, 6),
      SDN: s('SDN', 3, 0, 0, 3, 0, 9),
    }),
    group('D', ['TUN', 'ANG', 'SEN', 'RSA'], {
      TUN: s('TUN', 3, 1, 2, 0, 5, 3),
      ANG: s('ANG', 3, 1, 2, 0, 4, 2),
      SEN: s('SEN', 3, 0, 2, 1, 4, 6),
      RSA: s('RSA', 3, 0, 2, 1, 3, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2008.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ANG_EGY: 'EGY',
  CIV_GUI: 'CIV',
  CMR_TUN: 'CMR',
  GHA_NGA: 'GHA',
  // Semi Final
  CIV_GHA: 'GHA',
  CMR_EGY: 'EGY',
  // Final
  CIV_EGY: 'EGY',
  CMR_GHA: 'CMR',
};

const THIRD_PLACE: [string, string] = ['GHA', 'CIV'];

const BRACKET_RAW: BracketRaw = [
  [
    ['GHA', 'NGA'],
    ['CIV', 'GUI'],
  ],
  [
    ['EGY', 'ANG'],
    ['TUN', 'CMR'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
