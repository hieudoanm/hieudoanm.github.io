import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1984: AfconYearData = {
  year: 1984,
  host: 'Ivory Coast',
  champion: 'Cameroon',
  runnerUp: 'Nigeria',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GHA: t('GHA', 'Ghana', 'gh'),
    MWI: t('MWI', 'Malawi', 'mw'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    TOG: t('TOG', 'Togo', 'tg'),
  },
  groups: [
    group('A', ['EGY', 'CMR', 'CIV', 'TOG'], {
      EGY: s('EGY', 3, 2, 1, 0, 3, 1),
      CMR: s('CMR', 3, 2, 0, 1, 6, 2),
      CIV: s('CIV', 3, 1, 0, 2, 4, 4),
      TOG: s('TOG', 3, 0, 1, 2, 1, 7),
    }),
    group('B', ['ALG', 'NGA', 'GHA', 'MWI'], {
      ALG: s('ALG', 3, 2, 1, 0, 5, 0),
      NGA: s('NGA', 3, 1, 2, 0, 4, 3),
      GHA: s('GHA', 3, 1, 0, 2, 2, 4),
      MWI: s('MWI', 3, 0, 1, 2, 2, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1984.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  ALG_CMR: 'CMR',
  EGY_NGA: 'NGA',
  // Final
  ALG_EGY: 'ALG',
  CMR_NGA: 'CMR',
};

const THIRD_PLACE: [string, string] = ['ALG', 'EGY'];

const BRACKET_RAW: BracketRaw = [
  ['ALG', 'CMR'],
  ['EGY', 'NGA'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
