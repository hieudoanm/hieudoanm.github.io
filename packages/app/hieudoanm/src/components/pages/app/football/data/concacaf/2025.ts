import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2025: ConcacafYearData = {
  year: 2025,
  host: 'United States/Canada',
  champion: 'Mexico',
  runnerUp: 'United States',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUW: t('CUW', 'Curaçao', 'cw'),
    DOM: t('DOM', 'Dominican Republic', 'do'),
    GLP: t('GLP', 'Guadeloupe', 'gp'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HAI: t('HAI', 'Haiti', 'ht'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    KSA: t('KSA', 'Saudi Arabia', 'sa'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAN: t('PAN', 'Panama', 'pa'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    SUR: t('SUR', 'Suriname', 'sr'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['MEX', 'CRC', 'DOM', 'SUR'], {
      MEX: s('MEX', 3, 2, 1, 0, 5, 2),
      CRC: s('CRC', 3, 2, 1, 0, 6, 4),
      DOM: s('DOM', 3, 0, 1, 2, 3, 5),
      SUR: s('SUR', 3, 0, 1, 2, 3, 6),
    }),
    group('B', ['CAN', 'HON', 'CUW', 'SLV'], {
      CAN: s('CAN', 3, 2, 1, 0, 9, 1),
      HON: s('HON', 3, 2, 0, 1, 4, 7),
      CUW: s('CUW', 3, 0, 2, 1, 2, 3),
      SLV: s('SLV', 3, 0, 1, 2, 0, 4),
    }),
    group('C', ['PAN', 'GUA', 'JAM', 'GLP'], {
      PAN: s('PAN', 3, 3, 0, 0, 10, 3),
      GUA: s('GUA', 3, 2, 0, 1, 4, 3),
      JAM: s('JAM', 3, 1, 0, 2, 3, 6),
      GLP: s('GLP', 3, 0, 0, 3, 5, 10),
    }),
    group('D', ['USA', 'KSA', 'TRI', 'HAI'], {
      USA: s('USA', 3, 3, 0, 0, 8, 1),
      KSA: s('KSA', 3, 1, 1, 1, 2, 2),
      TRI: s('TRI', 3, 0, 2, 1, 2, 7),
      HAI: s('HAI', 3, 0, 1, 2, 2, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2025.teams);

const PREDETERMINED: Record<string, string> = {
  CAN_GUA: 'GUA',
  CRC_USA: 'USA',
  GUA_USA: 'USA',
  HON_MEX: 'MEX',
  HON_PAN: 'HON',
  KSA_MEX: 'MEX',
  MEX_USA: 'MEX',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['PAN', 'HON'],
    ['MEX', 'KSA'],
  ],
  [
    ['CAN', 'GUA'],
    ['USA', 'CRC'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
