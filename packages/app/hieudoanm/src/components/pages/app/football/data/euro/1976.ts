import { t, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_1976: EuroYearData = {
  year: 1976,
  host: 'Yugoslavia',
  champion: 'Czechoslovakia',
  runnerUp: 'Germany',
  available: false,
  teams: {
    ger: t('ger', 'Germany', 'de'),
    ned: t('ned', 'Netherlands', 'nl'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
    yug: t('yug', 'Yugoslavia', 'rs'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_1976.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi-finals
  ned_tch: 'tch',
  ger_yug: 'ger',
  // Third place
  ned_yug: 'ned',
  // Final
  ger_tch: 'tch',
};

const BRACKET_RAW: BracketRaw = [
  ['tch', 'ned'],
  ['yug', 'ger'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
