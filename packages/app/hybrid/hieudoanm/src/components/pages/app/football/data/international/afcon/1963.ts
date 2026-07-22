import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1963: AfconYearData = {
  year: 1963,
  host: 'Ghana',
  champion: 'Ghana',
  runnerUp: 'Sudan',
  available: false,
  teams: {
    ETH: t('ETH', 'Ethiopia', 'et'),
    GHA: t('GHA', 'Ghana', 'gh'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    SDN: t('SDN', 'Sudan', 'sd'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    UNA: t('UNA', 'United Arab Republic', 'un'),
  },
  groups: [
    group('A', ['GHA', 'ETH', 'TUN'], {
      GHA: s('GHA', 2, 1, 1, 0, 3, 1),
      ETH: s('ETH', 2, 1, 0, 1, 4, 4),
      TUN: s('TUN', 2, 0, 1, 1, 3, 5),
    }),
    group('B', ['UNA', 'SDN', 'NGA'], {
      UNA: s('UNA', 2, 1, 1, 0, 8, 5),
      SDN: s('SDN', 2, 1, 1, 0, 6, 2),
      NGA: s('NGA', 2, 0, 0, 2, 3, 10),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1963.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  GHA_SDN: 'GHA',
  // Final
  ETH_UNA: 'UNA',
};

const THIRD_PLACE: [string, string] = ['UNA', 'ETH'];

const BRACKET_RAW: BracketRaw = ['GHA', 'SDN'];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
