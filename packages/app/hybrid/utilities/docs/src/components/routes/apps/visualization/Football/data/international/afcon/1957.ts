import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1957: AfconYearData = {
  year: 1957,
  host: 'Sudan',
  champion: 'Egypt',
  runnerUp: 'Ethiopia',
  available: false,
  teams: {
    EGY: t('EGY', 'Egypt', 'eg'),
    ETH: t('ETH', 'Ethiopia', 'et'),
    SDN: t('SDN', 'Sudan', 'sd'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1957.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  EGY_SDN: 'EGY',
  // Final
  EGY_ETH: 'EGY',
};

const BRACKET_RAW: BracketRaw = ['SDN', 'EGY'];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
