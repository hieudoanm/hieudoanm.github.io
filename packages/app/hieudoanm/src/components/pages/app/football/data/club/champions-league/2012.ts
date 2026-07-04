import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2012: ChampionsLeagueYearData = {
  year: 2012,
  host: 'Europe',
  champion: 'Bayern Munich',
  runnerUp: 'Borussia Dortmund',
  available: true,
  teams: {
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    por: t('por', 'Porto', 'pt'),
    dyn: t('dyn', 'Dynamo Kyiv', 'ua'),
    dnk: t('dnk', 'Dinamo Zagreb', 'hr'),
    sch: t('sch', 'Schalke 04', 'de'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    oly: t('oly', 'Olympiacos', 'gr'),
    mon: t('mon', 'Montpellier', 'fr'),
    mal: t('mal', 'Málaga', 'es'),
    acm: t('acm', 'AC Milan', 'it'),
    zen: t('zen', 'Zenit Saint Petersburg', 'ru'),
    and: t('and', 'Anderlecht', 'be'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    rma: t('rma', 'Real Madrid', 'es'),
    ajx: t('ajx', 'Ajax', 'nl'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    juv: t('juv', 'Juventus', 'it'),
    shakhtar: t('shakhtar', 'Shakhtar Donetsk', 'ua'),
    che: t('che', 'Chelsea', 'gb-eng'),
    nor: t('nor', 'Nordsjaelland', 'dk'),
    bay: t('bay', 'Bayern Munich', 'de'),
    val: t('val', 'Valencia', 'es'),
    bate: t('bate', 'BATE Borisov', 'by'),
    lil: t('lil', 'Lille', 'fr'),
    bar: t('bar', 'Barcelona', 'es'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    ben: t('ben', 'Benfica', 'pt'),
    spa: t('spa', 'Spartak Moscow', 'ru'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    gal: t('gal', 'Galatasaray', 'tr'),
    cfr: t('cfr', 'CFR Cluj', 'ro'),
    bra: t('bra', 'Braga', 'pt'),
  },
  groups: [
    group('A', ['psg', 'por', 'dyn', 'dnk'], {
      psg: s('psg', 6, 5, 0, 1, 14, 3),
      por: s('por', 6, 4, 1, 1, 10, 4),
      dyn: s('dyn', 6, 1, 2, 3, 6, 10),
      dnk: s('dnk', 6, 0, 1, 5, 1, 14),
    }),
    group('B', ['sch', 'ars', 'oly', 'mon'], {
      sch: s('sch', 6, 3, 3, 0, 10, 6),
      ars: s('ars', 6, 3, 1, 2, 10, 8),
      oly: s('oly', 6, 3, 0, 3, 9, 9),
      mon: s('mon', 6, 0, 2, 4, 6, 12),
    }),
    group('C', ['mal', 'acm', 'zen', 'and'], {
      mal: s('mal', 6, 3, 3, 0, 12, 5),
      acm: s('acm', 6, 2, 2, 2, 7, 6),
      zen: s('zen', 6, 2, 1, 3, 6, 9),
      and: s('and', 6, 1, 2, 3, 4, 9),
    }),
    group('D', ['bvb', 'rma', 'ajx', 'mci'], {
      bvb: s('bvb', 6, 4, 2, 0, 11, 5),
      rma: s('rma', 6, 3, 2, 1, 15, 9),
      ajx: s('ajx', 6, 1, 1, 4, 8, 16),
      mci: s('mci', 6, 0, 3, 3, 7, 11),
    }),
    group('E', ['juv', 'shakhtar', 'che', 'nor'], {
      juv: s('juv', 6, 3, 3, 0, 12, 4),
      shakhtar: s('shakhtar', 6, 3, 1, 2, 12, 8),
      che: s('che', 6, 3, 1, 2, 16, 10),
      nor: s('nor', 6, 0, 1, 5, 4, 22),
    }),
    group('F', ['bay', 'val', 'bate', 'lil'], {
      bay: s('bay', 6, 4, 1, 1, 15, 7),
      val: s('val', 6, 4, 1, 1, 12, 5),
      bate: s('bate', 6, 2, 0, 4, 9, 15),
      lil: s('lil', 6, 1, 0, 5, 4, 13),
    }),
    group('G', ['bar', 'cel', 'ben', 'spa'], {
      bar: s('bar', 6, 4, 1, 1, 11, 5),
      cel: s('cel', 6, 3, 1, 2, 9, 8),
      ben: s('ben', 6, 2, 2, 2, 5, 5),
      spa: s('spa', 6, 1, 0, 5, 7, 14),
    }),
    group('H', ['mun', 'gal', 'cfr', 'bra'], {
      mun: s('mun', 6, 4, 0, 2, 9, 6),
      gal: s('gal', 6, 3, 1, 2, 7, 6),
      cfr: s('cfr', 6, 3, 1, 2, 9, 7),
      bra: s('bra', 6, 1, 0, 5, 7, 13),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2012.teams);

const PREDETERMINED: Record<string, string> = {
  gal_sch: 'sch',
  acm_bar: 'bar',
  ars_bay: 'bay',
  bvb_shakhtar: 'bvb',
  mal_por: 'mal',
  mun_rma: 'rma',
  cel_juv: 'juv',
  psg_val: 'psg',
  bar_psg: 'bar',
  bay_juv: 'bay',
  bvb_mal: 'bvb',
  rma_sch: 'rma',
  bar_bay: 'bay',
  bvb_rma: 'bvb',
  bay_bvb: 'bay',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['acm', 'bar'],
      ['psg', 'val'],
    ],
    [
      ['ars', 'bay'],
      ['cel', 'juv'],
    ],
  ],
  [
    [
      ['bvb', 'shakhtar'],
      ['mal', 'por'],
    ],
    [
      ['gal', 'sch'],
      ['mun', 'rma'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
