import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_2000: AfcYearData = {
  year: 2000,
  host: 'Lebanon',
  champion: 'Japan',
  runnerUp: 'Saudi Arabia',
  available: false,
  teams: {
    CHP: t('CHP', 'China PR', 'ch'),
    IDN: t('IDN', 'Indonesia', 'id'),
    IRN: t('IRN', 'Iran', 'ir'),
    IRQ: t('IRQ', 'Iraq', 'iq'),
    JPN: t('JPN', 'Japan', 'jp'),
    KOR: t('KOR', 'South Korea', 'kr'),
    KSA: t('KSA', 'Saudi Arabia', 'sa'),
    KUW: t('KUW', 'Kuwait', 'kw'),
    LBN: t('LBN', 'Lebanon', 'lb'),
    QAT: t('QAT', 'Qatar', 'qa'),
    THA: t('THA', 'Thailand', 'th'),
    UZB: t('UZB', 'Uzbekistan', 'uz'),
  },
  groups: [
    group('A', ['IRN', 'IRQ', 'LBN', 'THA'], {
      IRN: s('IRN', 3, 2, 1, 0, 6, 1),
      IRQ: s('IRQ', 3, 1, 1, 1, 4, 3),
      LBN: s('LBN', 3, 0, 2, 1, 3, 7),
      THA: s('THA', 3, 0, 2, 1, 2, 4),
    }),
    group('B', ['CHP', 'KUW', 'KOR', 'IDN'], {
      CHP: s('CHP', 3, 1, 2, 0, 6, 2),
      KUW: s('KUW', 3, 1, 2, 0, 1, 0),
      KOR: s('KOR', 3, 1, 1, 1, 5, 3),
      IDN: s('IDN', 3, 0, 1, 2, 0, 7),
    }),
    group('C', ['JPN', 'KSA', 'QAT', 'UZB'], {
      JPN: s('JPN', 3, 2, 1, 0, 13, 3),
      KSA: s('KSA', 3, 1, 1, 1, 6, 4),
      QAT: s('QAT', 3, 0, 3, 0, 2, 2),
      UZB: s('UZB', 3, 0, 1, 2, 2, 14),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_2000.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  CHP_QAT: 'CHP',
  IRN_KOR: 'KOR',
  IRQ_JPN: 'JPN',
  KSA_KUW: 'KSA',
  // Semi Final
  CHP_KOR: 'KOR',
  JPN_KSA: 'JPN',
  // Final
  CHP_JPN: 'JPN',
  KOR_KSA: 'KSA',
};

const THIRD_PLACE: [string, string] = ['CHP', 'KOR'];

const BRACKET_RAW: BracketRaw = [
  [
    ['CHP', 'QAT'],
    ['IRN', 'KOR'],
  ],
  [
    ['JPN', 'IRQ'],
    ['KUW', 'KSA'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
