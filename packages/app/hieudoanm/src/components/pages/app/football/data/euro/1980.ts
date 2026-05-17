import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_1980: EuroYearData = {
  year: 1980,
  host: 'Italy',
  champion: 'Germany',
  runnerUp: 'Belgium',
  available: false,
  teams: {
    bel: t('bel', 'Belgium', 'be'),
    eng: t('eng', 'England', 'gb-eng'),
    esp: t('esp', 'Spain', 'es'),
    ger: t('ger', 'Germany', 'de'),
    gre: t('gre', 'Greece', 'gr'),
    ita: t('ita', 'Italy', 'it'),
    ned: t('ned', 'Netherlands', 'nl'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
  },
  groups: [
    group('1', ['tch', 'ned', 'ger', 'gre'], {
      ger: s('ger', 3, 2, 1, 0, 4, 2),
      tch: s('tch', 3, 1, 1, 1, 4, 3),
      ned: s('ned', 3, 1, 1, 1, 4, 4),
      gre: s('gre', 3, 0, 1, 2, 1, 4),
    }),
    group('2', ['bel', 'ita', 'esp', 'eng'], {
      bel: s('bel', 3, 1, 2, 0, 3, 2),
      ita: s('ita', 3, 1, 2, 0, 1, 0),
      eng: s('eng', 3, 1, 1, 1, 3, 3),
      esp: s('esp', 3, 0, 1, 2, 2, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_1980.teams);

const PREDETERMINED: Record<string, string> = {
  // Third place
  ita_tch: 'tch',
  // Final
  bel_ger: 'ger',
};

const BRACKET_RAW: BracketRaw = ['bel', 'ger'];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
