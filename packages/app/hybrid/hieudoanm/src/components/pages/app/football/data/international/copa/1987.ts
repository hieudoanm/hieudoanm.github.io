import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1987: CopaYearData = {
  year: 1987,
  host: 'Argentina',
  champion: 'Uruguay',
  runnerUp: 'Chile',
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [
    group('A', ['ARG', 'PER', 'ECU'], {
      ARG: s('ARG', 2, 1, 1, 0, 4, 1),
      PER: s('PER', 2, 0, 2, 0, 2, 2),
      ECU: s('ECU', 2, 0, 1, 1, 1, 4),
    }),
    group('B', ['CHI', 'BRA', 'VEN'], {
      CHI: s('CHI', 2, 2, 0, 0, 7, 1),
      BRA: s('BRA', 2, 1, 0, 1, 5, 4),
      VEN: s('VEN', 2, 0, 0, 2, 1, 8),
    }),
    group('C', ['COL', 'PAR', 'BOL'], {
      COL: s('COL', 2, 2, 0, 0, 5, 0),
      PAR: s('PAR', 2, 0, 1, 1, 0, 3),
      BOL: s('BOL', 2, 0, 1, 1, 0, 2),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_1987.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  ARG_URU: 'URU',
  CHI_COL: 'CHI',
  // Final
  ARG_COL: 'COL',
  CHI_URU: 'URU',
};

const THIRD_PLACE: [string, string] = ['ARG', 'COL'];

const BRACKET_RAW: BracketRaw = [
  ['CHI', 'COL'],
  ['ARG', 'URU'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
