import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_2011: CopaYearData = {
  year: 2011,
  host: 'Argentina',
  champion: 'Uruguay',
  runnerUp: 'Paraguay',
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [
    group('A', ['COL', 'ARG', 'CRC', 'BOL'], {
      COL: s('COL', 3, 2, 1, 0, 3, 0),
      ARG: s('ARG', 3, 1, 2, 0, 4, 1),
      CRC: s('CRC', 3, 1, 0, 2, 2, 4),
      BOL: s('BOL', 3, 0, 1, 2, 1, 5),
    }),
    group('B', ['BRA', 'VEN', 'PAR', 'ECU'], {
      BRA: s('BRA', 3, 1, 2, 0, 6, 4),
      VEN: s('VEN', 3, 1, 2, 0, 4, 3),
      PAR: s('PAR', 3, 0, 3, 0, 5, 5),
      ECU: s('ECU', 3, 0, 1, 2, 2, 5),
    }),
    group('C', ['CHI', 'URU', 'PER', 'MEX'], {
      CHI: s('CHI', 3, 2, 1, 0, 4, 2),
      URU: s('URU', 3, 1, 2, 0, 3, 2),
      PER: s('PER', 3, 1, 1, 1, 2, 2),
      MEX: s('MEX', 3, 0, 0, 3, 1, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_2011.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_URU: 'URU',
  BRA_PAR: 'PAR',
  CHI_VEN: 'VEN',
  COL_PER: 'PER',
  // Semi Final
  PAR_VEN: 'PAR',
  PER_URU: 'URU',
  // Final
  PAR_URU: 'URU',
  PER_VEN: 'PER',
};

const THIRD_PLACE: [string, string] = ['PER', 'VEN'];

const BRACKET_RAW: BracketRaw = [
  [
    ['ARG', 'URU'],
    ['COL', 'PER'],
  ],
  [
    ['BRA', 'PAR'],
    ['CHI', 'VEN'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
