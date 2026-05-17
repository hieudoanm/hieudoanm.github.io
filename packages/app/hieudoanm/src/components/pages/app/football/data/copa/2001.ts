import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_2001: CopaYearData = {
  year: 2001,
  host: 'Colombia',
  champion: 'Colombia',
  runnerUp: 'Mexico',
  available: false,
  teams: {
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    HON: t('HON', 'Honduras', 'hn'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [
    group('A', ['COL', 'CHI', 'ECU', 'VEN'], {
      COL: s('COL', 3, 3, 0, 0, 5, 0),
      CHI: s('CHI', 3, 2, 0, 1, 5, 3),
      ECU: s('ECU', 3, 1, 0, 2, 5, 5),
      VEN: s('VEN', 3, 0, 0, 3, 0, 7),
    }),
    group('B', ['BRA', 'MEX', 'PER', 'PAR'], {
      BRA: s('BRA', 3, 2, 0, 1, 5, 2),
      MEX: s('MEX', 3, 1, 1, 1, 1, 1),
      PER: s('PER', 3, 1, 1, 1, 4, 5),
      PAR: s('PAR', 3, 0, 2, 1, 4, 6),
    }),
    group('C', ['CRC', 'HON', 'URU', 'BOL'], {
      CRC: s('CRC', 3, 2, 1, 0, 6, 1),
      HON: s('HON', 3, 2, 0, 1, 3, 1),
      URU: s('URU', 3, 1, 1, 1, 2, 2),
      BOL: s('BOL', 3, 0, 0, 3, 0, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_2001.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  BRA_HON: 'HON',
  CHI_MEX: 'MEX',
  COL_PER: 'COL',
  CRC_URU: 'URU',
  // Semi Final
  COL_HON: 'COL',
  MEX_URU: 'MEX',
  // Final
  COL_MEX: 'COL',
  HON_URU: 'HON',
};

const THIRD_PLACE: [string, string] = ['URU', 'HON'];

const BRACKET_RAW: BracketRaw = [
  [
    ['CHI', 'MEX'],
    ['URU', 'CRC'],
  ],
  [
    ['BRA', 'HON'],
    ['COL', 'PER'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
