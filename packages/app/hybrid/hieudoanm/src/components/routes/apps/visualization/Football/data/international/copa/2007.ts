import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_2007: CopaYearData = {
  year: 2007,
  host: 'Venezuela',
  champion: 'Brazil',
  runnerUp: 'Argentina',
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
    group('A', ['VEN', 'URU', 'PER', 'BOL'], {
      VEN: s('VEN', 3, 1, 2, 0, 4, 2),
      URU: s('URU', 3, 1, 1, 1, 1, 3),
      PER: s('PER', 3, 1, 1, 1, 5, 4),
      BOL: s('BOL', 3, 0, 2, 1, 4, 5),
    }),
    group('B', ['MEX', 'BRA', 'CHI', 'ECU'], {
      MEX: s('MEX', 3, 2, 1, 0, 4, 1),
      BRA: s('BRA', 3, 2, 0, 1, 4, 2),
      CHI: s('CHI', 3, 1, 1, 1, 3, 5),
      ECU: s('ECU', 3, 0, 0, 3, 3, 6),
    }),
    group('C', ['ARG', 'PAR', 'COL', 'USA'], {
      ARG: s('ARG', 3, 3, 0, 0, 9, 3),
      PAR: s('PAR', 3, 2, 0, 1, 8, 2),
      COL: s('COL', 3, 1, 0, 2, 3, 9),
      USA: s('USA', 3, 0, 0, 3, 2, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_2007.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_PER: 'ARG',
  BRA_CHI: 'BRA',
  MEX_PAR: 'MEX',
  URU_VEN: 'URU',
  // Semi Final
  ARG_MEX: 'ARG',
  BRA_URU: 'BRA',
  // Final
  ARG_BRA: 'BRA',
  MEX_URU: 'MEX',
};

const THIRD_PLACE: [string, string] = ['MEX', 'URU'];

const BRACKET_RAW: BracketRaw = [
  [
    ['CHI', 'BRA'],
    ['VEN', 'URU'],
  ],
  [
    ['ARG', 'PER'],
    ['MEX', 'PAR'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
