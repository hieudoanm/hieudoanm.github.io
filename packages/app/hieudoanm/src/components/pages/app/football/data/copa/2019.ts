import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_2019: CopaYearData = {
  year: 2019,
  host: 'Brazil',
  champion: 'Brazil',
  runnerUp: 'Peru',
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    JPN: t('JPN', 'Japan', 'jp'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    QAT: t('QAT', 'Qatar', 'qa'),
    URU: t('URU', 'Uruguay', 'uy'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [
    group('A', ['BRA', 'VEN', 'PER', 'BOL'], {
      BRA: s('BRA', 3, 2, 1, 0, 8, 0),
      VEN: s('VEN', 3, 1, 2, 0, 3, 1),
      PER: s('PER', 3, 1, 1, 1, 3, 6),
      BOL: s('BOL', 3, 0, 0, 3, 2, 9),
    }),
    group('B', ['COL', 'ARG', 'PAR', 'QAT'], {
      COL: s('COL', 3, 3, 0, 0, 4, 0),
      ARG: s('ARG', 3, 1, 1, 1, 3, 3),
      PAR: s('PAR', 3, 0, 2, 1, 3, 4),
      QAT: s('QAT', 3, 0, 1, 2, 2, 5),
    }),
    group('C', ['URU', 'CHI', 'JPN', 'ECU'], {
      URU: s('URU', 3, 2, 1, 0, 7, 2),
      CHI: s('CHI', 3, 2, 0, 1, 6, 2),
      JPN: s('JPN', 3, 0, 2, 1, 3, 7),
      ECU: s('ECU', 3, 0, 1, 2, 2, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_2019.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_VEN: 'ARG',
  BRA_PAR: 'BRA',
  CHI_COL: 'CHI',
  PER_URU: 'PER',
  // Final
  ARG_BRA: 'BRA',
  ARG_CHI: 'ARG',
  BRA_PER: 'BRA',
  CHI_PER: 'PER',
};

const THIRD_PLACE: [string, string] = ['ARG', 'CHI'];

const BRACKET_RAW: BracketRaw = [
  [
    ['BRA', 'PAR'],
    ['COL', 'CHI'],
  ],
  [
    ['VEN', 'ARG'],
    ['URU', 'PER'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
