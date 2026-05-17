import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2019: AfconYearData = {
  year: 2019,
  host: 'Egypt',
  champion: 'Algeria',
  runnerUp: 'Senegal',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    ANG: t('ANG', 'Angola', 'ao'),
    BDI: t('BDI', 'Burundi', 'bi'),
    BEN: t('BEN', 'Benin', 'be'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GNB: t('GNB', 'Guinea-Bissau', 'gw'),
    GUI: t('GUI', 'Guinea', 'gn'),
    KEN: t('KEN', 'Kenya', 'ke'),
    MAD: t('MAD', 'Madagascar', 'mg'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    MTN: t('MTN', 'Mauritania', 'mr'),
    NAM: t('NAM', 'Namibia', 'na'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    RSA: t('RSA', 'South Africa', 'za'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TAN: t('TAN', 'Tanzania', 'tz'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    UGA: t('UGA', 'Uganda', 'ug'),
    ZIM: t('ZIM', 'Zimbabwe', 'zw'),
  },
  groups: [
    group('A', ['EGY', 'UGA', 'COD', 'ZIM'], {
      EGY: s('EGY', 3, 3, 0, 0, 5, 0),
      UGA: s('UGA', 3, 1, 1, 1, 3, 3),
      COD: s('COD', 3, 1, 0, 2, 4, 4),
      ZIM: s('ZIM', 3, 0, 1, 2, 1, 6),
    }),
    group('B', ['MAD', 'NGA', 'GUI', 'BDI'], {
      MAD: s('MAD', 3, 2, 1, 0, 5, 2),
      NGA: s('NGA', 3, 2, 0, 1, 2, 2),
      GUI: s('GUI', 3, 1, 1, 1, 4, 3),
      BDI: s('BDI', 3, 0, 0, 3, 0, 4),
    }),
    group('C', ['ALG', 'SEN', 'KEN', 'TAN'], {
      ALG: s('ALG', 3, 3, 0, 0, 6, 0),
      SEN: s('SEN', 3, 2, 0, 1, 5, 1),
      KEN: s('KEN', 3, 1, 0, 2, 3, 7),
      TAN: s('TAN', 3, 0, 0, 3, 2, 8),
    }),
    group('D', ['MAR', 'CIV', 'RSA', 'NAM'], {
      MAR: s('MAR', 3, 3, 0, 0, 3, 0),
      CIV: s('CIV', 3, 2, 0, 1, 5, 2),
      RSA: s('RSA', 3, 1, 0, 2, 1, 2),
      NAM: s('NAM', 3, 0, 0, 3, 1, 6),
    }),
    group('E', ['MLI', 'TUN', 'MTN', 'ANG'], {
      MLI: s('MLI', 3, 2, 1, 0, 6, 2),
      TUN: s('TUN', 3, 0, 3, 0, 2, 2),
      MTN: s('MTN', 3, 0, 2, 1, 1, 4),
      ANG: s('ANG', 3, 0, 2, 1, 1, 2),
    }),
    group('F', ['CMR', 'GHA', 'BEN', 'GNB'], {
      CMR: s('CMR', 3, 1, 2, 0, 2, 0),
      GHA: s('GHA', 3, 1, 2, 0, 4, 2),
      BEN: s('BEN', 3, 0, 3, 0, 2, 2),
      GNB: s('GNB', 3, 0, 1, 2, 0, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2019.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  ALG_GUI: 'ALG',
  BEN_MAR: 'BEN',
  CIV_MLI: 'CIV',
  CMR_NGA: 'NGA',
  COD_MAD: 'MAD',
  EGY_RSA: 'RSA',
  GHA_TUN: 'TUN',
  SEN_UGA: 'SEN',
  // Quarter Final
  BEN_SEN: 'SEN',
  NGA_RSA: 'NGA',
  // Semi Final
  ALG_CIV: 'ALG',
  MAD_TUN: 'TUN',
  // Final
  ALG_NGA: 'ALG',
  ALG_SEN: 'ALG',
  NGA_TUN: 'NGA',
  SEN_TUN: 'SEN',
};

const THIRD_PLACE: [string, string] = ['TUN', 'NGA'];

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['MAR', 'BEN'],
      ['UGA', 'SEN'],
    ],
    [
      ['EGY', 'RSA'],
      ['NGA', 'CMR'],
    ],
  ],
  [
    [
      ['ALG', 'GUI'],
      ['MAD', 'COD'],
    ],
    [
      ['GHA', 'TUN'],
      ['MLI', 'CIV'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
