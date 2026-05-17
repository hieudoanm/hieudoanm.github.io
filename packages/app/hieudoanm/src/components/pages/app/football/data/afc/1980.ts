import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1980: AfcYearData = {
  year: 1980,
  host: 'Kuwait',
  champion: 'Kuwait',
  runnerUp: 'South Korea',
  available: false,
  teams: {
    BAN: t('BAN', 'Bangladesh', 'ba'),
    CHP: t('CHP', 'China PR', 'ch'),
    IRN: t('IRN', 'Iran', 'ir'),
    KOR: t('KOR', 'South Korea', 'kr'),
    KUW: t('KUW', 'Kuwait', 'kw'),
    MAS: t('MAS', 'Malaysia', 'my'),
    PRK: t('PRK', 'North Korea', 'kp'),
    QAT: t('QAT', 'Qatar', 'qa'),
    SYR: t('SYR', 'Syria', 'sy'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
  },
  groups: [
    group('A', ['PRK', 'IRN', 'SYR', 'CHP', 'BAN'], {
      PRK: s('PRK', 4, 3, 0, 1, 9, 7),
      IRN: s('IRN', 4, 2, 2, 0, 12, 4),
      SYR: s('SYR', 4, 2, 1, 1, 3, 2),
      CHP: s('CHP', 4, 1, 1, 2, 9, 5),
      BAN: s('BAN', 4, 0, 0, 4, 2, 17),
    }),
    group('B', ['KOR', 'KUW', 'MAS', 'QAT', 'UAE'], {
      KOR: s('KOR', 4, 3, 1, 0, 10, 2),
      KUW: s('KUW', 4, 2, 1, 1, 8, 5),
      MAS: s('MAS', 4, 1, 2, 1, 5, 5),
      QAT: s('QAT', 4, 1, 1, 2, 3, 8),
      UAE: s('UAE', 4, 0, 1, 3, 3, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_1980.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  IRN_KUW: 'KUW',
  KOR_PRK: 'KOR',
  // Final
  IRN_PRK: 'IRN',
  KOR_KUW: 'KUW',
};

const THIRD_PLACE: [string, string] = ['IRN', 'PRK'];

const BRACKET_RAW: BracketRaw = [
  ['KOR', 'PRK'],
  ['KUW', 'IRN'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
