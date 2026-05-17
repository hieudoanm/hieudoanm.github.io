import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1983: CopaYearData = {
  year: 1983,
  host: 'Uruguay',
  champion: null,
  runnerUp: null,
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
    group('A', ['URU', 'CHI', 'VEN'], {
      URU: s('URU', 4, 3, 0, 1, 7, 4),
      CHI: s('CHI', 4, 2, 1, 1, 8, 2),
      VEN: s('VEN', 4, 0, 1, 3, 1, 10),
    }),
    group('B', ['BRA', 'ARG', 'ECU'], {
      BRA: s('BRA', 4, 2, 1, 1, 6, 1),
      ARG: s('ARG', 4, 1, 3, 0, 5, 4),
      ECU: s('ECU', 4, 0, 2, 2, 4, 10),
    }),
    group('C', ['PER', 'COL', 'BOL'], {
      PER: s('PER', 4, 2, 2, 0, 6, 4),
      COL: s('COL', 4, 1, 2, 1, 5, 5),
      BOL: s('BOL', 4, 0, 2, 2, 4, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_1983.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  PER_URU: 'URU',
  // Final
  BRA_URU: 'URU',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['PAR', 'BRA'],
    ['PER', 'URU'],
  ],
  [
    ['BRA', 'PAR'],
    ['URU', 'PER'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
