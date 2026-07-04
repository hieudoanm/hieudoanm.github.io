import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1993: CopaYearData = {
  year: 1993,
  host: 'Ecuador',
  champion: 'Argentina',
  runnerUp: 'Mexico',
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
    group('A', ['ECU', 'URU', 'VEN', 'USA'], {
      ECU: s('ECU', 3, 3, 0, 0, 10, 2),
      URU: s('URU', 3, 1, 1, 1, 4, 4),
      VEN: s('VEN', 3, 0, 2, 1, 6, 11),
      USA: s('USA', 3, 0, 1, 2, 3, 6),
    }),
    group('B', ['PER', 'BRA', 'PAR', 'CHI'], {
      PER: s('PER', 3, 1, 2, 0, 2, 1),
      BRA: s('BRA', 3, 1, 1, 1, 5, 3),
      PAR: s('PAR', 3, 1, 1, 1, 2, 4),
      CHI: s('CHI', 3, 1, 0, 2, 3, 4),
    }),
    group('C', ['COL', 'ARG', 'MEX', 'BOL'], {
      COL: s('COL', 3, 1, 2, 0, 4, 3),
      ARG: s('ARG', 3, 1, 2, 0, 3, 2),
      MEX: s('MEX', 3, 0, 2, 1, 2, 3),
      BOL: s('BOL', 3, 0, 2, 1, 1, 2),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_1993.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_BRA: 'ARG',
  COL_URU: 'COL',
  ECU_PAR: 'ECU',
  MEX_PER: 'MEX',
  // Semi Final
  ARG_MEX: 'ARG',
  COL_ECU: 'COL',
  // Final
  ARG_COL: 'ARG',
  ECU_MEX: 'MEX',
};

const THIRD_PLACE: [string, string] = ['ECU', 'COL'];

const BRACKET_RAW: BracketRaw = [
  [
    ['COL', 'URU'],
    ['ECU', 'PAR'],
  ],
  [
    ['BRA', 'ARG'],
    ['PER', 'MEX'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
