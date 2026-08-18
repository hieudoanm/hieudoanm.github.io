import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_2016: CopaYearData = {
  year: 2016,
  host: 'United States',
  champion: 'Chile',
  runnerUp: 'Argentina',
  available: false,
  teams: {
    ARG: t('ARG', 'Argentina', 'ar'),
    BOL: t('BOL', 'Bolivia', 'bo'),
    BRA: t('BRA', 'Brazil', 'br'),
    CHI: t('CHI', 'Chile', 'cl'),
    COL: t('COL', 'Colombia', 'co'),
    CRC: t('CRC', 'Costa Rica', 'cr'),
    ECU: t('ECU', 'Ecuador', 'ec'),
    HAI: t('HAI', 'Haiti', 'ht'),
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
    group('A', ['USA', 'COL', 'CRC', 'PAR'], {
      USA: s('USA', 3, 2, 0, 1, 5, 2),
      COL: s('COL', 3, 2, 0, 1, 6, 4),
      CRC: s('CRC', 3, 1, 1, 1, 3, 6),
      PAR: s('PAR', 3, 0, 1, 2, 1, 3),
    }),
    group('B', ['PER', 'ECU', 'BRA', 'HAI'], {
      PER: s('PER', 3, 2, 1, 0, 4, 2),
      ECU: s('ECU', 3, 1, 2, 0, 6, 2),
      BRA: s('BRA', 3, 1, 1, 1, 7, 2),
      HAI: s('HAI', 3, 0, 0, 3, 1, 12),
    }),
    group('C', ['MEX', 'VEN', 'URU', 'JAM'], {
      MEX: s('MEX', 3, 2, 1, 0, 6, 2),
      VEN: s('VEN', 3, 2, 1, 0, 3, 1),
      URU: s('URU', 3, 1, 0, 2, 4, 4),
      JAM: s('JAM', 3, 0, 0, 3, 0, 6),
    }),
    group('D', ['ARG', 'CHI', 'PAN', 'BOL'], {
      ARG: s('ARG', 3, 3, 0, 0, 10, 1),
      CHI: s('CHI', 3, 2, 0, 1, 7, 5),
      PAN: s('PAN', 3, 1, 0, 2, 4, 10),
      BOL: s('BOL', 3, 0, 0, 3, 2, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_2016.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_VEN: 'ARG',
  CHI_MEX: 'CHI',
  COL_PER: 'COL',
  ECU_USA: 'USA',
  // Semi Final
  ARG_CHI: 'CHI',
  COL_USA: 'COL',
  // Final
  ARG_USA: 'ARG',
  CHI_COL: 'CHI',
};

const THIRD_PLACE: [string, string] = ['USA', 'COL'];

const BRACKET_RAW: BracketRaw = [
  [
    ['USA', 'ECU'],
    ['PER', 'COL'],
  ],
  [
    ['ARG', 'VEN'],
    ['MEX', 'CHI'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
