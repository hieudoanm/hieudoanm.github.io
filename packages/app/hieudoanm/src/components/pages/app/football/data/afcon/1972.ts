import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_1972: AfconYearData = {
  year: 1972,
  host: 'Cameroon',
  champion: 'Congo',
  runnerUp: 'Mali',
  available: false,
  teams: {
    CGO: t('CGO', 'Congo', 'cg'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    KEN: t('KEN', 'Kenya', 'ke'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    SDN: t('SDN', 'Sudan', 'sd'),
    TOG: t('TOG', 'Togo', 'tg'),
    ZAÏ: t('ZAÏ', 'Zaïre', 'za'),
  },
  groups: [
    group('A', ['CMR', 'MLI', 'KEN', 'TOG'], {
      CMR: s('CMR', 3, 2, 1, 0, 5, 2),
      MLI: s('MLI', 3, 0, 3, 0, 5, 5),
      KEN: s('KEN', 3, 0, 2, 1, 3, 4),
      TOG: s('TOG', 3, 0, 2, 1, 4, 6),
    }),
    group('B', ['ZAÏ', 'CGO', 'MAR', 'SDN'], {
      ZAÏ: s('ZAÏ', 3, 1, 2, 0, 4, 2),
      CGO: s('CGO', 3, 1, 1, 1, 5, 5),
      MAR: s('MAR', 3, 0, 3, 0, 3, 3),
      SDN: s('SDN', 3, 0, 2, 1, 4, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_1972.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  CGO_CMR: 'CGO',
  MLI_ZAÏ: 'MLI',
  // Final
  CGO_MLI: 'CGO',
  CMR_ZAÏ: 'CMR',
};

const THIRD_PLACE: [string, string] = ['CMR', 'ZAÏ'];

const BRACKET_RAW: BracketRaw = [
  ['CMR', 'CGO'],
  ['MLI', 'ZAÏ'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
