import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_1993: ConcacafYearData = {
  year: 1993,
  host: 'United States/Mexico',
  champion: 'Mexico',
  runnerUp: 'United States',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    MTQ: t('MTQ', 'Martinique', 'mq'),
    PAN: t('PAN', 'Panama', 'pa'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['USA', 'JAM', 'HON', 'PAN'], {
      USA: s('USA', 3, 3, 0, 0, 4, 1),
      JAM: s('JAM', 3, 1, 1, 1, 4, 3),
      HON: s('HON', 3, 1, 0, 2, 6, 5),
      PAN: s('PAN', 3, 0, 1, 2, 3, 8),
    }),
    group('B', ['MEX', 'CRC', 'CAN', 'MTQ'], {
      MEX: s('MEX', 3, 2, 1, 0, 18, 1),
      CRC: s('CRC', 3, 1, 2, 0, 5, 3),
      CAN: s('CAN', 3, 0, 2, 1, 3, 11),
      MTQ: s('MTQ', 3, 0, 1, 2, 3, 14),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_1993.teams);

const PREDETERMINED: Record<string, string> = {
  CRC_JAM: 'JAM',
  CRC_USA: 'USA',
  JAM_MEX: 'MEX',
  MEX_USA: 'MEX',
};

const BRACKET_RAW: BracketRaw = [
  ['USA', 'CRC'],
  ['MEX', 'JAM'],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
