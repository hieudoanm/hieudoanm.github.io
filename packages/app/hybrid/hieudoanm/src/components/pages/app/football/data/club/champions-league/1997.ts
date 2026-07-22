import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_1997: ChampionsLeagueYearData = {
  year: 1997,
  host: 'Europe',
  champion: 'Real Madrid',
  runnerUp: 'Juventus',
  available: true,
  teams: {
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    par: t('par', 'Parma', 'it'),
    gal: t('gal', 'Galatasaray', 'tr'),
    spr: t('spr', 'Sparta Prague', 'cz'),
    juv: t('juv', 'Juventus', 'it'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    kos: t('kos', 'Košice', 'sk'),
    fey: t('fey', 'Feyenoord', 'nl'),
    bar: t('bar', 'Barcelona', 'es'),
    new: t('new', 'Newcastle United', 'gb-eng'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    dyn: t('dyn', 'Dynamo Kyiv', 'ua'),
    bay: t('bay', 'Bayern Munich', 'de'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    and: t('and', 'Anderlecht', 'be'),
    bes: t('bes', 'Beşiktaş', 'tr'),
    rma: t('rma', 'Real Madrid', 'es'),
    por: t('por', 'Porto', 'pt'),
    oly: t('oly', 'Olympiacos', 'gr'),
    ros: t('ros', 'Rosenborg', 'no'),
    mon: t('mon', 'Monaco', 'fr'),
    spt: t('spt', 'Sporting CP', 'pt'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    gra: t('gra', 'Grasshoppers', 'ch'),
  },
  groups: [
    group('A', ['bvb', 'par', 'gal', 'spr'], {
      bvb: s('bvb', 6, 5, 0, 1, 14, 4),
      par: s('par', 6, 3, 1, 2, 8, 6),
      gal: s('gal', 6, 2, 1, 3, 5, 9),
      spr: s('spr', 6, 0, 2, 4, 4, 12),
    }),
    group('B', ['juv', 'mun', 'kos', 'fey'], {
      juv: s('juv', 6, 5, 1, 0, 11, 1),
      mun: s('mun', 6, 3, 1, 2, 7, 5),
      fey: s('fey', 6, 2, 1, 3, 5, 8),
      kos: s('kos', 6, 0, 1, 5, 2, 11),
    }),
    group('C', ['bar', 'new', 'psv', 'dyn'], {
      dyn: s('dyn', 6, 3, 2, 1, 10, 5),
      bar: s('bar', 6, 2, 2, 2, 8, 7),
      psv: s('psv', 6, 2, 2, 2, 7, 7),
      new: s('new', 6, 1, 2, 3, 5, 11),
    }),
    group('D', ['bay', 'psg', 'and', 'bes'], {
      bay: s('bay', 6, 4, 1, 1, 14, 4),
      psg: s('psg', 6, 3, 1, 2, 8, 7),
      and: s('and', 6, 2, 0, 4, 4, 12),
      bes: s('bes', 6, 1, 2, 3, 5, 8),
    }),
    group('E', ['rma', 'por', 'oly', 'ros'], {
      rma: s('rma', 6, 5, 0, 1, 12, 4),
      por: s('por', 6, 3, 1, 2, 7, 5),
      oly: s('oly', 6, 1, 2, 3, 5, 9),
      ros: s('ros', 6, 0, 1, 5, 4, 12),
    }),
    group('F', ['mon', 'spt', 'lev', 'gra'], {
      mon: s('mon', 6, 5, 0, 1, 14, 5),
      lev: s('lev', 6, 4, 0, 2, 11, 7),
      spt: s('spt', 6, 2, 1, 3, 7, 10),
      gra: s('gra', 6, 0, 1, 5, 3, 13),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_1997.teams);

const PREDETERMINED: Record<string, string> = {
  lev_rma: 'rma',
  bay_bvb: 'bvb',
  dyn_juv: 'juv',
  mon_psg: 'mon',
  bvb_rma: 'rma',
  juv_mon: 'juv',
  juv_rma: 'rma',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['rma', 'lev'],
    ['bvb', 'bay'],
  ],
  [
    ['juv', 'dyn'],
    ['mon', 'psg'],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
