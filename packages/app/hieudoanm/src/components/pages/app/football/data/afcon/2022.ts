import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2022: AfconYearData = {
  year: 2022,
  host: 'Cameroon',
  champion: 'Senegal',
  runnerUp: 'Egypt',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COM: t('COM', 'Comoros', 'km'),
    CPV: t('CPV', 'Cape Verde', 'cv'),
    EGY: t('EGY', 'Egypt', 'eg'),
    EQG: t('EQG', 'Equatorial Guinea', 'gq'),
    ETH: t('ETH', 'Ethiopia', 'et'),
    GAB: t('GAB', 'Gabon', 'ga'),
    GAM: t('GAM', 'Gambia', 'gm'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GNB: t('GNB', 'Guinea-Bissau', 'gw'),
    GUI: t('GUI', 'Guinea', 'gn'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    MTN: t('MTN', 'Mauritania', 'mr'),
    MWI: t('MWI', 'Malawi', 'mw'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    SDN: t('SDN', 'Sudan', 'sd'),
    SEN: t('SEN', 'Senegal', 'sn'),
    SLE: t('SLE', 'Sierra Leone', 'sl'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZIM: t('ZIM', 'Zimbabwe', 'zw'),
  },
  groups: [
    group('A', ['CMR', 'CPV', 'BFA', 'ETH'], {
      CMR: s('CMR', 3, 2, 1, 0, 7, 3),
      CPV: s('CPV', 3, 1, 1, 1, 2, 2),
      BFA: s('BFA', 3, 1, 1, 1, 3, 3),
      ETH: s('ETH', 3, 0, 1, 2, 2, 6),
    }),
    group('B', ['SEN', 'GUI', 'MWI', 'ZIM'], {
      SEN: s('SEN', 3, 1, 2, 0, 1, 0),
      GUI: s('GUI', 3, 1, 1, 1, 2, 2),
      MWI: s('MWI', 3, 1, 1, 1, 2, 2),
      ZIM: s('ZIM', 3, 1, 0, 2, 3, 4),
    }),
    group('C', ['MAR', 'GAB', 'COM', 'GHA'], {
      MAR: s('MAR', 3, 2, 1, 0, 5, 2),
      GAB: s('GAB', 3, 1, 2, 0, 4, 3),
      COM: s('COM', 3, 1, 0, 2, 3, 5),
      GHA: s('GHA', 3, 0, 1, 2, 3, 5),
    }),
    group('D', ['NGA', 'EGY', 'SDN', 'GNB'], {
      NGA: s('NGA', 3, 3, 0, 0, 6, 1),
      EGY: s('EGY', 3, 2, 0, 1, 2, 1),
      SDN: s('SDN', 3, 0, 1, 2, 1, 4),
      GNB: s('GNB', 3, 0, 1, 2, 0, 3),
    }),
    group('E', ['CIV', 'EQG', 'SLE', 'ALG'], {
      CIV: s('CIV', 3, 2, 1, 0, 6, 3),
      EQG: s('EQG', 3, 2, 0, 1, 2, 1),
      SLE: s('SLE', 3, 0, 2, 1, 2, 3),
      ALG: s('ALG', 3, 0, 1, 2, 1, 4),
    }),
    group('F', ['MLI', 'GAM', 'TUN', 'MTN'], {
      MLI: s('MLI', 3, 2, 1, 0, 4, 1),
      GAM: s('GAM', 3, 2, 1, 0, 3, 1),
      TUN: s('TUN', 3, 1, 0, 2, 4, 2),
      MTN: s('MTN', 3, 0, 0, 3, 0, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2022.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  BFA_GAB: 'BFA',
  CIV_EGY: 'EGY',
  CMR_COM: 'CMR',
  CPV_SEN: 'SEN',
  EQG_MLI: 'EQG',
  GAM_GUI: 'GAM',
  MAR_MWI: 'MAR',
  NGA_TUN: 'TUN',
  // Quarter Final
  BFA_TUN: 'BFA',
  CMR_GAM: 'CMR',
  // Semi Final
  BFA_CMR: 'CMR',
  EGY_MAR: 'EGY',
  EGY_SEN: 'SEN',
  EQG_SEN: 'SEN',
  // Final
  BFA_SEN: 'SEN',
  CMR_EGY: 'EGY',
};

const THIRD_PLACE: [string, string] = ['CMR', 'BFA'];

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['BFA', 'GAB'],
      ['NGA', 'TUN'],
    ],
    [
      ['CMR', 'COM'],
      ['GUI', 'GAM'],
    ],
  ],
  [
    [
      ['MAR', 'MWI'],
      ['SEN', 'CPV'],
    ],
    [
      ['CIV', 'EGY'],
      ['MLI', 'EQG'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
