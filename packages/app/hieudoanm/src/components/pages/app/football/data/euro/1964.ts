import { t, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_1964: EuroYearData = {
  year: 1964,
  host: 'Spain',
  champion: 'Spain',
  runnerUp: 'Russia',
  available: false,
  teams: {
    den: t('den', 'Denmark', 'dk'),
    esp: t('esp', 'Spain', 'es'),
    hun: t('hun', 'Hungary', 'hu'),
    rus: t('rus', 'Russia', 'ru'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_1964.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi-finals
  den_rus: 'rus',
  esp_hun: 'esp',
  // Third place
  den_hun: 'hun',
  // Final
  esp_rus: 'esp',
};

const BRACKET_RAW: BracketRaw = [
  ['den', 'rus'],
  ['esp', 'hun'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
