import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_2007: AfcYearData = {
  year: 2007,
  host: 'Thailand',
  champion: 'Iraq',
  runnerUp: 'Saudi Arabia',
  available: false,
  teams: {
    AUS: t('AUS', 'Australia', 'au'),
    BAH: t('BAH', 'Bahrain', 'ba'),
    CHP: t('CHP', 'China PR', 'ch'),
    IDN: t('IDN', 'Indonesia', 'id'),
    IRN: t('IRN', 'Iran', 'ir'),
    IRQ: t('IRQ', 'Iraq', 'iq'),
    JPN: t('JPN', 'Japan', 'jp'),
    KOR: t('KOR', 'South Korea', 'kr'),
    KSA: t('KSA', 'Saudi Arabia', 'sa'),
    MAS: t('MAS', 'Malaysia', 'my'),
    OMA: t('OMA', 'Oman', 'om'),
    QAT: t('QAT', 'Qatar', 'qa'),
    THA: t('THA', 'Thailand', 'th'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
    UZB: t('UZB', 'Uzbekistan', 'uz'),
    VIE: t('VIE', 'Vietnam', 'vn'),
  },
  groups: [
    group('A', ['IRQ', 'THA', 'AUS', 'OMA'], {
      IRQ: s('IRQ', 3, 1, 2, 0, 4, 2),
      THA: s('THA', 3, 1, 1, 1, 3, 5),
      AUS: s('AUS', 3, 1, 1, 1, 6, 4),
      OMA: s('OMA', 3, 0, 2, 1, 1, 3),
    }),
    group('B', ['JPN', 'VIE', 'UAE', 'QAT'], {
      JPN: s('JPN', 3, 2, 1, 0, 8, 3),
      VIE: s('VIE', 3, 1, 1, 1, 4, 5),
      UAE: s('UAE', 3, 1, 0, 2, 3, 6),
      QAT: s('QAT', 3, 0, 2, 1, 3, 4),
    }),
    group('C', ['IRN', 'UZB', 'CHP', 'MAS'], {
      IRN: s('IRN', 3, 2, 1, 0, 6, 3),
      UZB: s('UZB', 3, 2, 0, 1, 9, 2),
      CHP: s('CHP', 3, 1, 1, 1, 7, 6),
      MAS: s('MAS', 3, 0, 0, 3, 1, 12),
    }),
    group('D', ['KSA', 'KOR', 'IDN', 'BAH'], {
      KSA: s('KSA', 3, 2, 1, 0, 7, 2),
      KOR: s('KOR', 3, 1, 1, 1, 3, 3),
      IDN: s('IDN', 3, 1, 0, 2, 3, 4),
      BAH: s('BAH', 3, 1, 0, 2, 3, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_2007.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  AUS_JPN: 'JPN',
  IRN_KOR: 'KOR',
  IRQ_VIE: 'IRQ',
  KSA_UZB: 'KSA',
  // Final
  IRQ_KOR: 'IRQ',
  IRQ_KSA: 'IRQ',
  JPN_KOR: 'KOR',
  JPN_KSA: 'KSA',
};

const THIRD_PLACE: [string, string] = ['KOR', 'JPN'];

const BRACKET_RAW: BracketRaw = [
  [
    ['IRQ', 'VIE'],
    ['JPN', 'AUS'],
  ],
  [
    ['IRN', 'KOR'],
    ['KSA', 'UZB'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
