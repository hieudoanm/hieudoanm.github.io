import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1962: AfconYearData = {
  year: 1962,
  host: 'Ethiopia',
  champion: 'Ethiopia',
  runnerUp: 'United Arab Republic',
  available: false,
  teams: {
    ETH: t('ETH', 'Ethiopia', 'et'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    UGA: t('UGA', 'Uganda', 'ug'),
    UNA: t('UNA', 'United Arab Republic', 'un'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1962.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  ETH_TUN: 'ETH',
  UGA_UNA: 'UNA',
  // Final
  ETH_UNA: 'ETH',
  TUN_UGA: 'TUN',
};

const THIRD_PLACE: [string, string] = ['TUN', 'UGA'];

const BRACKET_RAW: BracketRaw = [
  ['ETH', 'TUN'],
  ['UNA', 'UGA'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
