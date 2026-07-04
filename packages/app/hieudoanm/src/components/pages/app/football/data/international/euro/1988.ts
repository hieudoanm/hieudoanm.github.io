import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_1988: EuroYearData = {
  year: 1988,
  host: 'West Germany',
  champion: 'Netherlands',
  runnerUp: 'Russia',
  available: false,
  teams: {
    den: t('den', 'Denmark', 'dk'),
    eng: t('eng', 'England', 'gb-eng'),
    esp: t('esp', 'Spain', 'es'),
    ger: t('ger', 'Germany', 'de'),
    irl: t('irl', 'Republic of Ireland', 'ie'),
    ita: t('ita', 'Italy', 'it'),
    ned: t('ned', 'Netherlands', 'nl'),
    rus: t('rus', 'Russia', 'ru'),
  },
  groups: [
    group('1', ['ger', 'den', 'ita', 'esp'], {
      ger: s('ger', 3, 2, 1, 0, 5, 1),
      ita: s('ita', 3, 2, 1, 0, 4, 1),
      esp: s('esp', 3, 1, 0, 2, 3, 5),
      den: s('den', 3, 0, 0, 3, 2, 7),
    }),
    group('2', ['eng', 'ned', 'irl', 'rus'], {
      rus: s('rus', 3, 2, 1, 0, 5, 2),
      ned: s('ned', 3, 2, 0, 1, 4, 2),
      irl: s('irl', 3, 1, 1, 1, 2, 2),
      eng: s('eng', 3, 0, 0, 3, 2, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_1988.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi-finals
  ger_ned: 'ned',
  ita_rus: 'rus',
  // Final
  ned_rus: 'ned',
};

const BRACKET_RAW: BracketRaw = [
  ['ger', 'ned'],
  ['rus', 'ita'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
