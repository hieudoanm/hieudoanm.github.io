import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1988: AfconYearData = {
  year: 1988,
  host: 'Morocco',
  champion: 'Cameroon',
  runnerUp: 'Nigeria',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    EGY: t('EGY', 'Egypt', 'eg'),
    KEN: t('KEN', 'Kenya', 'ke'),
    MAR: t('MAR', 'Morocco', 'ma'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    ZAÏ: t('ZAÏ', 'Zaïre', 'za'),
  },
  groups: [
    group('A', ['MAR', 'ALG', 'CIV', 'ZAÏ'], {
      MAR: s('MAR', 3, 1, 2, 0, 2, 1),
      ALG: s('ALG', 3, 1, 1, 1, 2, 2),
      CIV: s('CIV', 3, 0, 3, 0, 2, 2),
      ZAÏ: s('ZAÏ', 3, 0, 2, 1, 2, 3),
    }),
    group('B', ['NGA', 'CMR', 'EGY', 'KEN'], {
      NGA: s('NGA', 3, 1, 2, 0, 4, 1),
      CMR: s('CMR', 3, 1, 2, 0, 2, 1),
      EGY: s('EGY', 3, 1, 1, 1, 3, 1),
      KEN: s('KEN', 3, 0, 1, 2, 0, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1988.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  ALG_NGA: 'NGA',
  CMR_MAR: 'CMR',
  // Final
  ALG_MAR: 'ALG',
  CMR_NGA: 'CMR',
};

const THIRD_PLACE: [string, string] = ['MAR', 'ALG'];

const BRACKET_RAW: BracketRaw = [
  ['ALG', 'NGA'],
  ['MAR', 'CMR'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
