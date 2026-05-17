import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_1991: ConcacafYearData = {
  year: 1991,
  host: 'United States',
  champion: 'United States',
  runnerUp: 'Honduras',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['HON', 'MEX', 'CAN', 'JAM'], {
      HON: s('HON', 3, 2, 1, 0, 10, 3),
      MEX: s('MEX', 3, 2, 1, 0, 8, 3),
      CAN: s('CAN', 3, 1, 0, 2, 6, 9),
      JAM: s('JAM', 3, 0, 0, 3, 3, 12),
    }),
    group('B', ['USA', 'CRC', 'TRI', 'GUA'], {
      USA: s('USA', 3, 3, 0, 0, 8, 3),
      CRC: s('CRC', 3, 1, 0, 2, 5, 5),
      TRI: s('TRI', 3, 1, 0, 2, 3, 4),
      GUA: s('GUA', 3, 1, 0, 2, 1, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_1991.teams);

const PREDETERMINED: Record<string, string> = {
  CRC_HON: 'HON',
  CRC_MEX: 'MEX',
  HON_USA: 'USA',
  MEX_USA: 'USA',
};

const BRACKET_RAW: BracketRaw = [
  ['HON', 'CRC'],
  ['USA', 'MEX'],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
