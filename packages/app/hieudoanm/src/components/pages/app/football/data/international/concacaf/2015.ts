import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2015: ConcacafYearData = {
  year: 2015,
  host: 'United States',
  champion: 'Mexico',
  runnerUp: 'Jamaica',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUB: t('CUB', 'Cuba', 'cu'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HAI: t('HAI', 'Haiti', 'ht'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAN: t('PAN', 'Panama', 'pa'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['USA', 'HAI', 'PAN', 'HON'], {
      USA: s('USA', 3, 2, 1, 0, 4, 2),
      HAI: s('HAI', 3, 1, 1, 1, 2, 2),
      PAN: s('PAN', 3, 0, 3, 0, 3, 3),
      HON: s('HON', 3, 0, 1, 2, 2, 4),
    }),
    group('B', ['JAM', 'CRC', 'SLV', 'CAN'], {
      JAM: s('JAM', 3, 2, 1, 0, 4, 2),
      CRC: s('CRC', 3, 0, 3, 0, 3, 3),
      SLV: s('SLV', 3, 0, 2, 1, 1, 2),
      CAN: s('CAN', 3, 0, 2, 1, 0, 1),
    }),
    group('C', ['TRI', 'MEX', 'CUB', 'GUA'], {
      TRI: s('TRI', 3, 2, 1, 0, 9, 5),
      MEX: s('MEX', 3, 1, 2, 0, 10, 4),
      CUB: s('CUB', 3, 1, 0, 2, 1, 8),
      GUA: s('GUA', 3, 0, 1, 2, 1, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2015.teams);

const PREDETERMINED: Record<string, string> = {
  CRC_MEX: 'MEX',
  CUB_USA: 'USA',
  HAI_JAM: 'JAM',
  JAM_MEX: 'MEX',
  JAM_USA: 'JAM',
  MEX_PAN: 'MEX',
  PAN_TRI: 'PAN',
  PAN_USA: 'PAN',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['HAI', 'JAM'],
    ['USA', 'CUB'],
  ],
  [
    ['MEX', 'CRC'],
    ['TRI', 'PAN'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
