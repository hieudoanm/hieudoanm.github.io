import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2001: ChampionsLeagueYearData = {
  year: 2001,
  host: 'Europe',
  champion: 'Real Madrid',
  runnerUp: 'Bayer Leverkusen',
  available: true,
  teams: {
    rma: t('rma', 'Real Madrid', 'es'),
    rom: t('rom', 'Roma', 'it'),
    loc: t('loc', 'Lokomotiv Moscow', 'ru'),
    and: t('and', 'Anderlecht', 'be'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    boa: t('boa', 'Boavista', 'pt'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    pan: t('pan', 'Panathinaikos', 'gr'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    mal: t('mal', 'Mallorca', 'es'),
    sch: t('sch', 'Schalke 04', 'de'),
    nan: t('nan', 'Nantes', 'fr'),
    gal: t('gal', 'Galatasaray', 'tr'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    laz: t('laz', 'Lazio', 'it'),
    juv: t('juv', 'Juventus', 'it'),
    por: t('por', 'Porto', 'pt'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    ros: t('ros', 'Rosenborg', 'no'),
    bar: t('bar', 'Barcelona', 'es'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    lyo: t('lyo', 'Lyon', 'fr'),
    fen: t('fen', 'Fenerbahçe', 'tr'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    dep: t('dep', 'Deportivo La Coruña', 'es'),
    lil: t('lil', 'Lille', 'fr'),
    oly: t('oly', 'Olympiacos', 'gr'),
    bay: t('bay', 'Bayern Munich', 'de'),
    spr: t('spr', 'Sparta Prague', 'cz'),
    fey: t('fey', 'Feyenoord', 'nl'),
    spm: t('spm', 'Spartak Moscow', 'ru'),
  },
  groups: [
    group('A', ['rma', 'rom', 'loc', 'and'], {
      rma: s('rma', 6, 4, 1, 1, 13, 5),
      rom: s('rom', 6, 2, 3, 1, 6, 5),
      loc: s('loc', 6, 2, 1, 3, 9, 9),
      and: s('and', 6, 0, 3, 3, 4, 13),
    }),
    group('B', ['liv', 'boa', 'bvb', 'dky'], {
      liv: s('liv', 6, 3, 3, 0, 7, 3),
      boa: s('boa', 6, 2, 2, 2, 8, 7),
      bvb: s('bvb', 6, 2, 2, 2, 6, 7),
      dky: s('dky', 6, 1, 1, 4, 5, 9),
    }),
    group('C', ['pan', 'ars', 'mal', 'sch'], {
      pan: s('pan', 6, 4, 0, 2, 8, 3),
      ars: s('ars', 6, 3, 0, 3, 9, 9),
      mal: s('mal', 6, 3, 0, 3, 4, 9),
      sch: s('sch', 6, 2, 0, 4, 9, 9),
    }),
    group('D', ['nan', 'gal', 'psv', 'laz'], {
      nan: s('nan', 6, 3, 2, 1, 8, 3),
      gal: s('gal', 6, 3, 1, 2, 5, 4),
      psv: s('psv', 6, 2, 1, 3, 6, 9),
      laz: s('laz', 6, 2, 0, 4, 4, 7),
    }),
    group('E', ['juv', 'por', 'cel', 'ros'], {
      juv: s('juv', 6, 3, 2, 1, 11, 8),
      por: s('por', 6, 3, 1, 2, 7, 5),
      cel: s('cel', 6, 3, 0, 3, 8, 11),
      ros: s('ros', 6, 1, 1, 4, 4, 6),
    }),
    group('F', ['bar', 'lev', 'lyo', 'fen'], {
      bar: s('bar', 6, 5, 0, 1, 12, 5),
      lev: s('lev', 6, 4, 0, 2, 10, 9),
      lyo: s('lyo', 6, 3, 0, 3, 10, 9),
      fen: s('fen', 6, 0, 0, 6, 3, 12),
    }),
    group('G', ['mun', 'dep', 'lil', 'oly'], {
      mun: s('mun', 6, 4, 0, 2, 14, 7),
      dep: s('dep', 6, 3, 2, 1, 11, 8),
      lil: s('lil', 6, 2, 2, 2, 7, 8),
      oly: s('oly', 6, 0, 2, 4, 6, 15),
    }),
    group('H', ['bay', 'spr', 'fey', 'spm'], {
      bay: s('bay', 6, 4, 2, 0, 14, 5),
      spr: s('spr', 6, 3, 2, 1, 10, 3),
      fey: s('fey', 6, 1, 2, 3, 7, 14),
      spm: s('spm', 6, 0, 2, 4, 7, 16),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2001.teams);

const PREDETERMINED: Record<string, string> = {
  bay_mun: 'bay',
  rma_gal: 'rma',
  val_ars: 'val',
  dep_lee: 'lev',
  bay_rma: 'bay',
  lev_ars: 'lev',
  bay_lev: 'bay',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['bay', 'mun'],
    ['rma', 'gal'],
  ],
  [
    ['val', 'ars'],
    ['dep', 'ars'],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
