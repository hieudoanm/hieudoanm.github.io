import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_1998: ConcacafYearData = {
  year: 1998,
  host: 'United States',
  champion: 'Mexico',
  runnerUp: 'United States',
  available: false,
  teams: {
    BRA: t('BRA', 'Brazil', 'br'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUB: t('CUB', 'Cuba', 'cu'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['JAM', 'BRA', 'GUA', 'SLV'], {
      JAM: s('JAM', 3, 2, 1, 0, 5, 2),
      BRA: s('BRA', 3, 1, 2, 0, 5, 1),
      GUA: s('GUA', 3, 0, 2, 1, 3, 4),
      SLV: s('SLV', 3, 0, 1, 2, 0, 6),
    }),
    group('B', ['MEX', 'TRI', 'HON'], {
      MEX: s('MEX', 2, 2, 0, 0, 6, 2),
      TRI: s('TRI', 2, 1, 0, 1, 5, 5),
      HON: s('HON', 2, 0, 0, 2, 1, 5),
    }),
    group('C', ['USA', 'CRC', 'CUB'], {
      USA: s('USA', 2, 2, 0, 0, 5, 1),
      CRC: s('CRC', 2, 1, 0, 1, 8, 4),
      CUB: s('CUB', 2, 0, 0, 2, 2, 10),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_1998.teams);

const PREDETERMINED: Record<string, string> = {
  BRA_JAM: 'BRA',
  BRA_USA: 'USA',
  JAM_MEX: 'MEX',
  MEX_USA: 'MEX',
};

const BRACKET_RAW: BracketRaw = [
  ['USA', 'BRA'],
  ['JAM', 'MEX'],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
