import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_1996: ConcacafYearData = {
  year: 1996,
  host: 'United States',
  champion: 'Mexico',
  runnerUp: 'Brazil',
  available: false,
  teams: {
    BRA: t('BRA', 'Brazil', 'br'),
    CAN: t('CAN', 'Canada', 'ca'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HON: t('HON', 'Honduras', 'hn'),
    MEX: t('MEX', 'Mexico', 'mx'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
    VIN: t('VIN', 'Saint Vincent and the Grenadines', 'vc'),
  },
  groups: [
    group('A', ['MEX', 'GUA', 'VIN'], {
      MEX: s('MEX', 2, 2, 0, 0, 6, 0),
      GUA: s('GUA', 2, 1, 0, 1, 3, 1),
      VIN: s('VIN', 2, 0, 0, 2, 0, 8),
    }),
    group('B', ['BRA', 'CAN', 'HON'], {
      BRA: s('BRA', 2, 2, 0, 0, 9, 1),
      CAN: s('CAN', 2, 1, 0, 1, 4, 5),
      HON: s('HON', 2, 0, 0, 2, 1, 8),
    }),
    group('C', ['USA', 'SLV', 'TRI'], {
      USA: s('USA', 2, 2, 0, 0, 5, 2),
      SLV: s('SLV', 2, 1, 0, 1, 3, 4),
      TRI: s('TRI', 2, 0, 0, 2, 4, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_1996.teams);

const PREDETERMINED: Record<string, string> = {
  BRA_MEX: 'MEX',
  BRA_USA: 'BRA',
  GUA_MEX: 'MEX',
  GUA_USA: 'USA',
};

const BRACKET_RAW: BracketRaw = [
  ['USA', 'BRA'],
  ['MEX', 'GUA'],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
