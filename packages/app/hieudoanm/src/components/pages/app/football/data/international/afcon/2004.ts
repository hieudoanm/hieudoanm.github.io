import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2004: AfconYearData = {
  year: 2004,
  host: 'Tunisia',
  champion: 'Tunisia',
  runnerUp: 'Morocco',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    BEN: t('BEN', 'Benin', 'be'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GUI: t('GUI', 'Guinea', 'gn'),
    KEN: t('KEN', 'Kenya', 'ke'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    RSA: t('RSA', 'South Africa', 'za'),
    RWA: t('RWA', 'Rwanda', 'rw'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZIM: t('ZIM', 'Zimbabwe', 'zw'),
  },
  groups: [
    group('A', ['TUN', 'GUI', 'RWA', 'COD'], {
      TUN: s('TUN', 3, 2, 1, 0, 6, 2),
      GUI: s('GUI', 3, 1, 2, 0, 4, 3),
      RWA: s('RWA', 3, 1, 1, 1, 3, 3),
      COD: s('COD', 3, 0, 0, 3, 1, 6),
    }),
    group('B', ['MLI', 'SEN', 'KEN', 'BFA'], {
      MLI: s('MLI', 3, 2, 1, 0, 7, 3),
      SEN: s('SEN', 3, 1, 2, 0, 4, 1),
      KEN: s('KEN', 3, 1, 0, 2, 4, 6),
      BFA: s('BFA', 3, 0, 1, 2, 1, 6),
    }),
    group('C', ['CMR', 'ALG', 'EGY', 'ZIM'], {
      CMR: s('CMR', 3, 1, 2, 0, 6, 4),
      ALG: s('ALG', 3, 1, 1, 1, 4, 4),
      EGY: s('EGY', 3, 1, 1, 1, 3, 3),
      ZIM: s('ZIM', 3, 1, 0, 2, 6, 8),
    }),
    group('D', ['MAR', 'NGA', 'RSA', 'BEN'], {
      MAR: s('MAR', 3, 2, 1, 0, 6, 1),
      NGA: s('NGA', 3, 2, 0, 1, 6, 2),
      RSA: s('RSA', 3, 1, 1, 1, 3, 5),
      BEN: s('BEN', 3, 0, 0, 3, 1, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2004.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ALG_MAR: 'MAR',
  CMR_NGA: 'NGA',
  GUI_MLI: 'MLI',
  SEN_TUN: 'TUN',
  // Final
  MAR_MLI: 'MAR',
  MAR_TUN: 'TUN',
  MLI_NGA: 'NGA',
  NGA_TUN: 'TUN',
};

const THIRD_PLACE: [string, string] = ['NGA', 'MLI'];

const BRACKET_RAW: BracketRaw = [
  [
    ['MLI', 'GUI'],
    ['TUN', 'SEN'],
  ],
  [
    ['CMR', 'NGA'],
    ['MAR', 'ALG'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
