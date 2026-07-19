import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_1994: ChampionsLeagueYearData = {
  year: 1994,
  host: 'Europe',
  champion: 'Ajax',
  runnerUp: 'Milan',
  available: true,
  teams: {
    ajax: t('ajax', 'Ajax', 'nl'),
    acm: t('acm', 'Milan', 'it'),
    sal: t('sal', 'Casino Salzburg', 'at'),
    aek: t('aek', 'AEK Athens', 'gr'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    bay: t('bay', 'Bayern Munich', 'de'),
    spa: t('spa', 'Spartak Moscow', 'ru'),
    dyn: t('dyn', 'Dynamo Kyiv', 'ua'),
    ben: t('ben', 'Benfica', 'pt'),
    haj: t('haj', 'Hajduk Split', 'hr'),
    and: t('and', 'Anderlecht', 'be'),
    ste: t('ste', 'Steaua București', 'ro'),
    bar: t('bar', 'Barcelona', 'es'),
    got: t('got', 'IFK Göteborg', 'se'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    gal: t('gal', 'Galatasaray', 'tr'),
  },
  groups: [
    group('A', ['ajax', 'acm', 'sal', 'aek'], {
      ajax: s('ajax', 6, 4, 2, 0, 10, 0),
      acm: s('acm', 6, 3, 1, 2, 7, 3),
      sal: s('sal', 6, 1, 3, 2, 4, 7),
      aek: s('aek', 6, 0, 2, 4, 3, 14),
    }),
    group('B', ['psg', 'bay', 'spa', 'dyn'], {
      psg: s('psg', 6, 5, 0, 1, 11, 4),
      bay: s('bay', 6, 3, 1, 2, 9, 7),
      spa: s('spa', 6, 1, 2, 3, 8, 12),
      dyn: s('dyn', 6, 0, 1, 5, 5, 13),
    }),
    group('C', ['ben', 'haj', 'and', 'ste'], {
      ben: s('ben', 6, 5, 0, 1, 13, 5),
      haj: s('haj', 6, 3, 1, 2, 10, 8),
      and: s('and', 6, 2, 1, 3, 7, 10),
      ste: s('ste', 6, 1, 0, 5, 6, 13),
    }),
    group('D', ['bar', 'got', 'mun', 'gal'], {
      bar: s('bar', 6, 4, 2, 0, 11, 2),
      got: s('got', 6, 3, 1, 2, 9, 7),
      mun: s('mun', 6, 2, 2, 2, 11, 11),
      gal: s('gal', 6, 0, 1, 5, 3, 14),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_1994.teams);

const PREDETERMINED: Record<string, string> = {
  ajax_haj: 'ajax',
  bay_got: 'bay',
  bar_psg: 'psg',
  acm_ben: 'acm',
  ajax_bay: 'ajax',
  acm_psg: 'acm',
  acm_ajax: 'ajax',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['ajax', 'haj'],
    ['bay', 'got'],
  ],
  [
    ['psg', 'bar'],
    ['acm', 'ben'],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
