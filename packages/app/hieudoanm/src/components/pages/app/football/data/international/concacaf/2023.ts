import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2023: ConcacafYearData = {
  year: 2023,
  host: 'United States/Canada',
  champion: 'Mexico',
  runnerUp: 'Panama',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUB: t('CUB', 'Cuba', 'cu'),
    GLP: t('GLP', 'Guadeloupe', 'gp'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HAI: t('HAI', 'Haiti', 'ht'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    MTQ: t('MTQ', 'Martinique', 'mq'),
    PAN: t('PAN', 'Panama', 'pa'),
    QAT: t('QAT', 'Qatar', 'qa'),
    SKN: t('SKN', 'Saint Kitts and Nevis', 'kn'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['USA', 'JAM', 'TRI', 'SKN'], {
      USA: s('USA', 3, 2, 1, 0, 13, 1),
      JAM: s('JAM', 3, 2, 1, 0, 10, 2),
      TRI: s('TRI', 3, 1, 0, 2, 4, 10),
      SKN: s('SKN', 3, 0, 0, 3, 0, 14),
    }),
    group('B', ['MEX', 'QAT', 'HON', 'HAI'], {
      MEX: s('MEX', 3, 2, 0, 1, 7, 2),
      QAT: s('QAT', 3, 1, 1, 1, 3, 3),
      HON: s('HON', 3, 1, 1, 1, 3, 6),
      HAI: s('HAI', 3, 1, 0, 2, 4, 6),
    }),
    group('C', ['PAN', 'CRC', 'MTQ', 'SLV'], {
      PAN: s('PAN', 3, 2, 1, 0, 6, 4),
      CRC: s('CRC', 3, 1, 1, 1, 7, 6),
      MTQ: s('MTQ', 3, 1, 0, 2, 7, 9),
      SLV: s('SLV', 3, 0, 2, 1, 3, 4),
    }),
    group('D', ['GUA', 'CAN', 'GLP', 'CUB'], {
      GUA: s('GUA', 3, 2, 1, 0, 4, 2),
      CAN: s('CAN', 3, 1, 2, 0, 6, 4),
      GLP: s('GLP', 3, 1, 1, 1, 8, 6),
      CUB: s('CUB', 3, 0, 0, 3, 3, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2023.teams);

const PREDETERMINED: Record<string, string> = {
  CAN_USA: 'USA',
  CRC_MEX: 'MEX',
  GUA_JAM: 'JAM',
  JAM_MEX: 'MEX',
  JAM_USA: 'JAM',
  MEX_PAN: 'MEX',
  PAN_QAT: 'PAN',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['PAN', 'QAT'],
    ['MEX', 'CRC'],
  ],
  [
    ['GUA', 'JAM'],
    ['USA', 'CAN'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
