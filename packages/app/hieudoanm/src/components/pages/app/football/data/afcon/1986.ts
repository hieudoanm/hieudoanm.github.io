import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1986: AfconYearData = {
  year: 1986,
  host: 'Egypt',
  champion: 'Egypt',
  runnerUp: 'Cameroon',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    EGY: t('EGY', 'Egypt', 'eg'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MOZ: t('MOZ', 'Mozambique', 'mz'),
    SEN: t('SEN', 'Senegal', 'sn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['CIV', 'EGY', 'SEN', 'MOZ'], {
      CIV: s('CIV', 3, 2, 0, 1, 4, 2),
      EGY: s('EGY', 3, 2, 0, 1, 4, 1),
      SEN: s('SEN', 3, 2, 0, 1, 3, 1),
      MOZ: s('MOZ', 3, 0, 0, 3, 0, 7),
    }),
    group('B', ['CMR', 'MAR', 'ALG', 'ZAM'], {
      CMR: s('CMR', 3, 2, 1, 0, 7, 5),
      MAR: s('MAR', 3, 1, 2, 0, 2, 1),
      ALG: s('ALG', 3, 0, 2, 1, 2, 3),
      ZAM: s('ZAM', 3, 0, 1, 2, 2, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1986.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  CIV_CMR: 'CMR',
  EGY_MAR: 'EGY',
  // Final
  CIV_MAR: 'CIV',
  CMR_EGY: 'EGY',
};

const THIRD_PLACE: [string, string] = ['CIV', 'MAR'];

const BRACKET_RAW: BracketRaw = [
  ['CMR', 'CIV'],
  ['EGY', 'MAR'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
