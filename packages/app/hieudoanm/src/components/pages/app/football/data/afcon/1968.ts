import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1968: AfconYearData = {
  year: 1968,
  host: 'Ethiopia',
  champion: 'Congo-Kinshasa',
  runnerUp: 'Ghana',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    CGO: t('CGO', 'Congo', 'cg'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CON: t('CON', 'Congo-Kinshasa', 'co'),
    ETH: t('ETH', 'Ethiopia', 'et'),
    GHA: t('GHA', 'Ghana', 'gh'),
    SEN: t('SEN', 'Senegal', 'sn'),
    UGA: t('UGA', 'Uganda', 'ug'),
  },
  groups: [
    group('A', ['ETH', 'CIV', 'ALG', 'UGA'], {
      ETH: s('ETH', 3, 3, 0, 0, 6, 2),
      CIV: s('CIV', 3, 2, 0, 1, 5, 2),
      ALG: s('ALG', 3, 1, 0, 2, 5, 6),
      UGA: s('UGA', 3, 0, 0, 3, 2, 8),
    }),
    group('B', ['GHA', 'CON', 'SEN', 'CGO'], {
      GHA: s('GHA', 3, 2, 1, 0, 7, 4),
      CON: s('CON', 3, 2, 0, 1, 6, 3),
      SEN: s('SEN', 3, 1, 1, 1, 5, 5),
      CGO: s('CGO', 3, 0, 0, 3, 2, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1968.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  CIV_GHA: 'GHA',
  CON_ETH: 'CON',
  // Final
  CIV_ETH: 'CIV',
  CON_GHA: 'CON',
};

const THIRD_PLACE: [string, string] = ['ETH', 'CIV'];

const BRACKET_RAW: BracketRaw = [
  ['ETH', 'CON'],
  ['GHA', 'CIV'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
