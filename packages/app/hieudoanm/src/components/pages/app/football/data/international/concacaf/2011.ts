import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2011: ConcacafYearData = {
  year: 2011,
  host: 'United States',
  champion: 'Mexico',
  runnerUp: 'United States',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUB: t('CUB', 'Cuba', 'cu'),
    GLP: t('GLP', 'Guadeloupe', 'gp'),
    GRN: t('GRN', 'Grenada', 'gd'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAN: t('PAN', 'Panama', 'pa'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['MEX', 'CRC', 'SLV', 'CUB'], {
      MEX: s('MEX', 3, 3, 0, 0, 14, 1),
      CRC: s('CRC', 3, 1, 1, 1, 7, 5),
      SLV: s('SLV', 3, 1, 1, 1, 7, 7),
      CUB: s('CUB', 3, 0, 0, 3, 1, 16),
    }),
    group('B', ['JAM', 'HON', 'GUA', 'GRN'], {
      JAM: s('JAM', 3, 3, 0, 0, 7, 0),
      HON: s('HON', 3, 1, 1, 1, 7, 2),
      GUA: s('GUA', 3, 1, 1, 1, 4, 2),
      GRN: s('GRN', 3, 0, 0, 3, 1, 15),
    }),
    group('C', ['PAN', 'USA', 'CAN', 'GLP'], {
      PAN: s('PAN', 3, 2, 1, 0, 6, 4),
      USA: s('USA', 3, 2, 0, 1, 4, 2),
      CAN: s('CAN', 3, 1, 1, 1, 2, 3),
      GLP: s('GLP', 3, 0, 0, 3, 2, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2011.teams);

const PREDETERMINED: Record<string, string> = {
  CRC_HON: 'HON',
  GUA_MEX: 'MEX',
  HON_MEX: 'MEX',
  JAM_USA: 'USA',
  MEX_USA: 'MEX',
  PAN_SLV: 'PAN',
  PAN_USA: 'USA',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['CRC', 'HON'],
    ['MEX', 'GUA'],
  ],
  [
    ['PAN', 'SLV'],
    ['USA', 'JAM'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
