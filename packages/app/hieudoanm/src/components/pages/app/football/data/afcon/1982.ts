import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1982: AfconYearData = {
  year: 1982,
  host: 'Libya',
  champion: 'Ghana',
  runnerUp: 'Libya',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    ETH: t('ETH', 'Ethiopia', 'et'),
    GHA: t('GHA', 'Ghana', 'gh'),
    LBY: t('LBY', 'Libya', 'ly'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['LBY', 'GHA', 'CMR', 'TUN'], {
      LBY: s('LBY', 3, 1, 2, 0, 4, 2),
      GHA: s('GHA', 3, 1, 2, 0, 3, 2),
      CMR: s('CMR', 3, 0, 3, 0, 1, 1),
      TUN: s('TUN', 3, 0, 1, 2, 1, 4),
    }),
    group('B', ['ALG', 'ZAM', 'NGA', 'ETH'], {
      ALG: s('ALG', 3, 2, 1, 0, 3, 1),
      ZAM: s('ZAM', 3, 2, 0, 1, 4, 1),
      NGA: s('NGA', 3, 1, 0, 2, 4, 5),
      ETH: s('ETH', 3, 0, 1, 2, 0, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1982.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  ALG_GHA: 'GHA',
  LBY_ZAM: 'LBY',
  // Final
  ALG_ZAM: 'ZAM',
  GHA_LBY: 'GHA',
};

const THIRD_PLACE: [string, string] = ['ALG', 'ZAM'];

const BRACKET_RAW: BracketRaw = [
  ['ALG', 'GHA'],
  ['LBY', 'ZAM'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
