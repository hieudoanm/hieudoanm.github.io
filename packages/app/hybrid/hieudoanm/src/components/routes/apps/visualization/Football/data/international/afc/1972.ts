import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1972: AfcYearData = {
  year: 1972,
  host: 'Thailand',
  champion: 'Iran',
  runnerUp: 'South Korea',
  available: false,
  teams: {
    CAM: t('CAM', 'Cambodia', 'kh'),
    IRN: t('IRN', 'Iran', 'ir'),
    IRQ: t('IRQ', 'Iraq', 'iq'),
    KOR: t('KOR', 'South Korea', 'kr'),
    KUW: t('KUW', 'Kuwait', 'kw'),
    THA: t('THA', 'Thailand', 'th'),
  },
  groups: [
    group('A', ['IRN', 'IRQ', 'THA'], {
      IRN: s('IRN', 2, 2, 0, 0, 6, 2),
      IRQ: s('IRQ', 2, 0, 1, 1, 1, 4),
      THA: s('THA', 2, 0, 1, 1, 3, 4),
    }),
    group('B', ['CAM', 'KOR', 'KUW'], {
      CAM: s('CAM', 2, 1, 0, 1, 5, 4),
      KOR: s('KOR', 2, 1, 0, 1, 5, 3),
      KUW: s('KUW', 2, 1, 0, 1, 2, 5),
    }),
    group('ALLOCATION MATCH', ['IRN', 'KUW', 'KOR', 'IRQ', 'CAM', 'THA'], {
      IRN: s('IRN', 1, 1, 0, 0, 2, 0),
      KUW: s('KUW', 1, 1, 0, 0, 2, 0),
      KOR: s('KOR', 1, 0, 1, 0, 0, 0),
      IRQ: s('IRQ', 1, 0, 1, 0, 0, 0),
      CAM: s('CAM', 1, 0, 0, 1, 0, 2),
      THA: s('THA', 1, 0, 0, 1, 0, 2),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_1972.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  CAM_IRN: 'IRN',
  KOR_THA: 'KOR',
  // Final
  CAM_THA: 'THA',
  IRN_KOR: 'IRN',
};

const THIRD_PLACE: [string, string] = ['THA', 'CAM'];

const BRACKET_RAW: BracketRaw = [
  ['IRN', 'CAM'],
  ['THA', 'KOR'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
