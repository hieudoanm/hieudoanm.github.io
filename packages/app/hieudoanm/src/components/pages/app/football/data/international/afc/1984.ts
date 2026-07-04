import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1984: AfcYearData = {
  year: 1984,
  host: 'Singapore',
  champion: 'Saudi Arabia',
  runnerUp: 'China PR',
  available: false,
  teams: {
    CHP: t('CHP', 'China PR', 'ch'),
    IND: t('IND', 'India', 'in'),
    IRN: t('IRN', 'Iran', 'ir'),
    KOR: t('KOR', 'South Korea', 'kr'),
    KSA: t('KSA', 'Saudi Arabia', 'sa'),
    KUW: t('KUW', 'Kuwait', 'kw'),
    QAT: t('QAT', 'Qatar', 'qa'),
    SIN: t('SIN', 'Singapore', 'sg'),
    SYR: t('SYR', 'Syria', 'sy'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
  },
  groups: [
    group('A', ['KSA', 'KUW', 'QAT', 'SYR', 'KOR'], {
      KSA: s('KSA', 4, 2, 2, 0, 4, 2),
      KUW: s('KUW', 4, 2, 1, 1, 4, 2),
      QAT: s('QAT', 4, 1, 2, 1, 3, 3),
      SYR: s('SYR', 4, 1, 1, 2, 3, 5),
      KOR: s('KOR', 4, 0, 2, 2, 1, 3),
    }),
    group('B', ['CHP', 'IRN', 'UAE', 'SIN', 'IND'], {
      CHP: s('CHP', 4, 3, 0, 1, 10, 2),
      IRN: s('IRN', 4, 2, 2, 0, 6, 1),
      UAE: s('UAE', 4, 2, 0, 2, 3, 8),
      SIN: s('SIN', 4, 1, 1, 2, 3, 4),
      IND: s('IND', 4, 0, 1, 3, 0, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_1984.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  CHP_KUW: 'CHP',
  IRN_KSA: 'KSA',
  // Final
  CHP_KSA: 'KSA',
  IRN_KUW: 'KUW',
};

const THIRD_PLACE: [string, string] = ['IRN', 'KUW'];

const BRACKET_RAW: BracketRaw = [
  ['KSA', 'IRN'],
  ['KUW', 'CHP'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
