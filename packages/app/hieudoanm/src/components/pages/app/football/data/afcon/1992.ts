import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1992: AfconYearData = {
  year: 1992,
  host: 'Senegal',
  champion: 'Ivory Coast',
  runnerUp: 'Ghana',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    CGO: t('CGO', 'Congo', 'cg'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GHA: t('GHA', 'Ghana', 'gh'),
    KEN: t('KEN', 'Kenya', 'ke'),
    MAR: t('MAR', 'Morocco', 'ma'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    SEN: t('SEN', 'Senegal', 'sn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
    ZAÏ: t('ZAÏ', 'Zaïre', 'za'),
  },
  groups: [
    group('A', ['NGA', 'SEN', 'KEN'], {
      NGA: s('NGA', 2, 2, 0, 0, 4, 2),
      SEN: s('SEN', 2, 1, 0, 1, 4, 2),
      KEN: s('KEN', 2, 0, 0, 2, 1, 5),
    }),
    group('B', ['CMR', 'ZAÏ', 'MAR'], {
      CMR: s('CMR', 2, 1, 1, 0, 2, 1),
      ZAÏ: s('ZAÏ', 2, 0, 2, 0, 2, 2),
      MAR: s('MAR', 2, 0, 1, 1, 1, 2),
    }),
    group('C', ['GHA', 'ZAM', 'EGY'], {
      GHA: s('GHA', 2, 2, 0, 0, 2, 0),
      ZAM: s('ZAM', 2, 1, 0, 1, 1, 1),
      EGY: s('EGY', 2, 0, 0, 2, 0, 2),
    }),
    group('D', ['CIV', 'CGO', 'ALG'], {
      CIV: s('CIV', 2, 1, 1, 0, 3, 0),
      CGO: s('CGO', 2, 0, 2, 0, 1, 1),
      ALG: s('ALG', 2, 0, 1, 1, 1, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1992.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  CGO_GHA: 'GHA',
  CIV_ZAM: 'CIV',
  CMR_SEN: 'CMR',
  NGA_ZAÏ: 'NGA',
  // Semi Final
  CIV_GHA: 'CIV',
  CMR_NGA: 'NGA',
  // Final
  CIV_CMR: 'CIV',
  GHA_NGA: 'GHA',
};

const THIRD_PLACE: [string, string] = ['CMR', 'NGA'];

const BRACKET_RAW: BracketRaw = [
  [
    ['NGA', 'ZAÏ'],
    ['SEN', 'CMR'],
  ],
  [
    ['GHA', 'CGO'],
    ['CIV', 'ZAM'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
