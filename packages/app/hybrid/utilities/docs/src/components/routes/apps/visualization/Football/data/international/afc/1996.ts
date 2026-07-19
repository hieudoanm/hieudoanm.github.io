import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1996: AfcYearData = {
  year: 1996,
  host: 'United Arab Emirates',
  champion: 'Saudi Arabia',
  runnerUp: 'United Arab Emirates',
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
    SYR: t('SYR', 'Syria', 'sy'),
    THA: t('THA', 'Thailand', 'th'),
    UAE: t('UAE', 'United Arab Emirates', 'ae'),
    UZB: t('UZB', 'Uzbekistan', 'uz'),
  },
  groups: [
    group('A', ['UAE', 'KOR', 'KUW', 'IDN'], {
      UAE: s('UAE', 3, 2, 1, 0, 6, 3),
      KOR: s('KOR', 3, 1, 1, 1, 5, 5),
      KUW: s('KUW', 3, 1, 1, 1, 6, 5),
      IDN: s('IDN', 3, 0, 1, 2, 4, 8),
    }),
    group('B', ['IRN', 'IRQ', 'KSA', 'THA'], {
      IRN: s('IRN', 3, 2, 0, 1, 7, 3),
      IRQ: s('IRQ', 3, 2, 0, 1, 6, 3),
      KSA: s('KSA', 3, 2, 0, 1, 7, 3),
      THA: s('THA', 3, 0, 0, 3, 2, 13),
    }),
    group('C', ['JPN', 'SYR', 'CHP', 'UZB'], {
      JPN: s('JPN', 3, 3, 0, 0, 7, 1),
      SYR: s('SYR', 3, 1, 0, 2, 3, 6),
      CHP: s('CHP', 3, 1, 0, 2, 3, 3),
      UZB: s('UZB', 3, 1, 0, 2, 3, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_1996.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  CHP_KSA: 'KSA',
  IRN_KOR: 'IRN',
  IRQ_UAE: 'UAE',
  JPN_KUW: 'KUW',
  // Semi Final
  IRN_KSA: 'KSA',
  KUW_UAE: 'UAE',
  // Final
  IRN_KUW: 'IRN',
  KSA_UAE: 'KSA',
};

const THIRD_PLACE: [string, string] = ['IRN', 'KUW'];

const BRACKET_RAW: BracketRaw = [
  [
    ['KUW', 'JPN'],
    ['UAE', 'IRQ'],
  ],
  [
    ['KOR', 'IRN'],
    ['KSA', 'CHP'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
