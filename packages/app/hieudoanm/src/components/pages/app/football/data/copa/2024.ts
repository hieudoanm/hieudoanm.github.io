import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_2024: CopaYearData = {
  year: 2024,
  host: 'United States',
  champion: 'Argentina',
  runnerUp: 'Colombia',
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CAN: t('CAN', 'Canada', 'ca'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    JAM: t('JAM', 'Jamaica', 'jm'),
    MEX: t('MEX', 'Mexico', 'mx'),
    PAN: t('PAN', 'Panama', 'pa'),
    PAR: t('PAR', 'Paraguay', 'py'),
    PER: t('PER', 'Peru', 'pe'),
    URU: t('URU', 'Uruguay', 'uy'),
    USA: t('USA', 'United States', 'us'),
    VEN: t('VEN', 'Venezuela', 've'),
  },
  groups: [
    group('A', ['ARG', 'CAN', 'CHI', 'PER'], {
      ARG: s('ARG', 3, 3, 0, 0, 5, 0),
      CAN: s('CAN', 3, 1, 1, 1, 1, 2),
      CHI: s('CHI', 3, 0, 2, 1, 0, 1),
      PER: s('PER', 3, 0, 1, 2, 0, 3),
    }),
    group('B', ['VEN', 'ECU', 'MEX', 'JAM'], {
      VEN: s('VEN', 3, 3, 0, 0, 6, 1),
      ECU: s('ECU', 3, 1, 1, 1, 4, 3),
      MEX: s('MEX', 3, 1, 1, 1, 1, 1),
      JAM: s('JAM', 3, 0, 0, 3, 1, 7),
    }),
    group('C', ['URU', 'PAN', 'USA', 'BOL'], {
      URU: s('URU', 3, 3, 0, 0, 9, 1),
      PAN: s('PAN', 3, 2, 0, 1, 6, 5),
      USA: s('USA', 3, 1, 0, 2, 3, 3),
      BOL: s('BOL', 3, 0, 0, 3, 1, 10),
    }),
    group('D', ['COL', 'BRA', 'CRC', 'PAR'], {
      COL: s('COL', 3, 2, 1, 0, 6, 2),
      BRA: s('BRA', 3, 1, 2, 0, 5, 2),
      CRC: s('CRC', 3, 1, 1, 1, 2, 4),
      PAR: s('PAR', 3, 0, 0, 3, 3, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_2024.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_ECU: 'ARG',
  BRA_URU: 'URU',
  CAN_VEN: 'CAN',
  COL_PAN: 'COL',
  // Semi Final
  ARG_CAN: 'ARG',
  COL_URU: 'COL',
  // Final
  ARG_COL: 'ARG',
  CAN_URU: 'URU',
};

const THIRD_PLACE: [string, string] = ['CAN', 'URU'];

const BRACKET_RAW: BracketRaw = [
  [
    ['ARG', 'ECU'],
    ['VEN', 'CAN'],
  ],
  [
    ['URU', 'BRA'],
    ['COL', 'PAN'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
