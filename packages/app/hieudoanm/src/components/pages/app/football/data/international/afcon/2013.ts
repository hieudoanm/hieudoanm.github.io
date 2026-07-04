import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2013: AfconYearData = {
  year: 2013,
  host: 'South Africa',
  champion: 'Nigeria',
  runnerUp: 'Burkina Faso',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    ANG: t('ANG', 'Angola', 'ao'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    COD: t('COD', 'DR Congo', 'cd'),
    CPV: t('CPV', 'Cape Verde', 'cv'),
    ETH: t('ETH', 'Ethiopia', 'et'),
    GHA: t('GHA', 'Ghana', 'gh'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    NIG: t('NIG', 'Niger', 'ne'),
    RSA: t('RSA', 'South Africa', 'za'),
    TOG: t('TOG', 'Togo', 'tg'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['RSA', 'CPV', 'MAR', 'ANG'], {
      RSA: s('RSA', 3, 1, 2, 0, 4, 2),
      CPV: s('CPV', 3, 1, 2, 0, 3, 2),
      MAR: s('MAR', 3, 0, 3, 0, 3, 3),
      ANG: s('ANG', 3, 0, 1, 2, 1, 4),
    }),
    group('B', ['GHA', 'MLI', 'COD', 'NIG'], {
      GHA: s('GHA', 3, 2, 1, 0, 6, 2),
      MLI: s('MLI', 3, 1, 1, 1, 2, 2),
      COD: s('COD', 3, 0, 3, 0, 3, 3),
      NIG: s('NIG', 3, 0, 1, 2, 0, 4),
    }),
    group('C', ['NGA', 'BFA', 'ZAM', 'ETH'], {
      NGA: s('NGA', 3, 1, 2, 0, 4, 2),
      BFA: s('BFA', 3, 1, 2, 0, 5, 1),
      ZAM: s('ZAM', 3, 0, 3, 0, 2, 2),
      ETH: s('ETH', 3, 0, 1, 2, 1, 7),
    }),
    group('D', ['CIV', 'TUN', 'TOG', 'ALG'], {
      CIV: s('CIV', 3, 2, 1, 0, 7, 3),
      TUN: s('TUN', 3, 1, 1, 1, 2, 4),
      TOG: s('TOG', 3, 1, 1, 1, 4, 3),
      ALG: s('ALG', 3, 0, 1, 2, 2, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2013.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  BFA_TOG: 'BFA',
  CIV_NGA: 'NGA',
  CPV_GHA: 'GHA',
  MLI_RSA: 'MLI',
  // Semi Final
  BFA_NGA: 'NGA',
  GHA_MLI: 'MLI',
  // Final
  BFA_GHA: 'BFA',
  MLI_NGA: 'NGA',
};

const THIRD_PLACE: [string, string] = ['MLI', 'GHA'];

const BRACKET_RAW: BracketRaw = [
  [
    ['GHA', 'CPV'],
    ['RSA', 'MLI'],
  ],
  [
    ['BFA', 'TOG'],
    ['CIV', 'NGA'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
