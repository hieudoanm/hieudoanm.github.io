import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_2015: CopaYearData = {
  year: 2015,
  host: 'Chile',
  champion: 'Chile',
  runnerUp: 'Argentina',
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [
    group('A', ['CHI', 'BOL', 'ECU', 'MEX'], {
      CHI: s('CHI', 3, 2, 1, 0, 10, 3),
      BOL: s('BOL', 3, 1, 1, 1, 3, 7),
      ECU: s('ECU', 3, 1, 0, 2, 4, 6),
      MEX: s('MEX', 3, 0, 2, 1, 4, 5),
    }),
    group('B', ['ARG', 'PAR', 'URU', 'JAM'], {
      ARG: s('ARG', 3, 2, 1, 0, 4, 2),
      PAR: s('PAR', 3, 1, 2, 0, 4, 3),
      URU: s('URU', 3, 1, 1, 1, 2, 2),
      JAM: s('JAM', 3, 0, 0, 3, 0, 3),
    }),
    group('C', ['BRA', 'COL', 'PER', 'VEN'], {
      BRA: s('BRA', 3, 2, 0, 1, 4, 3),
      COL: s('COL', 3, 1, 1, 1, 1, 1),
      PER: s('PER', 3, 1, 1, 1, 2, 2),
      VEN: s('VEN', 3, 1, 0, 2, 2, 3),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_2015.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_COL: 'ARG',
  BOL_PER: 'PER',
  BRA_PAR: 'PAR',
  CHI_URU: 'CHI',
  // Semi Final
  ARG_PAR: 'ARG',
  CHI_PER: 'CHI',
  // Final
  ARG_CHI: 'CHI',
  PAR_PER: 'PER',
};

const THIRD_PLACE: [string, string] = ['PER', 'PAR'];

const BRACKET_RAW: BracketRaw = [
  [
    ['CHI', 'URU'],
    ['BOL', 'PER'],
  ],
  [
    ['ARG', 'COL'],
    ['BRA', 'PAR'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
