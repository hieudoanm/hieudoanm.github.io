import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_1992: ChampionsLeagueYearData = {
  year: 1992,
  host: 'Europe',
  champion: 'Marseille',
  runnerUp: 'Milan',
  available: true,
  teams: {
    mar: t('mar', 'Marseille', 'fr'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    bru: t('bru', 'Club Brugge', 'be'),
    csk: t('csk', 'CSKA Moscow', 'ru'),
    acm: t('acm', 'Milan', 'it'),
    got: t('got', 'IFK Göteborg', 'se'),
    por: t('por', 'Porto', 'pt'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
  },
  groups: [
    group('A', ['mar', 'ran', 'bru', 'csk'], {
      mar: s('mar', 6, 3, 3, 0, 14, 4),
      ran: s('ran', 6, 2, 3, 1, 7, 5),
      bru: s('bru', 6, 2, 1, 3, 5, 8),
      csk: s('csk', 6, 1, 1, 4, 6, 15),
    }),
    group('B', ['acm', 'got', 'por', 'psv'], {
      acm: s('acm', 6, 6, 0, 0, 11, 1),
      got: s('got', 6, 3, 0, 3, 7, 8),
      por: s('por', 6, 2, 1, 3, 5, 5),
      psv: s('psv', 6, 0, 1, 5, 4, 13),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_1992.teams);

const PREDETERMINED: Record<string, string> = {
  acm_mar: 'mar',
};

const BRACKET_RAW: BracketRaw = ['mar', 'acm'];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
