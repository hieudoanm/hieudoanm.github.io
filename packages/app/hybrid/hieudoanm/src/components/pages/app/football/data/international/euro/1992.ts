import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_1992: EuroYearData = {
  year: 1992,
  host: 'Sweden',
  champion: 'Denmark',
  runnerUp: 'Germany',
  available: false,
  teams: {
    den: t('den', 'Denmark', 'dk'),
    eng: t('eng', 'England', 'gb-eng'),
    fra: t('fra', 'France', 'fr'),
    ger: t('ger', 'Germany', 'de'),
    ned: t('ned', 'Netherlands', 'nl'),
    rus: t('rus', 'Russia', 'ru'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    swe: t('swe', 'Sweden', 'se'),
  },
  groups: [
    group('1', ['swe', 'den', 'fra', 'eng'], {
      swe: s('swe', 3, 2, 1, 0, 4, 2),
      den: s('den', 3, 1, 1, 1, 2, 2),
      fra: s('fra', 3, 0, 2, 1, 2, 3),
      eng: s('eng', 3, 0, 2, 1, 1, 2),
    }),
    group('2', ['ned', 'rus', 'sco', 'ger'], {
      ned: s('ned', 3, 2, 1, 0, 4, 1),
      ger: s('ger', 3, 1, 1, 1, 4, 4),
      sco: s('sco', 3, 1, 0, 2, 3, 3),
      rus: s('rus', 3, 0, 2, 1, 1, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_1992.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi-finals
  ger_swe: 'ger',
  den_ned: 'den',
  // Final
  den_ger: 'den',
};

const BRACKET_RAW: BracketRaw = [
  ['swe', 'ger'],
  ['ned', 'den'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
