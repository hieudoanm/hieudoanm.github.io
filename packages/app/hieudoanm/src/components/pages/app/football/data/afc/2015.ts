import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_2015: AfcYearData = {
  year: 2015,
  host: 'Australia',
  champion: 'Australia',
  runnerUp: 'South Korea',
  available: false,
  teams: {
    AUS: t('AUS', 'Australia', 'au'),
    BAH: t('BAH', 'Bahrain', 'ba'),
    CHP: t('CHP', 'China PR', 'ch'),
    IRN: t('IRN', 'Iran', 'ir'),
    IRQ: t('IRQ', 'Iraq', 'iq'),
    JOR: t('JOR', 'Jordan', 'jo'),
    JPN: t('JPN', 'Japan', 'jp'),
    KOR: t('KOR', 'South Korea', 'kr'),
    KSA: t('KSA', 'Saudi Arabia', 'sa'),
    KUW: t('KUW', 'Kuwait', 'kw'),
    OMA: t('OMA', 'Oman', 'om'),
    PLE: t('PLE', 'Palestine', 'ps'),
    PRK: t('PRK', 'North Korea', 'kp'),
    QAT: t('QAT', 'Qatar', 'qa'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
    UZB: t('UZB', 'Uzbekistan', 'uz'),
  },
  groups: [
    group('A', ['KOR', 'AUS', 'OMA', 'KUW'], {
      KOR: s('KOR', 3, 3, 0, 0, 3, 0),
      AUS: s('AUS', 3, 2, 0, 1, 8, 2),
      OMA: s('OMA', 3, 1, 0, 2, 1, 5),
      KUW: s('KUW', 3, 0, 0, 3, 1, 6),
    }),
    group('B', ['CHP', 'UZB', 'KSA', 'PRK'], {
      CHP: s('CHP', 3, 3, 0, 0, 5, 2),
      UZB: s('UZB', 3, 2, 0, 1, 5, 3),
      KSA: s('KSA', 3, 1, 0, 2, 5, 5),
      PRK: s('PRK', 3, 0, 0, 3, 2, 7),
    }),
    group('C', ['IRN', 'UAE', 'BAH', 'QAT'], {
      IRN: s('IRN', 3, 3, 0, 0, 4, 0),
      UAE: s('UAE', 3, 2, 0, 1, 6, 3),
      BAH: s('BAH', 3, 1, 0, 2, 3, 5),
      QAT: s('QAT', 3, 0, 0, 3, 2, 7),
    }),
    group('D', ['JPN', 'IRQ', 'JOR', 'PLE'], {
      JPN: s('JPN', 3, 3, 0, 0, 7, 0),
      IRQ: s('IRQ', 3, 2, 0, 1, 3, 1),
      JOR: s('JOR', 3, 1, 0, 2, 5, 4),
      PLE: s('PLE', 3, 0, 0, 3, 1, 11),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_2015.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  AUS_CHP: 'AUS',
  IRN_IRQ: 'IRQ',
  JPN_UAE: 'UAE',
  KOR_UZB: 'KOR',
  // Semi Final
  AUS_KOR: 'AUS',
  IRQ_UAE: 'UAE',
  // Final
  AUS_UAE: 'AUS',
  IRQ_KOR: 'KOR',
};

const THIRD_PLACE: [string, string] = ['IRQ', 'UAE'];

const BRACKET_RAW: BracketRaw = [
  [
    ['AUS', 'CHP'],
    ['KOR', 'UZB'],
  ],
  [
    ['IRN', 'IRQ'],
    ['JPN', 'UAE'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
