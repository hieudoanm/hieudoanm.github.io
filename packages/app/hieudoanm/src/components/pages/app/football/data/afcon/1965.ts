import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1965: AfconYearData = {
  year: 1965,
  host: 'Tunisia',
  champion: 'Ghana',
  runnerUp: 'Tunisia',
  available: false,
  teams: {
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CON: t('CON', 'Congo-Kinshasa', 'co'),
    ETH: t('ETH', 'Ethiopia', 'et'),
    GHA: t('GHA', 'Ghana', 'gh'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TUN: t('TUN', 'Tunisia', 'tn'),
  },
  groups: [
    group('A', ['TUN', 'SEN', 'ETH'], {
      TUN: s('TUN', 2, 1, 1, 0, 4, 0),
      SEN: s('SEN', 2, 1, 1, 0, 5, 1),
      ETH: s('ETH', 2, 0, 0, 2, 1, 9),
    }),
    group('B', ['GHA', 'CIV', 'CON'], {
      GHA: s('GHA', 2, 2, 0, 0, 9, 3),
      CIV: s('CIV', 2, 1, 0, 1, 4, 4),
      CON: s('CON', 2, 0, 0, 2, 2, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1965.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  GHA_TUN: 'GHA',
  // Final
  CIV_SEN: 'CIV',
};

const THIRD_PLACE: [string, string] = ['CIV', 'SEN'];

const BRACKET_RAW: BracketRaw = ['TUN', 'GHA'];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
