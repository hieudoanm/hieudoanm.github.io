import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2009: ConcacafYearData = {
  year: 2009,
  host: 'United States',
  champion: 'Mexico',
  runnerUp: 'United States',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    GLP: t('GLP', 'Guadeloupe', 'gp'),
    GRN: t('GRN', 'Grenada', 'gd'),
    HAI: t('HAI', 'Haiti', 'ht'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    NCA: t('NCA', 'Nicaragua', 'ni'),
    PAN: t('PAN', 'Panama', 'pa'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['CAN', 'CRC', 'SLV', 'JAM'], {
      CAN: s('CAN', 3, 2, 1, 0, 4, 2),
      CRC: s('CRC', 3, 1, 1, 1, 4, 4),
      SLV: s('SLV', 3, 1, 0, 2, 2, 3),
      JAM: s('JAM', 3, 1, 0, 2, 1, 2),
    }),
    group('B', ['USA', 'HON', 'HAI', 'GRN'], {
      USA: s('USA', 3, 2, 1, 0, 8, 2),
      HON: s('HON', 3, 2, 0, 1, 5, 2),
      HAI: s('HAI', 3, 1, 1, 1, 4, 3),
      GRN: s('GRN', 3, 0, 0, 3, 0, 10),
    }),
    group('C', ['MEX', 'GLP', 'PAN', 'NCA'], {
      MEX: s('MEX', 3, 2, 1, 0, 5, 1),
      GLP: s('GLP', 3, 2, 0, 1, 4, 3),
      PAN: s('PAN', 3, 1, 1, 1, 6, 3),
      NCA: s('NCA', 3, 0, 0, 3, 0, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2009.teams);

const PREDETERMINED: Record<string, string> = {
  CAN_HON: 'HON',
  CRC_GLP: 'CRC',
  CRC_MEX: 'MEX',
  HAI_MEX: 'MEX',
  HON_USA: 'USA',
  MEX_USA: 'MEX',
  PAN_USA: 'USA',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['CAN', 'HON'],
    ['USA', 'PAN'],
  ],
  [
    ['GLP', 'CRC'],
    ['MEX', 'HAI'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
