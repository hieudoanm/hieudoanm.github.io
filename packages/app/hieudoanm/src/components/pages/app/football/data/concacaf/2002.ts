import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';

export const GOLD_CUP_2002: ConcacafYearData = {
  year: 2002,
  host: 'United States',
  champion: 'United States',
  runnerUp: 'Costa Rica',
  available: false,
  teams: {
    CAN: t('CAN', 'Canada', 'ca'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    CUB: t('CUB', 'Cuba', 'cu'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    GUA: t('GUA', 'Guatemala', 'gt'),
    HAI: t('HAI', 'Haiti', 'ht'),
    KOR: t('KOR', 'South Korea', 'kr'),
    MEX: t('MEX', 'Mexico', 'mx'),
    MTQ: t('MTQ', 'Martinique', 'mq'),
    SLV: t('SLV', 'El Salvador', 'sv'),
    TRI: t('TRI', 'Trinidad and Tobago', 'tt'),
    USA: t('USA', 'United States', 'us'),
  },
  groups: [
    group('A', ['MEX', 'SLV', 'GUA'], {
      MEX: s('MEX', 2, 2, 0, 0, 4, 1),
      SLV: s('SLV', 2, 1, 0, 1, 1, 1),
      GUA: s('GUA', 2, 0, 0, 2, 1, 4),
    }),
    group('B', ['USA', 'KOR', 'CUB'], {
      USA: s('USA', 2, 2, 0, 0, 3, 1),
      KOR: s('KOR', 2, 0, 1, 1, 1, 2),
      CUB: s('CUB', 2, 0, 1, 1, 0, 1),
    }),
    group('C', ['CRC', 'MTQ', 'TRI'], {
      CRC: s('CRC', 2, 1, 1, 0, 3, 1),
      MTQ: s('MTQ', 2, 1, 0, 1, 1, 2),
      TRI: s('TRI', 2, 0, 1, 1, 1, 2),
    }),
    group('D', ['HAI', 'CAN', 'ECU'], {
      HAI: s('HAI', 2, 1, 0, 1, 2, 2),
      CAN: s('CAN', 2, 1, 0, 1, 2, 2),
      ECU: s('ECU', 2, 1, 0, 1, 2, 2),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_2002.teams);

const PREDETERMINED: Record<string, string> = {
  CAN_CRC: 'CAN',
  CAN_KOR: 'CAN',
  CAN_MTQ: 'CAN',
  CRC_HAI: 'CRC',
  CRC_USA: 'USA',
  KOR_MEX: 'KOR',
  KOR_USA: 'KOR',
  SLV_USA: 'USA',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['CAN', 'MTQ'],
    ['CRC', 'HAI'],
  ],
  [
    ['MEX', 'KOR'],
    ['USA', 'SLV'],
  ],
];

export const KNOCKOUT: ConcacafKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
