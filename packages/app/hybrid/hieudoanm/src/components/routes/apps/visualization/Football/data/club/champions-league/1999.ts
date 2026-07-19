import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_1999: ChampionsLeagueYearData = {
  year: 1999,
  host: 'Europe',
  champion: 'Real Madrid',
  runnerUp: 'Valencia',
  available: true,
  teams: {
    laz: t('laz', 'Lazio', 'it'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    mar: t('mar', 'Maribor', 'si'),
    bar: t('bar', 'Barcelona', 'es'),
    fio: t('fio', 'Fiorentina', 'it'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    aik: t('aik', 'AIK', 'se'),
    ros: t('ros', 'Rosenborg', 'no'),
    fey: t('fey', 'Feyenoord', 'nl'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    boa: t('boa', 'Boavista', 'pt'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    mrs: t('mrs', 'Marseille', 'fr'),
    stm: t('stm', 'Sturm Graz', 'at'),
    dza: t('dza', 'Dinamo Zagreb', 'hr'),
    rma: t('rma', 'Real Madrid', 'es'),
    por: t('por', 'Porto', 'pt'),
    oly: t('oly', 'Olympiacos', 'gr'),
    mol: t('mol', 'Molde', 'no'),
    val: t('val', 'Valencia', 'es'),
    bay: t('bay', 'Bayern Munich', 'de'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    spr: t('spr', 'Sparta Prague', 'cz'),
    bdx: t('bdx', 'Bordeaux', 'fr'),
    spm: t('spm', 'Spartak Moscow', 'ru'),
    wil: t('wil', 'Willem II', 'nl'),
    che: t('che', 'Chelsea', 'gb-eng'),
    her: t('her', 'Hertha Berlin', 'de'),
    gal: t('gal', 'Galatasaray', 'tr'),
    acm: t('acm', 'Milan', 'it'),
  },
  groups: [
    group('A', ['laz', 'dky', 'lev', 'mar'], {
      laz: s('laz', 6, 4, 2, 0, 13, 3),
      dky: s('dky', 6, 2, 1, 3, 8, 8),
      lev: s('lev', 6, 1, 4, 1, 7, 7),
      mar: s('mar', 6, 1, 1, 4, 2, 12),
    }),
    group('B', ['bar', 'fio', 'ars', 'aik'], {
      bar: s('bar', 6, 4, 2, 0, 19, 9),
      fio: s('fio', 6, 2, 3, 1, 9, 7),
      ars: s('ars', 6, 2, 2, 2, 9, 9),
      aik: s('aik', 6, 0, 1, 5, 4, 16),
    }),
    group('C', ['ros', 'fey', 'bvb', 'boa'], {
      ros: s('ros', 6, 3, 2, 1, 12, 5),
      fey: s('fey', 6, 1, 5, 0, 7, 6),
      bvb: s('bvb', 6, 1, 3, 2, 7, 9),
      boa: s('boa', 6, 1, 2, 3, 4, 10),
    }),
    group('D', ['mun', 'mrs', 'stm', 'dza'], {
      mun: s('mun', 6, 4, 1, 1, 9, 4),
      mrs: s('mrs', 6, 3, 1, 2, 10, 8),
      stm: s('stm', 6, 2, 0, 4, 5, 12),
      dza: s('dza', 6, 1, 2, 3, 7, 7),
    }),
    group('E', ['rma', 'por', 'oly', 'mol'], {
      rma: s('rma', 6, 4, 1, 1, 15, 7),
      por: s('por', 6, 4, 0, 2, 9, 6),
      oly: s('oly', 6, 2, 1, 3, 9, 12),
      mol: s('mol', 6, 1, 0, 5, 6, 14),
    }),
    group('F', ['val', 'bay', 'ran', 'psv'], {
      val: s('val', 6, 3, 3, 0, 8, 4),
      bay: s('bay', 6, 2, 3, 1, 7, 6),
      ran: s('ran', 6, 2, 1, 3, 7, 7),
      psv: s('psv', 6, 1, 1, 4, 5, 10),
    }),
    group('G', ['spr', 'bdx', 'spm', 'wil'], {
      spr: s('spr', 6, 3, 3, 0, 14, 6),
      bdx: s('bdx', 6, 3, 3, 0, 7, 4),
      spm: s('spm', 6, 1, 2, 3, 9, 12),
      wil: s('wil', 6, 0, 2, 4, 7, 15),
    }),
    group('H', ['che', 'her', 'gal', 'acm'], {
      che: s('che', 6, 3, 2, 1, 10, 3),
      her: s('her', 6, 2, 2, 2, 7, 10),
      gal: s('gal', 6, 2, 1, 3, 10, 13),
      acm: s('acm', 6, 1, 3, 2, 6, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_1999.teams);

const PREDETERMINED: Record<string, string> = {
  mun_rma: 'rma',
  laz_val: 'val',
  bar_che: 'bar',
  bay_por: 'bay',
  bay_rma: 'rma',
  bar_val: 'val',
  rma_val: 'rma',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['rma', 'mun'],
    ['val', 'laz'],
  ],
  [
    ['bar', 'che'],
    ['bay', 'por'],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
