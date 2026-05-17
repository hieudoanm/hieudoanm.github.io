import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2005: ConcacafYearData = {
  year: 2005,
  host: 'United States',
  champion: 'United States',
  runnerUp: 'Panama',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    COL: t('COL', 'Colombia', 'co'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUB: t('CUB', 'Cuba', 'cu'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAN: t('PAN', 'Panama', 'pa'),
    RSA: t('RSA', 'South Africa', 'za'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['HON', 'PAN', 'COL', 'TRI'], {
      HON: s('HON', 3, 2, 1, 0, 4, 2),
      PAN: s('PAN', 3, 1, 1, 1, 3, 3),
      COL: s('COL', 3, 1, 0, 2, 3, 3),
      TRI: s('TRI', 3, 0, 2, 1, 3, 5),
    }),
    group('B', ['USA', 'CRC', 'CAN', 'CUB'], {
      USA: s('USA', 3, 2, 1, 0, 6, 1),
      CRC: s('CRC', 3, 2, 1, 0, 4, 1),
      CAN: s('CAN', 3, 1, 0, 2, 2, 4),
      CUB: s('CUB', 3, 0, 0, 3, 3, 9),
    }),
    group('C', ['MEX', 'RSA', 'JAM', 'GUA'], {
      MEX: s('MEX', 3, 2, 0, 1, 6, 2),
      RSA: s('RSA', 3, 1, 2, 0, 6, 5),
      JAM: s('JAM', 3, 1, 1, 1, 7, 7),
      GUA: s('GUA', 3, 0, 1, 2, 4, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2005.teams);

const PREDETERMINED: Record<string, string> = {
  COL_MEX: 'COL',
  COL_PAN: 'PAN',
  CRC_HON: 'HON',
  HON_USA: 'USA',
  JAM_USA: 'USA',
  PAN_RSA: 'PAN',
  PAN_USA: 'USA',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['HON', 'CRC'],
    ['USA', 'JAM'],
  ],
  [
    ['MEX', 'COL'],
    ['RSA', 'PAN'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
