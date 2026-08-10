import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_2024: AfcYearData = {
  year: 2024,
  host: 'Qatar',
  champion: 'Qatar',
  runnerUp: 'Jordan',
  available: false,
  teams: {
    AUS: t('AUS', 'Australia', 'au'),
    BAH: t('BAH', 'Bahrain', 'ba'),
    CHP: t('CHP', 'China PR', 'ch'),
    HKG: t('HKG', 'Hong Kong', 'hk'),
    IDN: t('IDN', 'Indonesia', 'id'),
    IND: t('IND', 'India', 'in'),
    IRN: t('IRN', 'Iran', 'ir'),
    IRQ: t('IRQ', 'Iraq', 'iq'),
    JOR: t('JOR', 'Jordan', 'jo'),
    JPN: t('JPN', 'Japan', 'jp'),
    KOR: t('KOR', 'South Korea', 'kr'),
    KSA: t('KSA', 'Saudi Arabia', 'sa'),
    KYR: t('KYR', 'Kyrgyzstan', 'ky'),
    LBN: t('LBN', 'Lebanon', 'lb'),
    MAS: t('MAS', 'Malaysia', 'my'),
    OMA: t('OMA', 'Oman', 'om'),
    PLE: t('PLE', 'Palestine', 'ps'),
    QAT: t('QAT', 'Qatar', 'qa'),
    SYR: t('SYR', 'Syria', 'sy'),
    THA: t('THA', 'Thailand', 'th'),
    TJK: t('TJK', 'Tajikistan', 'tj'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
    UZB: t('UZB', 'Uzbekistan', 'uz'),
    VIE: t('VIE', 'Vietnam', 'vn'),
  },
  groups: [
    group('A', ['QAT', 'TJK', 'CHP', 'LBN'], {
      QAT: s('QAT', 3, 3, 0, 0, 5, 0),
      TJK: s('TJK', 3, 1, 1, 1, 2, 2),
      CHP: s('CHP', 3, 0, 2, 1, 0, 1),
      LBN: s('LBN', 3, 0, 1, 2, 1, 5),
    }),
    group('B', ['AUS', 'UZB', 'SYR', 'IND'], {
      AUS: s('AUS', 3, 2, 1, 0, 4, 1),
      UZB: s('UZB', 3, 1, 2, 0, 4, 1),
      SYR: s('SYR', 3, 1, 1, 1, 1, 1),
      IND: s('IND', 3, 0, 0, 3, 0, 6),
    }),
    group('C', ['IRN', 'PLE', 'UAE', 'HKG'], {
      IRN: s('IRN', 3, 3, 0, 0, 7, 2),
      PLE: s('PLE', 3, 1, 1, 1, 5, 5),
      UAE: s('UAE', 3, 1, 1, 1, 5, 4),
      HKG: s('HKG', 3, 0, 0, 3, 1, 7),
    }),
    group('D', ['IRQ', 'JPN', 'IDN', 'VIE'], {
      IRQ: s('IRQ', 3, 3, 0, 0, 8, 4),
      JPN: s('JPN', 3, 2, 0, 1, 8, 5),
      IDN: s('IDN', 3, 1, 0, 2, 3, 6),
      VIE: s('VIE', 3, 0, 0, 3, 4, 8),
    }),
    group('E', ['BAH', 'KOR', 'JOR', 'MAS'], {
      BAH: s('BAH', 3, 2, 0, 1, 3, 3),
      KOR: s('KOR', 3, 1, 2, 0, 8, 6),
      JOR: s('JOR', 3, 1, 1, 1, 6, 3),
      MAS: s('MAS', 3, 0, 1, 2, 3, 8),
    }),
    group('F', ['KSA', 'THA', 'OMA', 'KYR'], {
      KSA: s('KSA', 3, 2, 1, 0, 4, 1),
      THA: s('THA', 3, 1, 2, 0, 2, 0),
      OMA: s('OMA', 3, 0, 2, 1, 2, 3),
      KYR: s('KYR', 3, 0, 1, 2, 1, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_2024.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  AUS_IDN: 'AUS',
  BAH_JPN: 'JPN',
  IRN_SYR: 'IRN',
  IRQ_JOR: 'JOR',
  KOR_KSA: 'KOR',
  PLE_QAT: 'QAT',
  THA_UZB: 'UZB',
  TJK_UAE: 'TJK',
  // Quarter Final
  IRN_JPN: 'IRN',
  JOR_QAT: 'QAT',
  // Semi Final
  JOR_TJK: 'JOR',
  // Final
  AUS_KOR: 'KOR',
  IRN_QAT: 'QAT',
  JOR_KOR: 'JOR',
  QAT_UZB: 'QAT',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['AUS', 'IDN'],
      ['TJK', 'UAE'],
    ],
    [
      ['IRQ', 'JOR'],
      ['QAT', 'PLE'],
    ],
  ],
  [
    [
      ['KSA', 'KOR'],
      ['UZB', 'THA'],
    ],
    [
      ['BAH', 'JPN'],
      ['IRN', 'SYR'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
