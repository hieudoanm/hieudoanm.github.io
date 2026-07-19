import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1988: AfcYearData = {
  year: 1988,
  host: 'Qatar',
  champion: 'Saudi Arabia',
  runnerUp: 'South Korea',
  available: false,
  teams: {
    BAH: t('BAH', 'Bahrain', 'ba'),
    CHP: t('CHP', 'China PR', 'ch'),
    IRN: t('IRN', 'Iran', 'ir'),
    JPN: t('JPN', 'Japan', 'jp'),
    KOR: t('KOR', 'South Korea', 'kr'),
    KSA: t('KSA', 'Saudi Arabia', 'sa'),
    KUW: t('KUW', 'Kuwait', 'kw'),
    QAT: t('QAT', 'Qatar', 'qa'),
    SYR: t('SYR', 'Syria', 'sy'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
  },
  groups: [
    group('A', ['KOR', 'IRN', 'QAT', 'UAE', 'JPN'], {
      KOR: s('KOR', 4, 4, 0, 0, 9, 2),
      IRN: s('IRN', 4, 2, 1, 1, 3, 3),
      QAT: s('QAT', 4, 2, 0, 2, 7, 6),
      UAE: s('UAE', 4, 1, 0, 3, 2, 4),
      JPN: s('JPN', 4, 0, 1, 3, 0, 6),
    }),
    group('B', ['KSA', 'CHP', 'SYR', 'KUW', 'BAH'], {
      KSA: s('KSA', 4, 2, 2, 0, 4, 1),
      CHP: s('CHP', 4, 2, 1, 1, 6, 3),
      SYR: s('SYR', 4, 2, 0, 2, 2, 5),
      KUW: s('KUW', 4, 0, 3, 1, 2, 3),
      BAH: s('BAH', 4, 0, 2, 2, 1, 3),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_1988.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  CHP_KOR: 'KOR',
  IRN_KSA: 'KSA',
  // Final
  CHP_IRN: 'IRN',
  KOR_KSA: 'KSA',
};

const THIRD_PLACE: [string, string] = ['CHP', 'IRN'];

const BRACKET_RAW: BracketRaw = [
  ['KOR', 'CHP'],
  ['KSA', 'IRN'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
