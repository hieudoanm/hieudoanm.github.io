import { t, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_1960: EuroYearData = {
  year: 1960,
  host: 'France',
  champion: 'Russia',
  runnerUp: 'Yugoslavia',
  available: false,
  teams: {
    fra: t('fra', 'France', 'fr'),
    rus: t('rus', 'Russia', 'ru'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
    yug: t('yug', 'Yugoslavia', 'rs'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_1960.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi-finals
  rus_tch: 'rus',
  fra_yug: 'yug',
  // Third place
  fra_tch: 'tch',
  // Final
  rus_yug: 'rus',
};

const BRACKET_RAW: BracketRaw = [
  ['tch', 'rus'],
  ['fra', 'yug'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
