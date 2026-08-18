import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1979: CopaYearData = {
  year: 1979,
  host: 'Venezuela',
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
    group('A', ['COL', 'CHI', 'VEN'], {
      COL: s('COL', 4, 2, 1, 1, 5, 2),
      CHI: s('CHI', 4, 2, 1, 1, 10, 2),
      VEN: s('VEN', 4, 0, 2, 2, 1, 12),
    }),
    group('B', ['BRA', 'BOL', 'ARG'], {
      BRA: s('BRA', 4, 2, 1, 1, 7, 5),
      BOL: s('BOL', 4, 2, 0, 2, 4, 7),
      ARG: s('ARG', 4, 1, 1, 2, 7, 6),
    }),
    group('C', ['PAR', 'URU', 'ECU'], {
      PAR: s('PAR', 4, 2, 2, 0, 6, 3),
      URU: s('URU', 4, 1, 2, 1, 5, 5),
      ECU: s('ECU', 4, 1, 0, 3, 4, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_1979.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  BRA_PAR: 'PAR',
  CHI_PER: 'CHI',
  // Final
  CHI_PAR: 'CHI',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['PER', 'CHI'],
    ['CHI', 'PER'],
  ],
  [
    ['PAR', 'BRA'],
    ['BRA', 'PAR'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
