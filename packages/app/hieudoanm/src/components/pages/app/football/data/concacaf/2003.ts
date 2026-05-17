import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2003: ConcacafYearData = {
  year: 2003,
  host: 'United States/Mexico',
  champion: 'Mexico',
  runnerUp: 'Brazil',
  available: false,
  teams: {
    BRA: t('BRA', 'Brazil', 'br'),
    CAN: t('CAN', 'Canada', 'ca'),
    COL: t('COL', 'Colombia', 'co'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUB: t('CUB', 'Cuba', 'cu'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    MTQ: t('MTQ', 'Martinique', 'mq'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['MEX', 'BRA', 'HON'], {
      MEX: s('MEX', 2, 1, 1, 0, 1, 0),
      BRA: s('BRA', 2, 1, 0, 1, 2, 2),
      HON: s('HON', 2, 0, 1, 1, 1, 2),
    }),
    group('B', ['COL', 'JAM', 'GUA'], {
      COL: s('COL', 2, 1, 1, 0, 2, 1),
      JAM: s('JAM', 2, 1, 0, 1, 2, 1),
      GUA: s('GUA', 2, 0, 1, 1, 1, 3),
    }),
    group('C', ['USA', 'SLV', 'MTQ'], {
      USA: s('USA', 2, 2, 0, 0, 4, 0),
      SLV: s('SLV', 2, 1, 0, 1, 1, 2),
      MTQ: s('MTQ', 2, 0, 0, 2, 0, 3),
    }),
    group('D', ['CRC', 'CUB', 'CAN'], {
      CRC: s('CRC', 2, 1, 0, 1, 3, 1),
      CUB: s('CUB', 2, 1, 0, 1, 2, 3),
      CAN: s('CAN', 2, 1, 0, 1, 1, 2),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2003.teams);

const PREDETERMINED: Record<string, string> = {
  BRA_COL: 'BRA',
  BRA_CRC: 'BRA',
  BRA_MEX: 'MEX',
  BRA_USA: 'MEX',
  CRC_SLV: 'CRC',
  CRC_USA: 'USA',
  CUB_USA: 'USA',
  JAM_MEX: 'MEX',
  MEX_USA: 'USA',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['COL', 'BRA'],
    ['CRC', 'SLV'],
  ],
  [
    ['USA', 'CUB'],
    ['MEX', 'JAM'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
