import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1992: AfcYearData = {
  year: 1992,
  host: 'Japan',
  champion: 'Japan',
  runnerUp: 'Saudi Arabia',
  available: false,
  teams: {
    CHP: t('CHP', 'China PR', 'ch'),
    IRN: t('IRN', 'Iran', 'ir'),
    JPN: t('JPN', 'Japan', 'jp'),
    KSA: t('KSA', 'Saudi Arabia', 'sa'),
    PRK: t('PRK', 'North Korea', 'kp'),
    QAT: t('QAT', 'Qatar', 'qa'),
    THA: t('THA', 'Thailand', 'th'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
  },
  groups: [
    group('A', ['JPN', 'UAE', 'IRN', 'PRK'], {
      JPN: s('JPN', 3, 1, 2, 0, 2, 1),
      UAE: s('UAE', 3, 1, 2, 0, 2, 1),
      IRN: s('IRN', 3, 1, 1, 1, 2, 1),
      PRK: s('PRK', 3, 0, 1, 2, 2, 5),
    }),
    group('B', ['KSA', 'CHP', 'QAT', 'THA'], {
      KSA: s('KSA', 3, 1, 2, 0, 6, 2),
      CHP: s('CHP', 3, 1, 2, 0, 3, 2),
      QAT: s('QAT', 3, 0, 2, 1, 3, 4),
      THA: s('THA', 3, 0, 2, 1, 1, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_1992.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  CHP_JPN: 'JPN',
  KSA_UAE: 'KSA',
  // Final
  CHP_UAE: 'CHP',
  JPN_KSA: 'JPN',
};

const THIRD_PLACE: [string, string] = ['CHP', 'UAE'];

const BRACKET_RAW: BracketRaw = [
  ['JPN', 'CHP'],
  ['KSA', 'UAE'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
