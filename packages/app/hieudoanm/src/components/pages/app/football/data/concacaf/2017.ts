import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2017: ConcacafYearData = {
  year: 2017,
  host: 'United States',
  champion: 'United States',
  runnerUp: 'Jamaica',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUW: t('CUW', 'Curaçao', 'cw'),
    GUF: t('GUF', 'GUF', 'xx'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    MTQ: t('MTQ', 'Martinique', 'mq'),
    NCA: t('NCA', 'Nicaragua', 'ni'),
    PAN: t('PAN', 'Panama', 'pa'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['CRC', 'CAN', 'HON', 'GUF'], {
      CRC: s('CRC', 3, 2, 1, 0, 5, 1),
      CAN: s('CAN', 3, 1, 2, 0, 5, 3),
      HON: s('HON', 3, 0, 2, 1, 0, 1),
      GUF: s('GUF', 3, 0, 1, 2, 2, 7),
    }),
    group('B', ['USA', 'PAN', 'MTQ', 'NCA'], {
      USA: s('USA', 3, 2, 1, 0, 7, 3),
      PAN: s('PAN', 3, 2, 1, 0, 6, 2),
      MTQ: s('MTQ', 3, 1, 0, 2, 4, 6),
      NCA: s('NCA', 3, 0, 0, 3, 1, 7),
    }),
    group('C', ['MEX', 'JAM', 'SLV', 'CUW'], {
      MEX: s('MEX', 3, 2, 1, 0, 5, 1),
      JAM: s('JAM', 3, 1, 2, 0, 3, 1),
      SLV: s('SLV', 3, 1, 1, 1, 4, 4),
      CUW: s('CUW', 3, 0, 0, 3, 0, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2017.teams);

const PREDETERMINED: Record<string, string> = {
  CAN_JAM: 'JAM',
  CRC_PAN: 'CRC',
  CRC_USA: 'USA',
  HON_MEX: 'MEX',
  JAM_MEX: 'JAM',
  JAM_USA: 'USA',
  SLV_USA: 'USA',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['CRC', 'PAN'],
    ['USA', 'SLV'],
  ],
  [
    ['JAM', 'CAN'],
    ['MEX', 'HON'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
