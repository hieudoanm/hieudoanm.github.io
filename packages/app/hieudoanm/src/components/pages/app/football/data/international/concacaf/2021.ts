import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2021: ConcacafYearData = {
  year: 2021,
  host: 'United States',
  champion: 'United States',
  runnerUp: 'Mexico',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    GLP: t('GLP', 'Guadeloupe', 'gp'),
    GRN: t('GRN', 'Grenada', 'gd'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HAI: t('HAI', 'Haiti', 'ht'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    MTQ: t('MTQ', 'Martinique', 'mq'),
    PAN: t('PAN', 'Panama', 'pa'),
    QAT: t('QAT', 'Qatar', 'qa'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    SUR: t('SUR', 'Suriname', 'sr'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['MEX', 'SLV', 'TRI', 'GUA'], {
      MEX: s('MEX', 3, 2, 1, 0, 4, 0),
      SLV: s('SLV', 3, 2, 0, 1, 4, 1),
      TRI: s('TRI', 3, 0, 2, 1, 1, 3),
      GUA: s('GUA', 3, 0, 1, 2, 1, 6),
    }),
    group('B', ['USA', 'CAN', 'HAI', 'MTQ'], {
      USA: s('USA', 3, 3, 0, 0, 8, 1),
      CAN: s('CAN', 3, 2, 0, 1, 8, 3),
      HAI: s('HAI', 3, 1, 0, 2, 3, 6),
      MTQ: s('MTQ', 3, 0, 0, 3, 3, 12),
    }),
    group('C', ['CRC', 'JAM', 'SUR', 'GLP'], {
      CRC: s('CRC', 3, 3, 0, 0, 6, 2),
      JAM: s('JAM', 3, 2, 0, 1, 4, 2),
      SUR: s('SUR', 3, 1, 0, 2, 3, 5),
      GLP: s('GLP', 3, 0, 0, 3, 3, 7),
    }),
    group('D', ['QAT', 'HON', 'PAN', 'GRN'], {
      QAT: s('QAT', 3, 2, 1, 0, 9, 3),
      HON: s('HON', 3, 2, 0, 1, 7, 4),
      PAN: s('PAN', 3, 1, 1, 1, 8, 7),
      GRN: s('GRN', 3, 0, 0, 3, 1, 11),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2021.teams);

const PREDETERMINED: Record<string, string> = {
  CAN_CRC: 'CAN',
  CAN_MEX: 'USA',
  CAN_USA: 'CAN',
  HON_MEX: 'MEX',
  JAM_USA: 'USA',
  MEX_QAT: 'MEX',
  MEX_USA: 'USA',
  QAT_SLV: 'QAT',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['MEX', 'HON'],
    ['QAT', 'SLV'],
  ],
  [
    ['CRC', 'CAN'],
    ['USA', 'JAM'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
