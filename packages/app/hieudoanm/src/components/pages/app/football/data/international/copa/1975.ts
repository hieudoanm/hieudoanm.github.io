import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1975: CopaYearData = {
  year: 1975,
  host: 'Venezuela',
  champion: 'Peru',
  runnerUp: 'Colombia',
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
    group('A', ['BRA', 'ARG', 'VEN'], {
      BRA: s('BRA', 4, 4, 0, 0, 13, 1),
      ARG: s('ARG', 4, 2, 0, 2, 17, 4),
      VEN: s('VEN', 4, 0, 0, 4, 1, 26),
    }),
    group('B', ['PER', 'CHI', 'BOL'], {
      PER: s('PER', 4, 3, 1, 0, 8, 3),
      CHI: s('CHI', 4, 1, 1, 2, 7, 6),
      BOL: s('BOL', 4, 1, 0, 3, 3, 9),
    }),
    group('C', ['COL', 'PAR', 'ECU'], {
      COL: s('COL', 4, 4, 0, 0, 7, 1),
      PAR: s('PAR', 4, 1, 1, 2, 5, 5),
      ECU: s('ECU', 4, 0, 1, 3, 4, 10),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_1975.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  BRA_PER: 'BRA',
  COL_URU: 'URU',
  // Final
  COL_PER: 'PER',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['COL', 'URU'],
    ['BRA', 'PER'],
  ],
  [
    ['URU', 'COL'],
    ['PER', 'BRA'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
