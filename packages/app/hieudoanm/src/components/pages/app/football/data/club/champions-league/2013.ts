import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2013: ChampionsLeagueYearData = {
  year: 2013,
  host: 'Europe',
  champion: 'Real Madrid',
  runnerUp: 'Atletico Madrid',
  available: true,
  teams: {
    mun: t('mun', 'Manchester United', 'gb-eng'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    shakhtar: t('shakhtar', 'Shakhtar Donetsk', 'ua'),
    rso: t('rso', 'Real Sociedad', 'es'),
    rma: t('rma', 'Real Madrid', 'es'),
    gal: t('gal', 'Galatasaray', 'tr'),
    juv: t('juv', 'Juventus', 'it'),
    cop: t('cop', 'Copenhagen', 'dk'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    oly: t('oly', 'Olympiacos', 'gr'),
    ben: t('ben', 'Benfica', 'pt'),
    and: t('and', 'Anderlecht', 'be'),
    bay: t('bay', 'Bayern Munich', 'de'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    cska: t('cska', 'CSKA Moscow', 'ru'),
    plz: t('plz', 'Viktoria Plzeň', 'cz'),
    che: t('che', 'Chelsea', 'gb-eng'),
    sch: t('sch', 'Schalke 04', 'de'),
    bas: t('bas', 'Basel', 'ch'),
    ste: t('ste', 'Steaua București', 'ro'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    nap: t('nap', 'Napoli', 'it'),
    mar: t('mar', 'Marseille', 'fr'),
    atl: t('atl', 'Atletico Madrid', 'es'),
    zen: t('zen', 'Zenit Saint Petersburg', 'ru'),
    por: t('por', 'Porto', 'pt'),
    aus: t('aus', 'Austria Wien', 'at'),
    bar: t('bar', 'Barcelona', 'es'),
    acm: t('acm', 'AC Milan', 'it'),
    ajx: t('ajx', 'Ajax', 'nl'),
    cel: t('cel', 'Celtic', 'gb-sct'),
  },
  groups: [
    group('A', ['mun', 'lev', 'shakhtar', 'rso'], {
      mun: s('mun', 6, 4, 2, 0, 12, 3),
      lev: s('lev', 6, 3, 1, 2, 9, 10),
      shakhtar: s('shakhtar', 6, 2, 2, 2, 7, 6),
      rso: s('rso', 6, 0, 1, 5, 1, 10),
    }),
    group('B', ['rma', 'gal', 'juv', 'cop'], {
      rma: s('rma', 6, 5, 1, 0, 20, 5),
      gal: s('gal', 6, 2, 1, 3, 8, 14),
      juv: s('juv', 6, 1, 3, 2, 9, 9),
      cop: s('cop', 6, 1, 1, 4, 4, 13),
    }),
    group('C', ['psg', 'oly', 'ben', 'and'], {
      psg: s('psg', 6, 4, 1, 1, 16, 5),
      oly: s('oly', 6, 3, 1, 2, 10, 8),
      ben: s('ben', 6, 3, 1, 2, 8, 8),
      and: s('and', 6, 0, 1, 5, 4, 17),
    }),
    group('D', ['bay', 'mci', 'cska', 'plz'], {
      bay: s('bay', 6, 5, 0, 1, 17, 5),
      mci: s('mci', 6, 5, 0, 1, 18, 10),
      cska: s('cska', 6, 1, 0, 5, 8, 17),
      plz: s('plz', 6, 1, 0, 5, 6, 17),
    }),
    group('E', ['che', 'sch', 'bas', 'ste'], {
      che: s('che', 6, 4, 0, 2, 12, 3),
      sch: s('sch', 6, 3, 1, 2, 6, 6),
      bas: s('bas', 6, 2, 2, 2, 5, 6),
      ste: s('ste', 6, 0, 3, 3, 2, 10),
    }),
    group('F', ['bvb', 'ars', 'nap', 'mar'], {
      bvb: s('bvb', 6, 4, 0, 2, 11, 6),
      ars: s('ars', 6, 4, 0, 2, 8, 5),
      nap: s('nap', 6, 4, 0, 2, 10, 9),
      mar: s('mar', 6, 0, 0, 6, 5, 14),
    }),
    group('G', ['atl', 'zen', 'por', 'aus'], {
      atl: s('atl', 6, 5, 1, 0, 15, 3),
      zen: s('zen', 6, 1, 3, 2, 5, 9),
      por: s('por', 6, 1, 2, 3, 4, 7),
      aus: s('aus', 6, 1, 2, 3, 5, 10),
    }),
    group('H', ['bar', 'acm', 'ajx', 'cel'], {
      bar: s('bar', 6, 4, 1, 1, 16, 5),
      acm: s('acm', 6, 2, 3, 1, 8, 5),
      ajx: s('ajx', 6, 2, 2, 2, 5, 8),
      cel: s('cel', 6, 1, 0, 5, 3, 14),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2013.teams);

const PREDETERMINED: Record<string, string> = {
  ars_bay: 'bay',
  acm_atl: 'atl',
  che_gal: 'che',
  bvb_zen: 'bvb',
  mci_bar: 'bar',
  lev_psg: 'psg',
  mun_oly: 'mun',
  rma_sch: 'rma',
  bar_atl: 'atl',
  bay_mun: 'bay',
  bvb_rma: 'rma',
  che_psg: 'che',
  atl_che: 'atl',
  bay_rma: 'rma',
  atl_rma: 'rma',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['ars', 'bay'],
      ['acm', 'atl'],
    ],
    [
      ['che', 'gal'],
      ['bvb', 'zen'],
    ],
  ],
  [
    [
      ['mci', 'bar'],
      ['lev', 'psg'],
    ],
    [
      ['mun', 'oly'],
      ['rma', 'sch'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
