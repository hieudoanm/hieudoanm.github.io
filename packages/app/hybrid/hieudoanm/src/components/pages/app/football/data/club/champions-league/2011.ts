import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2011: ChampionsLeagueYearData = {
  year: 2011,
  host: 'Europe',
  champion: 'Chelsea',
  runnerUp: 'Bayern Munich',
  available: true,
  teams: {
    bay: t('bay', 'Bayern Munich', 'de'),
    nap: t('nap', 'Napoli', 'it'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    vil: t('vil', 'Villarreal', 'es'),
    int: t('int', 'Inter Milan', 'it'),
    cska: t('cska', 'CSKA Moscow', 'ru'),
    trab: t('trab', 'Trabzonspor', 'tr'),
    lil: t('lil', 'Lille', 'fr'),
    ben: t('ben', 'Benfica', 'pt'),
    bas: t('bas', 'Basel', 'ch'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    otel: t('otel', 'Oțelul Galați', 'ro'),
    rma: t('rma', 'Real Madrid', 'es'),
    lyo: t('lyo', 'Lyon', 'fr'),
    ajx: t('ajx', 'Ajax', 'nl'),
    dnk: t('dnk', 'Dinamo Zagreb', 'hr'),
    che: t('che', 'Chelsea', 'gb-eng'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    val: t('val', 'Valencia', 'es'),
    gen: t('gen', 'Genk', 'be'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    mar: t('mar', 'Marseille', 'fr'),
    oly: t('oly', 'Olympiacos', 'gr'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    apo: t('apo', 'APOEL', 'cy'),
    zen: t('zen', 'Zenit Saint Petersburg', 'ru'),
    por: t('por', 'Porto', 'pt'),
    shakhtar: t('shakhtar', 'Shakhtar Donetsk', 'ua'),
    bar: t('bar', 'Barcelona', 'es'),
    acm: t('acm', 'AC Milan', 'it'),
    plz: t('plz', 'Viktoria Plzeň', 'cz'),
    bate: t('bate', 'BATE Borisov', 'by'),
  },
  groups: [
    group('A', ['bay', 'nap', 'mci', 'vil'], {
      bay: s('bay', 6, 4, 1, 1, 11, 6),
      nap: s('nap', 6, 3, 2, 1, 10, 6),
      mci: s('mci', 6, 3, 1, 2, 9, 6),
      vil: s('vil', 6, 0, 0, 6, 2, 14),
    }),
    group('B', ['int', 'cska', 'trab', 'lil'], {
      int: s('int', 6, 3, 2, 1, 8, 7),
      cska: s('cska', 6, 2, 2, 2, 9, 8),
      trab: s('trab', 6, 1, 4, 1, 5, 5),
      lil: s('lil', 6, 1, 3, 2, 6, 6),
    }),
    group('C', ['ben', 'bas', 'mun', 'otel'], {
      ben: s('ben', 6, 3, 3, 0, 8, 4),
      bas: s('bas', 6, 3, 2, 1, 11, 10),
      mun: s('mun', 6, 2, 3, 1, 11, 8),
      otel: s('otel', 6, 0, 0, 6, 3, 11),
    }),
    group('D', ['rma', 'lyo', 'ajx', 'dnk'], {
      rma: s('rma', 6, 6, 0, 0, 19, 2),
      lyo: s('lyo', 6, 2, 2, 2, 9, 7),
      ajx: s('ajx', 6, 2, 2, 2, 6, 6),
      dnk: s('dnk', 6, 0, 0, 6, 3, 22),
    }),
    group('E', ['che', 'lev', 'val', 'gen'], {
      che: s('che', 6, 3, 2, 1, 13, 4),
      lev: s('lev', 6, 3, 1, 2, 8, 8),
      val: s('val', 6, 2, 2, 2, 8, 7),
      gen: s('gen', 6, 0, 3, 3, 2, 16),
    }),
    group('F', ['ars', 'mar', 'oly', 'bvb'], {
      ars: s('ars', 6, 3, 2, 1, 7, 6),
      mar: s('mar', 6, 3, 1, 2, 7, 4),
      oly: s('oly', 6, 3, 0, 3, 8, 6),
      bvb: s('bvb', 6, 1, 1, 4, 6, 12),
    }),
    group('G', ['apo', 'zen', 'por', 'shakhtar'], {
      apo: s('apo', 6, 2, 3, 1, 6, 6),
      zen: s('zen', 6, 2, 3, 1, 7, 5),
      por: s('por', 6, 2, 2, 2, 7, 7),
      shakhtar: s('shakhtar', 6, 1, 2, 3, 6, 8),
    }),
    group('H', ['bar', 'acm', 'plz', 'bate'], {
      bar: s('bar', 6, 5, 1, 0, 19, 4),
      acm: s('acm', 6, 2, 3, 1, 11, 8),
      plz: s('plz', 6, 1, 2, 3, 4, 11),
      bate: s('bate', 6, 0, 2, 4, 2, 13),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2011.teams);

const PREDETERMINED: Record<string, string> = {
  apo_lyo: 'apo',
  bas_bay: 'bay',
  cska_rma: 'rma',
  acm_ars: 'acm',
  int_mar: 'mar',
  ben_zen: 'ben',
  che_nap: 'che',
  bar_lev: 'bar',
  apo_rma: 'rma',
  bay_mar: 'bay',
  ben_che: 'che',
  acm_bar: 'bar',
  bay_rma: 'bay',
  bar_che: 'che',
  bay_che: 'che',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['lyo', 'apo'],
      ['cska', 'rma'],
    ],
    [
      ['int', 'mar'],
      ['bas', 'bay'],
    ],
  ],
  [
    [
      ['ars', 'acm'],
      ['lev', 'bar'],
    ],
    [
      ['ben', 'zen'],
      ['nap', 'che'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
