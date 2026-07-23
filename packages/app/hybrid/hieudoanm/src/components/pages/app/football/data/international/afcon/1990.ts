import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1990: AfconYearData = {
  year: 1990,
  host: 'Algeria',
  champion: 'Algeria',
  runnerUp: 'Nigeria',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    EGY: t('EGY', 'Egypt', 'eg'),
    KEN: t('KEN', 'Kenya', 'ke'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    SEN: t('SEN', 'Senegal', 'sn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['ALG', 'NGA', 'CIV', 'EGY'], {
      ALG: s('ALG', 3, 3, 0, 0, 10, 1),
      NGA: s('NGA', 3, 2, 0, 1, 3, 5),
      CIV: s('CIV', 3, 1, 0, 2, 3, 5),
      EGY: s('EGY', 3, 0, 0, 3, 1, 6),
    }),
    group('B', ['ZAM', 'SEN', 'CMR', 'KEN'], {
      ZAM: s('ZAM', 3, 2, 1, 0, 2, 0),
      SEN: s('SEN', 3, 1, 2, 0, 2, 0),
      CMR: s('CMR', 3, 1, 0, 2, 2, 3),
      KEN: s('KEN', 3, 0, 1, 2, 0, 3),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1990.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  ALG_SEN: 'ALG',
  NGA_ZAM: 'NGA',
  // Final
  ALG_NGA: 'ALG',
  SEN_ZAM: 'ZAM',
};

const THIRD_PLACE: [string, string] = ['SEN', 'ZAM'];

const BRACKET_RAW: BracketRaw = [
  ['ALG', 'SEN'],
  ['NGA', 'ZAM'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
