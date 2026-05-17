import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1978: AfconYearData = {
  year: 1978,
  host: 'Ghana',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    CGO: t('CGO', 'Congo', 'cg'),
    GHA: t('GHA', 'Ghana', 'gh'),
    HVO: t('HVO', 'Upper Volta', 'hv'),
    MAR: t('MAR', 'Morocco', 'ma'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    UGA: t('UGA', 'Uganda', 'ug'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['GHA', 'NGA', 'ZAM', 'HVO'], {
      GHA: s('GHA', 3, 2, 1, 0, 6, 2),
      NGA: s('NGA', 3, 1, 2, 0, 5, 3),
      ZAM: s('ZAM', 3, 1, 1, 1, 3, 2),
      HVO: s('HVO', 3, 0, 0, 3, 2, 9),
    }),
    group('B', ['UGA', 'TUN', 'MAR', 'CGO'], {
      UGA: s('UGA', 3, 2, 0, 1, 7, 4),
      TUN: s('TUN', 3, 1, 2, 0, 4, 2),
      MAR: s('MAR', 3, 1, 1, 1, 2, 4),
      CGO: s('CGO', 3, 0, 1, 2, 1, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1978.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  GHA_TUN: 'GHA',
  NGA_UGA: 'UGA',
  // Final
  GHA_UGA: 'GHA',
};

const THIRD_PLACE: [string, string] = ['GHA', 'UGA'];

const BRACKET_RAW: BracketRaw = [
  ['GHA', 'TUN'],
  ['NGA', 'UGA'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
