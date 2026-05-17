import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2019: ConcacafYearData = {
  year: 2019,
  host: 'United States/Costa Rica/Jamaica',
  champion: 'Mexico',
  runnerUp: 'United States',
  available: false,
  teams: {
    BER: t('BER', 'Bermuda', 'bm'),
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUB: t('CUB', 'Cuba', 'cu'),
    CUW: t('CUW', 'Curaçao', 'cw'),
    GUY: t('GUY', 'Guyana', 'gy'),
    HAI: t('HAI', 'Haiti', 'ht'),
    HON: t('HON', 'Honduras', 'hn'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    MTQ: t('MTQ', 'Martinique', 'mq'),
    NCA: t('NCA', 'Nicaragua', 'ni'),
    PAN: t('PAN', 'Panama', 'pa'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['MEX', 'CAN', 'MTQ', 'CUB'], {
      MEX: s('MEX', 3, 3, 0, 0, 13, 3),
      CAN: s('CAN', 3, 2, 0, 1, 12, 3),
      MTQ: s('MTQ', 3, 1, 0, 2, 5, 7),
      CUB: s('CUB', 3, 0, 0, 3, 0, 17),
    }),
    group('B', ['HAI', 'CRC', 'BER', 'NCA'], {
      HAI: s('HAI', 3, 3, 0, 0, 6, 2),
      CRC: s('CRC', 3, 2, 0, 1, 7, 3),
      BER: s('BER', 3, 1, 0, 2, 4, 4),
      NCA: s('NCA', 3, 0, 0, 3, 0, 8),
    }),
    group('C', ['JAM', 'CUW', 'SLV', 'HON'], {
      JAM: s('JAM', 3, 1, 2, 0, 4, 3),
      CUW: s('CUW', 3, 1, 1, 1, 2, 2),
      SLV: s('SLV', 3, 1, 1, 1, 1, 4),
      HON: s('HON', 3, 1, 0, 2, 6, 4),
    }),
    group('D', ['USA', 'PAN', 'GUY', 'TRI'], {
      USA: s('USA', 3, 3, 0, 0, 11, 0),
      PAN: s('PAN', 3, 2, 0, 1, 6, 3),
      GUY: s('GUY', 3, 0, 1, 2, 3, 9),
      TRI: s('TRI', 3, 0, 1, 2, 1, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2019.teams);

const PREDETERMINED: Record<string, string> = {
  CAN_HAI: 'HAI',
  CRC_MEX: 'MEX',
  CUW_USA: 'USA',
  HAI_MEX: 'MEX',
  JAM_PAN: 'JAM',
  JAM_USA: 'USA',
  MEX_USA: 'MEX',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['HAI', 'CAN'],
    ['MEX', 'CRC'],
  ],
  [
    ['JAM', 'PAN'],
    ['USA', 'CUW'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
