import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AseanYearData, AseanKnockoutYearData } from './types';

export const AFF_CHAMPIONSHIP_2005: AseanYearData = {
  year: 2005,
  host: 'Singapore',
  champion: 'Indonesia',
  runnerUp: 'Singapore',
  available: false,
  teams: {
    IDN: t('IDN', 'Indonesia', 'id'),
    MAS: t('MAS', 'Malaysia', 'my'),
    MMR: t('MMR', 'Myanmar', 'mm'),
    SGP: t('SGP', 'Singapore', 'sg'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFF_CHAMPIONSHIP_2005.teams);

const PREDETERMINED: Record<string, string> = {
  IDN_MAS: 'MAS',
  IDN_SGP: 'SGP',
  MAS_MMR: 'MAS',
  MMR_SGP: 'SGP',
};

const BRACKET_RAW: BracketRaw = [
  ['SGP', 'MMR'],
  ['MAS', 'IDN'],
];

export const KNOCKOUT: AseanKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
