import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2024: AfconYearData = {
  year: 2024,
  host: 'Ivory Coast',
  champion: 'Ivory Coast',
  runnerUp: 'Nigeria',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    ANG: t('ANG', 'Angola', 'ao'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    CPV: t('CPV', 'Cape Verde', 'cv'),
    EGY: t('EGY', 'Egypt', 'eg'),
    EQG: t('EQG', 'Equatorial Guinea', 'gq'),
    GAM: t('GAM', 'Gambia', 'gm'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GNB: t('GNB', 'Guinea-Bissau', 'gw'),
    GUI: t('GUI', 'Guinea', 'gn'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    MOZ: t('MOZ', 'Mozambique', 'mz'),
    MTN: t('MTN', 'Mauritania', 'mr'),
    NAM: t('NAM', 'Namibia', 'na'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    RSA: t('RSA', 'South Africa', 'za'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TAN: t('TAN', 'Tanzania', 'tz'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['NGA', 'EQG', 'CIV', 'GNB'], {
      NGA: s('NGA', 3, 2, 1, 0, 3, 1),
      EQG: s('EQG', 3, 2, 1, 0, 9, 3),
      CIV: s('CIV', 3, 1, 0, 2, 2, 5),
      GNB: s('GNB', 3, 0, 0, 3, 2, 7),
    }),
    group('B', ['CPV', 'EGY', 'GHA', 'MOZ'], {
      CPV: s('CPV', 3, 2, 1, 0, 7, 3),
      EGY: s('EGY', 3, 0, 3, 0, 6, 6),
      GHA: s('GHA', 3, 0, 2, 1, 5, 6),
      MOZ: s('MOZ', 3, 0, 2, 1, 4, 7),
    }),
    group('C', ['SEN', 'CMR', 'GUI', 'GAM'], {
      SEN: s('SEN', 3, 3, 0, 0, 8, 1),
      CMR: s('CMR', 3, 1, 1, 1, 5, 6),
      GUI: s('GUI', 3, 1, 1, 1, 2, 3),
      GAM: s('GAM', 3, 0, 0, 3, 2, 7),
    }),
    group('D', ['ANG', 'BFA', 'MTN', 'ALG'], {
      ANG: s('ANG', 3, 2, 1, 0, 6, 3),
      BFA: s('BFA', 3, 1, 1, 1, 3, 4),
      MTN: s('MTN', 3, 1, 0, 2, 3, 4),
      ALG: s('ALG', 3, 0, 2, 1, 3, 4),
    }),
    group('E', ['MLI', 'RSA', 'NAM', 'TUN'], {
      MLI: s('MLI', 3, 1, 2, 0, 3, 1),
      RSA: s('RSA', 3, 1, 1, 1, 4, 2),
      NAM: s('NAM', 3, 1, 1, 1, 1, 4),
      TUN: s('TUN', 3, 0, 2, 1, 1, 2),
    }),
    group('F', ['MAR', 'COD', 'TAN', 'ZAM'], {
      MAR: s('MAR', 3, 2, 1, 0, 5, 1),
      COD: s('COD', 3, 0, 3, 0, 2, 2),
      TAN: s('TAN', 3, 0, 2, 1, 1, 4),
      ZAM: s('ZAM', 3, 0, 2, 1, 2, 3),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2024.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  ANG_NAM: 'ANG',
  BFA_MLI: 'MLI',
  CIV_SEN: 'CIV',
  CMR_NGA: 'NGA',
  COD_EGY: 'COD',
  CPV_MTN: 'CPV',
  EQG_GUI: 'GUI',
  MAR_RSA: 'RSA',
  // Quarter Final
  ANG_NGA: 'NGA',
  COD_GUI: 'COD',
  // Semi Final
  CIV_MLI: 'CIV',
  CPV_RSA: 'RSA',
  // Final
  CIV_COD: 'CIV',
  CIV_NGA: 'CIV',
  NGA_RSA: 'NGA',
};

const THIRD_PLACE: [string, string] = ['RSA', 'COD'];

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['ANG', 'NAM'],
      ['NGA', 'CMR'],
    ],
    [
      ['EGY', 'COD'],
      ['EQG', 'GUI'],
    ],
  ],
  [
    [
      ['CPV', 'MTN'],
      ['CIV', 'SEN'],
    ],
    [
      ['MLI', 'BFA'],
      ['MAR', 'RSA'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
