import { t, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_1968: EuroYearData = {
  year: 1968,
  host: 'Italy',
  champion: 'Italy',
  runnerUp: 'Yugoslavia',
  available: false,
  teams: {
    eng: t('eng', 'England', 'gb-eng'),
    ita: t('ita', 'Italy', 'it'),
    rus: t('rus', 'Russia', 'ru'),
    yug: t('yug', 'Yugoslavia', 'rs'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_1968.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi-finals
  eng_yug: 'yug',
  ita_rus: 'ita',
  // Third place
  eng_rus: 'eng',
  // Final
  ita_yug: 'ita',
};

const BRACKET_RAW: BracketRaw = [
  ['eng', 'yug'],
  ['ita', 'rus'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
