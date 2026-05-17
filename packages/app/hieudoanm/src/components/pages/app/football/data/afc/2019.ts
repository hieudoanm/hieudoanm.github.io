import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_2019: AfcYearData = {
  year: 2019,
  host: 'United Arab Emirates',
  champion: 'Qatar',
  runnerUp: 'Japan',
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
    KYR: t('KYR', 'Kyrgyzstan', 'ky'),
    LBN: t('LBN', 'Lebanon', 'lb'),
    OMA: t('OMA', 'Oman', 'om'),
    PHI: t('PHI', 'Philippines', 'ph'),
    PLE: t('PLE', 'Palestine', 'ps'),
    PRK: t('PRK', 'North Korea', 'kp'),
    QAT: t('QAT', 'Qatar', 'qa'),
    SYR: t('SYR', 'Syria', 'sy'),
    THA: t('THA', 'Thailand', 'th'),
    TKM: t('TKM', 'Turkmenistan', 'tm'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
    UZB: t('UZB', 'Uzbekistan', 'uz'),
    VIE: t('VIE', 'Vietnam', 'vn'),
    YEM: t('YEM', 'Yemen', 'ye'),
  },
  groups: [
    group('A', ['UAE', 'BAH', 'THA', 'IND'], {
      UAE: s('UAE', 3, 1, 2, 0, 4, 2),
      BAH: s('BAH', 3, 1, 1, 1, 2, 2),
      THA: s('THA', 3, 1, 1, 1, 3, 5),
      IND: s('IND', 3, 1, 0, 2, 4, 4),
    }),
    group('B', ['JOR', 'AUS', 'PLE', 'SYR'], {
      JOR: s('JOR', 3, 2, 1, 0, 3, 0),
      AUS: s('AUS', 3, 2, 0, 1, 6, 3),
      PLE: s('PLE', 3, 0, 2, 1, 0, 3),
      SYR: s('SYR', 3, 0, 1, 2, 2, 5),
    }),
    group('C', ['KOR', 'CHP', 'KYR', 'PHI'], {
      KOR: s('KOR', 3, 3, 0, 0, 4, 0),
      CHP: s('CHP', 3, 2, 0, 1, 5, 3),
      KYR: s('KYR', 3, 1, 0, 2, 4, 4),
      PHI: s('PHI', 3, 0, 0, 3, 1, 7),
    }),
    group('D', ['IRN', 'IRQ', 'VIE', 'YEM'], {
      IRN: s('IRN', 3, 2, 1, 0, 7, 0),
      IRQ: s('IRQ', 3, 2, 1, 0, 6, 2),
      VIE: s('VIE', 3, 1, 0, 2, 4, 5),
      YEM: s('YEM', 3, 0, 0, 3, 0, 10),
    }),
    group('E', ['QAT', 'KSA', 'LBN', 'PRK'], {
      QAT: s('QAT', 3, 3, 0, 0, 10, 0),
      KSA: s('KSA', 3, 2, 0, 1, 6, 2),
      LBN: s('LBN', 3, 1, 0, 2, 4, 5),
      PRK: s('PRK', 3, 0, 0, 3, 1, 14),
    }),
    group('F', ['JPN', 'UZB', 'OMA', 'TKM'], {
      JPN: s('JPN', 3, 3, 0, 0, 6, 3),
      UZB: s('UZB', 3, 2, 0, 1, 7, 3),
      OMA: s('OMA', 3, 1, 0, 2, 4, 4),
      TKM: s('TKM', 3, 0, 0, 3, 3, 10),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_2019.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  AUS_UZB: 'AUS',
  BAH_KOR: 'KOR',
  CHP_THA: 'CHP',
  IRN_OMA: 'IRN',
  IRQ_QAT: 'QAT',
  JOR_VIE: 'VIE',
  JPN_KSA: 'JPN',
  KYR_UAE: 'UAE',
  // Quarter Final
  KOR_QAT: 'QAT',
  // Semi Final
  CHP_IRN: 'IRN',
  JPN_QAT: 'QAT',
  QAT_UAE: 'QAT',
  // Final
  AUS_UAE: 'UAE',
  IRN_JPN: 'JPN',
  JPN_VIE: 'JPN',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['IRN', 'OMA'],
      ['JOR', 'VIE'],
    ],
    [
      ['THA', 'CHP'],
      ['AUS', 'UZB'],
    ],
  ],
  [
    [
      ['JPN', 'KSA'],
      ['UAE', 'KYR'],
    ],
    [
      ['KOR', 'BAH'],
      ['QAT', 'IRQ'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
