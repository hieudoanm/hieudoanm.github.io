import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1997: CopaYearData = {
  year: 1997,
  host: 'Bolivia',
  champion: 'Brazil',
  runnerUp: 'Bolivia',
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
    group('A', ['ECU', 'ARG', 'PAR', 'CHI'], {
      ECU: s('ECU', 3, 2, 1, 0, 4, 1),
      ARG: s('ARG', 3, 1, 2, 0, 3, 1),
      PAR: s('PAR', 3, 1, 1, 1, 2, 3),
      CHI: s('CHI', 3, 0, 0, 3, 1, 5),
    }),
    group('B', ['BOL', 'PER', 'URU', 'VEN'], {
      BOL: s('BOL', 3, 3, 0, 0, 4, 0),
      PER: s('PER', 3, 2, 0, 1, 3, 2),
      URU: s('URU', 3, 1, 0, 2, 2, 2),
      VEN: s('VEN', 3, 0, 0, 3, 0, 5),
    }),
    group('C', ['BRA', 'MEX', 'COL', 'CRC'], {
      BRA: s('BRA', 3, 3, 0, 0, 10, 2),
      MEX: s('MEX', 3, 1, 1, 1, 5, 5),
      COL: s('COL', 3, 1, 0, 2, 5, 5),
      CRC: s('CRC', 3, 0, 1, 2, 2, 10),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_1997.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_PER: 'PER',
  BOL_COL: 'BOL',
  BRA_PAR: 'BRA',
  ECU_MEX: 'MEX',
  // Final
  BOL_BRA: 'BRA',
  BOL_MEX: 'BOL',
  BRA_PER: 'BRA',
  MEX_PER: 'MEX',
};

const THIRD_PLACE: [string, string] = ['MEX', 'PER'];

const BRACKET_RAW: BracketRaw = [
  [
    ['BOL', 'COL'],
    ['PER', 'ARG'],
  ],
  [
    ['BRA', 'PAR'],
    ['ECU', 'MEX'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
