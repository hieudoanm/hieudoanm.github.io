import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2003: ChampionsLeagueYearData = {
  year: 2003,
  host: 'Europe',
  champion: 'Porto',
  runnerUp: 'Monaco',
  available: true,
  teams: {
    lyo: t('lyo', 'Lyon', 'fr'),
    bay: t('bay', 'Bayern Munich', 'de'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    and: t('and', 'Anderlecht', 'be'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    loc: t('loc', 'Lokomotiv Moscow', 'ru'),
    int: t('int', 'Inter Milan', 'it'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    mon: t('mon', 'Monaco', 'fr'),
    dep: t('dep', 'Deportivo La Coruña', 'es'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    aek: t('aek', 'AEK Athens', 'gr'),
    juv: t('juv', 'Juventus', 'it'),
    rso: t('rso', 'Real Sociedad', 'es'),
    gal: t('gal', 'Galatasaray', 'tr'),
    oly: t('oly', 'Olympiacos', 'gr'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    stg: t('stg', 'Stuttgart', 'de'),
    pan: t('pan', 'Panathinaikos', 'gr'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    rma: t('rma', 'Real Madrid', 'es'),
    por: t('por', 'Porto', 'pt'),
    mrs: t('mrs', 'Marseille', 'fr'),
    par: t('par', 'Partizan', 'rs'),
    che: t('che', 'Chelsea', 'gb-eng'),
    acm: t('acm', 'Milan', 'it'),
    bes: t('bes', 'Beşiktaş', 'tr'),
    spr: t('spr', 'Sparta Prague', 'cz'),
    clb: t('clb', 'Club Brugge', 'be'),
    laz: t('laz', 'Lazio', 'it'),
    clv: t('clv', 'Celta Vigo', 'es'),
    aja: t('aja', 'Ajax', 'nl'),
  },
  groups: [
    group('A', ['lyo', 'bay', 'cel', 'and'], {
      lyo: s('lyo', 6, 3, 1, 2, 7, 7),
      bay: s('bay', 6, 2, 3, 1, 6, 5),
      cel: s('cel', 6, 2, 1, 3, 8, 7),
      and: s('and', 6, 2, 1, 3, 4, 6),
    }),
    group('B', ['ars', 'loc', 'int', 'dky'], {
      ars: s('ars', 6, 3, 1, 2, 9, 6),
      loc: s('loc', 6, 2, 2, 2, 7, 7),
      int: s('int', 6, 2, 2, 2, 8, 11),
      dky: s('dky', 6, 2, 1, 3, 8, 8),
    }),
    group('C', ['mon', 'dep', 'psv', 'aek'], {
      mon: s('mon', 6, 3, 2, 1, 15, 6),
      dep: s('dep', 6, 3, 1, 2, 12, 12),
      psv: s('psv', 6, 3, 1, 2, 8, 7),
      aek: s('aek', 6, 0, 2, 4, 1, 11),
    }),
    group('D', ['juv', 'rso', 'gal', 'oly'], {
      juv: s('juv', 6, 4, 1, 1, 15, 6),
      rso: s('rso', 6, 2, 3, 1, 8, 8),
      gal: s('gal', 6, 2, 1, 3, 6, 8),
      oly: s('oly', 6, 1, 1, 4, 6, 13),
    }),
    group('E', ['mun', 'stg', 'pan', 'ran'], {
      mun: s('mun', 6, 5, 0, 1, 13, 2),
      stg: s('stg', 6, 4, 0, 2, 9, 6),
      pan: s('pan', 6, 1, 1, 4, 5, 13),
      ran: s('ran', 6, 1, 1, 4, 4, 10),
    }),
    group('F', ['rma', 'por', 'mrs', 'par'], {
      rma: s('rma', 6, 4, 2, 0, 11, 5),
      por: s('por', 6, 3, 2, 1, 9, 8),
      mrs: s('mrs', 6, 1, 1, 4, 9, 11),
      par: s('par', 6, 0, 3, 3, 3, 8),
    }),
    group('G', ['che', 'spr', 'bes', 'laz'], {
      che: s('che', 6, 4, 1, 1, 9, 3),
      spr: s('spr', 6, 2, 2, 2, 5, 5),
      bes: s('bes', 6, 2, 1, 3, 5, 7),
      laz: s('laz', 6, 1, 2, 3, 6, 10),
    }),
    group('H', ['acm', 'clv', 'clb', 'aja'], {
      acm: s('acm', 6, 3, 1, 2, 4, 3),
      clv: s('clv', 6, 2, 3, 1, 7, 6),
      clb: s('clb', 6, 2, 2, 2, 5, 6),
      aja: s('aja', 6, 2, 0, 4, 6, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2003.teams);

const PREDETERMINED: Record<string, string> = {
  mun_por: 'por',
  rso_lyo: 'lyo',
  bay_rma: 'rma',
  loc_mon: 'mon',
  stg_che: 'che',
  clv_ars: 'ars',
  spr_acm: 'acm',
  juv_dep: 'dep',
  por_lyo: 'por',
  acm_dep: 'dep',
  rma_mon: 'mon',
  che_ars: 'che',
  por_dep: 'por',
  mon_che: 'mon',
  por_mon: 'por',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['mun', 'por'],
      ['rso', 'lyo'],
    ],
    [
      ['spr', 'acm'],
      ['juv', 'dep'],
    ],
  ],
  [
    [
      ['bay', 'rma'],
      ['loc', 'mon'],
    ],
    [
      ['stg', 'che'],
      ['clv', 'ars'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
