import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2007: ConcacafYearData = {
  year: 2007,
  host: 'United States',
  champion: 'United States',
  runnerUp: 'Mexico',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUB: t('CUB', 'Cuba', 'cu'),
    GLP: t('GLP', 'Guadeloupe', 'gp'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HAI: t('HAI', 'Haiti', 'ht'),
    HON: t('HON', 'Honduras', 'hn'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAN: t('PAN', 'Panama', 'pa'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['CAN', 'GLP', 'CRC', 'HAI'], {
      CAN: s('CAN', 3, 2, 0, 1, 5, 3),
      GLP: s('GLP', 3, 1, 1, 1, 3, 3),
      CRC: s('CRC', 3, 1, 1, 1, 3, 3),
      HAI: s('HAI', 3, 0, 2, 1, 2, 4),
    }),
    group('B', ['USA', 'GUA', 'SLV', 'TRI'], {
      USA: s('USA', 3, 3, 0, 0, 7, 0),
      GUA: s('GUA', 3, 1, 1, 1, 2, 2),
      SLV: s('SLV', 3, 1, 0, 2, 2, 6),
      TRI: s('TRI', 3, 0, 1, 2, 2, 5),
    }),
    group('C', ['HON', 'MEX', 'PAN', 'CUB'], {
      HON: s('HON', 3, 2, 0, 1, 9, 4),
      MEX: s('MEX', 3, 2, 0, 1, 4, 3),
      PAN: s('PAN', 3, 1, 1, 1, 5, 5),
      CUB: s('CUB', 3, 0, 1, 2, 3, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2007.teams);

const PREDETERMINED: Record<string, string> = {
  CAN_GUA: 'CAN',
  CAN_USA: 'USA',
  CRC_MEX: 'MEX',
  GLP_HON: 'GLP',
  GLP_MEX: 'MEX',
  MEX_USA: 'USA',
  PAN_USA: 'USA',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['CAN', 'GUA'],
    ['USA', 'PAN'],
  ],
  [
    ['HON', 'GLP'],
    ['MEX', 'CRC'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
