import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_2011: AfcYearData = {
  year: 2011,
  host: 'Qatar',
  champion: 'Japan',
  runnerUp: 'Australia',
  available: false,
  teams: {
    AUS: t('AUS', 'Australia', 'au'),
    BAH: t('BAH', 'Bahrain', 'ba'),
    CHP: t('CHP', 'China PR', 'ch'),
    IND: t('IND', 'India', 'in'),
    IRN: t('IRN', 'Iran', 'ir'),
    IRQ: t('IRQ', 'Iraq', 'iq'),
    JOR: t('JOR', 'Jordan', 'jo'),
    JPN: t('JPN', 'Japan', 'jp'),
    KOR: t('KOR', 'South Korea', 'kr'),
    KSA: t('KSA', 'Saudi Arabia', 'sa'),
    KUW: t('KUW', 'Kuwait', 'kw'),
    PRK: t('PRK', 'North Korea', 'kp'),
    QAT: t('QAT', 'Qatar', 'qa'),
    SYR: t('SYR', 'Syria', 'sy'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
    UZB: t('UZB', 'Uzbekistan', 'uz'),
  },
  groups: [
    group('A', ['UZB', 'QAT', 'CHP', 'KUW'], {
      UZB: s('UZB', 3, 2, 1, 0, 6, 3),
      QAT: s('QAT', 3, 2, 0, 1, 5, 2),
      CHP: s('CHP', 3, 1, 1, 1, 4, 4),
      KUW: s('KUW', 3, 0, 0, 3, 1, 7),
    }),
    group('B', ['JPN', 'JOR', 'SYR', 'KSA'], {
      JPN: s('JPN', 3, 2, 1, 0, 8, 2),
      JOR: s('JOR', 3, 2, 1, 0, 4, 2),
      SYR: s('SYR', 3, 1, 0, 2, 4, 5),
      KSA: s('KSA', 3, 0, 0, 3, 1, 8),
    }),
    group('C', ['KOR', 'AUS', 'BAH', 'IND'], {
      KOR: s('KOR', 3, 2, 1, 0, 7, 3),
      AUS: s('AUS', 3, 2, 1, 0, 6, 1),
      BAH: s('BAH', 3, 1, 0, 2, 6, 5),
      IND: s('IND', 3, 0, 0, 3, 3, 13),
    }),
    group('D', ['IRN', 'IRQ', 'PRK', 'UAE'], {
      IRN: s('IRN', 3, 3, 0, 0, 6, 1),
      IRQ: s('IRQ', 3, 2, 0, 1, 3, 2),
      PRK: s('PRK', 3, 0, 1, 2, 0, 2),
      UAE: s('UAE', 3, 0, 1, 2, 0, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_2011.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  AUS_IRQ: 'AUS',
  IRN_KOR: 'KOR',
  JOR_UZB: 'UZB',
  JPN_QAT: 'JPN',
  // Final
  AUS_JPN: 'JPN',
  AUS_UZB: 'AUS',
  JPN_KOR: 'JPN',
  KOR_UZB: 'KOR',
};

const THIRD_PLACE: [string, string] = ['UZB', 'KOR'];

const BRACKET_RAW: BracketRaw = [
  [
    ['QAT', 'JPN'],
    ['UZB', 'JOR'],
  ],
  [
    ['AUS', 'IRQ'],
    ['IRN', 'KOR'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
