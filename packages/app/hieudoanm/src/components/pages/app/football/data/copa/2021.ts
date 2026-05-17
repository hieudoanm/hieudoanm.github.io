import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { CopaYearData, KnockoutYearData } from './types';

export const COPA_2021: CopaYearData = {
  year: 2021,
  host: 'Brazil',
  champion: 'Argentina',
  runnerUp: 'Brazil',
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
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(COPA_2021.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ARG_ECU: 'ARG',
  BRA_CHI: 'BRA',
  COL_URU: 'COL',
  PAR_PER: 'PER',
  // Semi Final
  ARG_COL: 'ARG',
  BRA_PER: 'BRA',
  // Final
  ARG_BRA: 'ARG',
  COL_PER: 'COL',
};

const THIRD_PLACE: [string, string] = ['PER', 'COL'];

const BRACKET_RAW: BracketRaw = [
  [
    ['PER', 'PAR'],
    ['BRA', 'CHI'],
  ],
  [
    ['URU', 'COL'],
    ['ARG', 'ECU'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
