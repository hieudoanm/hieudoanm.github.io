import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1995: CopaYearData = {
  year: 1995,
  host: 'Uruguay',
  champion: 'Uruguay',
  runnerUp: 'Brazil',
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
    USA: t('USA', 'United States', 'us'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [
    group('A', ['URU', 'PAR', 'MEX', 'VEN'], {
      URU: s('URU', 3, 2, 1, 0, 6, 2),
      PAR: s('PAR', 3, 2, 0, 1, 5, 4),
      MEX: s('MEX', 3, 1, 1, 1, 5, 4),
      VEN: s('VEN', 3, 0, 0, 3, 4, 10),
    }),
    group('B', ['BRA', 'COL', 'ECU', 'PER'], {
      BRA: s('BRA', 3, 3, 0, 0, 6, 0),
      COL: s('COL', 3, 1, 1, 1, 2, 4),
      ECU: s('ECU', 3, 1, 0, 2, 2, 3),
      PER: s('PER', 3, 0, 1, 2, 2, 5),
    }),
    group('C', ['USA', 'ARG', 'BOL', 'CHI'], {
      USA: s('USA', 3, 2, 0, 1, 5, 2),
      ARG: s('ARG', 3, 2, 0, 1, 6, 4),
      BOL: s('BOL', 3, 1, 1, 1, 4, 4),
      CHI: s('CHI', 3, 0, 1, 2, 3, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_1995.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_BRA: 'BRA',
  BOL_URU: 'URU',
  COL_PAR: 'COL',
  MEX_USA: 'USA',
  // Semi Final
  BRA_USA: 'BRA',
  COL_URU: 'URU',
  // Final
  BRA_URU: 'URU',
  COL_USA: 'COL',
};

const THIRD_PLACE: [string, string] = ['COL', 'USA'];

const BRACKET_RAW: BracketRaw = [
  [
    ['PAR', 'COL'],
    ['URU', 'BOL'],
  ],
  [
    ['BRA', 'ARG'],
    ['USA', 'MEX'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
