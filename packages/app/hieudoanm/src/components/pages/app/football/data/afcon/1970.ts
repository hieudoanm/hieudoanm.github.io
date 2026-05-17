import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1970: AfconYearData = {
  year: 1970,
  host: 'Sudan',
  champion: 'Sudan',
  runnerUp: 'Ghana',
  available: false,
  teams: {
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    CON: t('CON', 'Congo-Kinshasa', 'co'),
    ETH: t('ETH', 'Ethiopia', 'et'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GUI: t('GUI', 'Guinea', 'gn'),
    SDN: t('SDN', 'Sudan', 'sd'),
    UNA: t('UNA', 'United Arab Republic', 'un'),
  },
  groups: [
    group('A', ['SDN', 'CMR', 'CIV', 'ETH'], {
      SDN: s('SDN', 3, 2, 0, 1, 5, 2),
      CMR: s('CMR', 3, 2, 0, 1, 7, 6),
      CIV: s('CIV', 3, 2, 0, 1, 9, 4),
      ETH: s('ETH', 3, 0, 0, 3, 3, 12),
    }),
    group('B', ['UNA', 'GHA', 'GUI', 'CON'], {
      UNA: s('UNA', 3, 2, 1, 0, 6, 2),
      GHA: s('GHA', 3, 1, 2, 0, 4, 2),
      GUI: s('GUI', 3, 0, 2, 1, 4, 7),
      CON: s('CON', 3, 0, 1, 2, 2, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1970.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  CIV_GHA: 'GHA',
  SDN_UNA: 'SDN',
  // Final
  CIV_UNA: 'UNA',
  GHA_SDN: 'SDN',
};

const THIRD_PLACE: [string, string] = ['UNA', 'CIV'];

const BRACKET_RAW: BracketRaw = [
  ['GHA', 'CIV'],
  ['SDN', 'UNA'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
