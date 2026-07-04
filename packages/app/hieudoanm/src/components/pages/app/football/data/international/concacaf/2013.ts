import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2013: ConcacafYearData = {
  year: 2013,
  host: 'United States',
  champion: 'United States',
  runnerUp: 'Panama',
  available: false,
  teams: {
    BLZ: t('BLZ', 'Belize', 'bz'),
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUB: t('CUB', 'Cuba', 'cu'),
    HAI: t('HAI', 'Haiti', 'ht'),
    HON: t('HON', 'Honduras', 'hn'),
    MEX: t('MEX', 'Mexico', 'mx'),
    MTQ: t('MTQ', 'Martinique', 'mq'),
    PAN: t('PAN', 'Panama', 'pa'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['PAN', 'MEX', 'MTQ', 'CAN'], {
      PAN: s('PAN', 3, 2, 1, 0, 3, 1),
      MEX: s('MEX', 3, 2, 0, 1, 6, 3),
      MTQ: s('MTQ', 3, 1, 0, 2, 2, 4),
      CAN: s('CAN', 3, 0, 1, 2, 0, 3),
    }),
    group('B', ['HON', 'TRI', 'SLV', 'HAI'], {
      HON: s('HON', 3, 2, 0, 1, 3, 2),
      TRI: s('TRI', 3, 1, 1, 1, 4, 4),
      SLV: s('SLV', 3, 1, 1, 1, 3, 3),
      HAI: s('HAI', 3, 1, 0, 2, 2, 3),
    }),
    group('C', ['USA', 'CRC', 'CUB', 'BLZ'], {
      USA: s('USA', 3, 3, 0, 0, 11, 2),
      CRC: s('CRC', 3, 2, 0, 1, 4, 1),
      CUB: s('CUB', 3, 1, 0, 2, 5, 7),
      BLZ: s('BLZ', 3, 0, 0, 3, 1, 11),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2013.teams);

const PREDETERMINED: Record<string, string> = {
  CRC_HON: 'HON',
  CUB_PAN: 'PAN',
  HON_USA: 'USA',
  MEX_PAN: 'PAN',
  MEX_TRI: 'MEX',
  PAN_USA: 'USA',
  SLV_USA: 'USA',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['MEX', 'TRI'],
    ['PAN', 'CUB'],
  ],
  [
    ['HON', 'CRC'],
    ['USA', 'SLV'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
