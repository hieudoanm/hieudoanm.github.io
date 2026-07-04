import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2012: AfconYearData = {
  year: 2012,
  host: 'Equatorial Guinea',
  champion: 'Zambia',
  runnerUp: 'Ivory Coast',
  available: false,
  teams: {
    ANG: t('ANG', 'Angola', 'ao'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    BOT: t('BOT', 'Botswana', 'bo'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    EQG: t('EQG', 'Equatorial Guinea', 'gq'),
    GAB: t('GAB', 'Gabon', 'ga'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GUI: t('GUI', 'Guinea', 'gn'),
    LBY: t('LBY', 'Libya', 'ly'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    NIG: t('NIG', 'Niger', 'ne'),
    SDN: t('SDN', 'Sudan', 'sd'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['ZAM', 'EQG', 'LBY', 'SEN'], {
      ZAM: s('ZAM', 3, 2, 1, 0, 5, 3),
      EQG: s('EQG', 3, 2, 0, 1, 3, 2),
      LBY: s('LBY', 3, 1, 1, 1, 4, 4),
      SEN: s('SEN', 3, 0, 0, 3, 3, 6),
    }),
    group('B', ['CIV', 'ANG', 'SDN', 'BFA'], {
      CIV: s('CIV', 3, 3, 0, 0, 5, 0),
      ANG: s('ANG', 3, 1, 1, 1, 4, 5),
      SDN: s('SDN', 3, 1, 1, 1, 4, 4),
      BFA: s('BFA', 3, 0, 0, 3, 2, 6),
    }),
    group('C', ['GAB', 'TUN', 'MAR', 'NIG'], {
      GAB: s('GAB', 3, 3, 0, 0, 6, 2),
      TUN: s('TUN', 3, 2, 0, 1, 4, 3),
      MAR: s('MAR', 3, 1, 0, 2, 4, 5),
      NIG: s('NIG', 3, 0, 0, 3, 1, 5),
    }),
    group('D', ['GHA', 'MLI', 'GUI', 'BOT'], {
      GHA: s('GHA', 3, 2, 1, 0, 4, 1),
      MLI: s('MLI', 3, 2, 0, 1, 3, 3),
      GUI: s('GUI', 3, 1, 1, 1, 7, 3),
      BOT: s('BOT', 3, 0, 0, 3, 2, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2012.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  CIV_EQG: 'CIV',
  GAB_MLI: 'MLI',
  GHA_TUN: 'GHA',
  SDN_ZAM: 'ZAM',
  // Semi Final
  CIV_ZAM: 'ZAM',
  GHA_MLI: 'MLI',
  // Final
  CIV_MLI: 'CIV',
  GHA_ZAM: 'ZAM',
};

const THIRD_PLACE: [string, string] = ['GHA', 'MLI'];

const BRACKET_RAW: BracketRaw = [
  [
    ['EQG', 'CIV'],
    ['ZAM', 'SDN'],
  ],
  [
    ['GAB', 'MLI'],
    ['GHA', 'TUN'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
