import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_2004: CopaYearData = {
  year: 2004,
  host: 'Peru',
  champion: 'Brazil',
  runnerUp: 'Argentina',
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [
    group('A', ['COL', 'PER', 'BOL', 'VEN'], {
      COL: s('COL', 3, 2, 1, 0, 4, 2),
      PER: s('PER', 3, 1, 2, 0, 7, 5),
      BOL: s('BOL', 3, 0, 2, 1, 3, 4),
      VEN: s('VEN', 3, 0, 1, 2, 2, 5),
    }),
    group('B', ['MEX', 'ARG', 'URU', 'ECU'], {
      MEX: s('MEX', 3, 2, 1, 0, 5, 3),
      ARG: s('ARG', 3, 2, 0, 1, 10, 4),
      URU: s('URU', 3, 1, 1, 1, 6, 7),
      ECU: s('ECU', 3, 0, 0, 3, 3, 10),
    }),
    group('C', ['PAR', 'BRA', 'CRC', 'CHI'], {
      PAR: s('PAR', 3, 2, 1, 0, 4, 2),
      BRA: s('BRA', 3, 2, 0, 1, 6, 3),
      CRC: s('CRC', 3, 1, 0, 2, 3, 6),
      CHI: s('CHI', 3, 0, 1, 2, 2, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_2004.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_PER: 'ARG',
  BRA_MEX: 'BRA',
  COL_CRC: 'COL',
  PAR_URU: 'URU',
  // Semi Final
  ARG_COL: 'ARG',
  BRA_URU: 'BRA',
  // Final
  ARG_BRA: 'BRA',
  COL_URU: 'URU',
};

const THIRD_PLACE: [string, string] = ['COL', 'URU'];

const BRACKET_RAW: BracketRaw = [
  [
    ['COL', 'CRC'],
    ['PER', 'ARG'],
  ],
  [
    ['MEX', 'BRA'],
    ['PAR', 'URU'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
