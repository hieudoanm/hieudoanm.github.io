import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2000: ConcacafYearData = {
  year: 2000,
  host: 'United States',
  champion: 'Canada',
  runnerUp: 'Colombia',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    COL: t('COL', 'Colombia', 'co'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HAI: t('HAI', 'Haiti', 'ht'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    KOR: t('KOR', 'South Korea', 'kr'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PER: t('PER', 'Peru', 'pe'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['HON', 'COL', 'JAM'], {
      HON: s('HON', 2, 2, 0, 0, 4, 0),
      COL: s('COL', 2, 1, 0, 1, 1, 2),
      JAM: s('JAM', 2, 0, 0, 2, 0, 3),
    }),
    group('B', ['USA', 'PER', 'HAI'], {
      USA: s('USA', 2, 2, 0, 0, 4, 0),
      PER: s('PER', 2, 0, 1, 1, 1, 2),
      HAI: s('HAI', 2, 0, 1, 1, 1, 4),
    }),
    group('C', ['MEX', 'TRI', 'GUA'], {
      MEX: s('MEX', 2, 1, 1, 0, 5, 1),
      TRI: s('TRI', 2, 1, 0, 1, 4, 6),
      GUA: s('GUA', 2, 0, 1, 1, 3, 5),
    }),
    group('D', ['CRC', 'CAN', 'KOR'], {
      CRC: s('CRC', 2, 0, 2, 0, 4, 4),
      CAN: s('CAN', 2, 0, 2, 0, 2, 2),
      KOR: s('KOR', 2, 0, 2, 0, 2, 2),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2000.teams);

const PREDETERMINED: Record<string, string> = {
  CAN_COL: 'CAN',
  CAN_MEX: 'CAN',
  CAN_TRI: 'CAN',
  COL_PER: 'COL',
  COL_USA: 'COL',
  CRC_TRI: 'TRI',
  HON_PER: 'PER',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['HON', 'PER'],
    ['USA', 'COL'],
  ],
  [
    ['CRC', 'TRI'],
    ['MEX', 'CAN'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
