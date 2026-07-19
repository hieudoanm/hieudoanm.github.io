import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_2004: AfcYearData = {
  year: 2004,
  host: 'China PR',
  champion: 'Japan',
  runnerUp: 'China PR',
  available: false,
  teams: {
    BAH: t('BAH', 'Bahrain', 'ba'),
    CHP: t('CHP', 'China PR', 'ch'),
    IDN: t('IDN', 'Indonesia', 'id'),
    IRN: t('IRN', 'Iran', 'ir'),
    IRQ: t('IRQ', 'Iraq', 'iq'),
    JOR: t('JOR', 'Jordan', 'jo'),
    JPN: t('JPN', 'Japan', 'jp'),
    KOR: t('KOR', 'South Korea', 'kr'),
    KSA: t('KSA', 'Saudi Arabia', 'sa'),
    KUW: t('KUW', 'Kuwait', 'kw'),
    OMA: t('OMA', 'Oman', 'om'),
    QAT: t('QAT', 'Qatar', 'qa'),
    THA: t('THA', 'Thailand', 'th'),
    TKM: t('TKM', 'Turkmenistan', 'tm'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
    UZB: t('UZB', 'Uzbekistan', 'uz'),
  },
  groups: [
    group('A', ['CHP', 'BAH', 'IDN', 'QAT'], {
      CHP: s('CHP', 3, 2, 1, 0, 8, 2),
      BAH: s('BAH', 3, 1, 2, 0, 6, 4),
      IDN: s('IDN', 3, 1, 0, 2, 3, 9),
      QAT: s('QAT', 3, 0, 1, 2, 2, 4),
    }),
    group('B', ['KOR', 'JOR', 'KUW', 'UAE'], {
      KOR: s('KOR', 3, 2, 1, 0, 6, 0),
      JOR: s('JOR', 3, 1, 2, 0, 2, 0),
      KUW: s('KUW', 3, 1, 0, 2, 3, 7),
      UAE: s('UAE', 3, 0, 1, 2, 1, 5),
    }),
    group('C', ['UZB', 'IRQ', 'KSA', 'TKM'], {
      UZB: s('UZB', 3, 3, 0, 0, 3, 0),
      IRQ: s('IRQ', 3, 2, 0, 1, 5, 4),
      KSA: s('KSA', 3, 0, 1, 2, 3, 5),
      TKM: s('TKM', 3, 0, 1, 2, 4, 6),
    }),
    group('D', ['JPN', 'IRN', 'OMA', 'THA'], {
      JPN: s('JPN', 3, 2, 1, 0, 5, 1),
      IRN: s('IRN', 3, 1, 2, 0, 5, 2),
      OMA: s('OMA', 3, 1, 1, 1, 4, 3),
      THA: s('THA', 3, 0, 0, 3, 1, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_2004.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  BAH_UZB: 'BAH',
  CHP_IRQ: 'CHP',
  IRN_KOR: 'IRN',
  JOR_JPN: 'JPN',
  // Final
  BAH_IRN: 'IRN',
  BAH_JPN: 'JPN',
  CHP_IRN: 'CHP',
  CHP_JPN: 'JPN',
};

const THIRD_PLACE: [string, string] = ['IRN', 'BAH'];

const BRACKET_RAW: BracketRaw = [
  [
    ['CHP', 'IRQ'],
    ['UZB', 'BAH'],
  ],
  [
    ['JPN', 'JOR'],
    ['KOR', 'IRN'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
