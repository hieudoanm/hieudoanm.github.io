import { t, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_1972: EuroYearData = {
  year: 1972,
  host: 'Belgium',
  champion: 'Germany',
  runnerUp: 'Russia',
  available: false,
  teams: {
    bel: t('bel', 'Belgium', 'be'),
    ger: t('ger', 'Germany', 'de'),
    hun: t('hun', 'Hungary', 'hu'),
    rus: t('rus', 'Russia', 'ru'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_1972.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi-finals
  bel_ger: 'ger',
  hun_rus: 'rus',
  // Third place
  bel_hun: 'bel',
  // Final
  ger_rus: 'ger',
};

const BRACKET_RAW: BracketRaw = [
  ['bel', 'ger'],
  ['hun', 'rus'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
