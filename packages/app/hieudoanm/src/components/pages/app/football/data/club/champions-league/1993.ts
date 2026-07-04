import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_1993: ChampionsLeagueYearData = {
  year: 1993,
  host: 'Europe',
  champion: 'Milan',
  runnerUp: 'Barcelona',
  available: true,
  teams: {
    bar: t('bar', 'Barcelona', 'es'),
    mon: t('mon', 'Monaco', 'fr'),
    spa: t('spa', 'Spartak Moscow', 'ru'),
    gal: t('gal', 'Galatasaray', 'tr'),
    acm: t('acm', 'Milan', 'it'),
    por: t('por', 'Porto', 'pt'),
    wer: t('wer', 'Werder Bremen', 'de'),
    and: t('and', 'Anderlecht', 'be'),
  },
  groups: [
    group('A', ['bar', 'mon', 'spa', 'gal'], {
      bar: s('bar', 6, 4, 1, 1, 13, 5),
      mon: s('mon', 6, 3, 2, 1, 9, 5),
      spa: s('spa', 6, 1, 3, 2, 6, 12),
      gal: s('gal', 6, 0, 2, 4, 2, 10),
    }),
    group('B', ['acm', 'por', 'wer', 'and'], {
      acm: s('acm', 6, 3, 1, 2, 6, 5),
      por: s('por', 6, 3, 1, 2, 7, 5),
      wer: s('wer', 6, 2, 2, 2, 7, 7),
      and: s('and', 6, 1, 2, 3, 5, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_1993.teams);

const PREDETERMINED: Record<string, string> = {
  acm_bar: 'acm',
};

const BRACKET_RAW: BracketRaw = ['acm', 'bar'];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
