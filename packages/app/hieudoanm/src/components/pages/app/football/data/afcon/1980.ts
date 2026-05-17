import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1980: AfconYearData = {
  year: 1980,
  host: 'Nigeria',
  champion: 'Nigeria',
  runnerUp: 'Algeria',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GHA: t('GHA', 'Ghana', 'gh'),
    GUI: t('GUI', 'Guinea', 'gn'),
    MAR: t('MAR', 'Morocco', 'ma'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    TAN: t('TAN', 'Tanzania', 'tz'),
  },
  groups: [
    group('A', ['NGA', 'EGY', 'CIV', 'TAN'], {
      NGA: s('NGA', 3, 2, 1, 0, 4, 1),
      EGY: s('EGY', 3, 2, 0, 1, 4, 3),
      CIV: s('CIV', 3, 0, 2, 1, 2, 3),
      TAN: s('TAN', 3, 0, 1, 2, 3, 6),
    }),
    group('B', ['ALG', 'MAR', 'GHA', 'GUI'], {
      ALG: s('ALG', 3, 2, 1, 0, 4, 2),
      MAR: s('MAR', 3, 1, 1, 1, 2, 2),
      GHA: s('GHA', 3, 1, 1, 1, 1, 1),
      GUI: s('GUI', 3, 0, 1, 2, 3, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1980.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  ALG_EGY: 'ALG',
  MAR_NGA: 'NGA',
  // Final
  ALG_NGA: 'NGA',
  EGY_MAR: 'MAR',
};

const THIRD_PLACE: [string, string] = ['EGY', 'MAR'];

const BRACKET_RAW: BracketRaw = [
  ['ALG', 'EGY'],
  ['NGA', 'MAR'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
