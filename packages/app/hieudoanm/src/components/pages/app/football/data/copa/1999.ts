import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_1999: CopaYearData = {
  year: 1999,
  host: 'Paraguay',
  champion: 'Brazil',
  runnerUp: 'Uruguay',
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    JPN: t('JPN', 'Japan', 'jp'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [
    group('A', ['PAR', 'PER', 'BOL', 'JPN'], {
      PAR: s('PAR', 3, 2, 1, 0, 5, 0),
      PER: s('PER', 3, 2, 0, 1, 4, 3),
      BOL: s('BOL', 3, 0, 2, 1, 1, 2),
      JPN: s('JPN', 3, 0, 1, 2, 3, 8),
    }),
    group('B', ['BRA', 'MEX', 'CHI', 'VEN'], {
      BRA: s('BRA', 3, 3, 0, 0, 10, 1),
      MEX: s('MEX', 3, 2, 0, 1, 5, 3),
      CHI: s('CHI', 3, 1, 0, 2, 3, 2),
      VEN: s('VEN', 3, 0, 0, 3, 1, 13),
    }),
    group('C', ['COL', 'ARG', 'URU', 'ECU'], {
      COL: s('COL', 3, 3, 0, 0, 6, 1),
      ARG: s('ARG', 3, 2, 0, 1, 5, 4),
      URU: s('URU', 3, 1, 0, 2, 2, 4),
      ECU: s('ECU', 3, 0, 0, 3, 3, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_1999.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_BRA: 'BRA',
  CHI_COL: 'CHI',
  MEX_PER: 'MEX',
  PAR_URU: 'URU',
  // Final
  BRA_MEX: 'BRA',
  BRA_URU: 'BRA',
  CHI_MEX: 'MEX',
  CHI_URU: 'URU',
};

const THIRD_PLACE: [string, string] = ['CHI', 'MEX'];

const BRACKET_RAW: BracketRaw = [
  [
    ['MEX', 'PER'],
    ['PAR', 'URU'],
  ],
  [
    ['BRA', 'ARG'],
    ['CHI', 'COL'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
