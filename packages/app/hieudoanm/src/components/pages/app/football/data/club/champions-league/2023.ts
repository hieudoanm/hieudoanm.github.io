import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2023: ChampionsLeagueYearData = {
  year: 2023,
  host: 'Europe',
  champion: 'Real Madrid',
  runnerUp: 'Borussia Dortmund',
  available: true,
  teams: {
    bay: t('bay', 'Bayern Munich', 'de'),
    cop: t('cop', 'Copenhagen', 'dk'),
    gal: t('gal', 'Galatasaray', 'tr'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    len: t('len', 'Lens', 'fr'),
    sei: t('sei', 'Sevilla', 'es'),
    rma: t('rma', 'Real Madrid', 'es'),
    nap: t('nap', 'Napoli', 'it'),
    bra: t('bra', 'Braga', 'pt'),
    ube: t('ube', 'Union Berlin', 'de'),
    rso: t('rso', 'Real Sociedad', 'es'),
    int: t('int', 'Inter Milan', 'it'),
    ben: t('ben', 'Benfica', 'pt'),
    rbs: t('rbs', 'Red Bull Salzburg', 'at'),
    atl: t('atl', 'Atlético Madrid', 'es'),
    laz: t('laz', 'Lazio', 'it'),
    fey: t('fey', 'Feyenoord', 'nl'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    acm: t('acm', 'Milan', 'it'),
    new: t('new', 'Newcastle United', 'gb-eng'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    rbl: t('rbl', 'RB Leipzig', 'de'),
    ybo: t('ybo', 'Young Boys', 'ch'),
    rsb: t('rsb', 'Red Star Belgrade', 'rs'),
    bar: t('bar', 'Barcelona', 'es'),
    por: t('por', 'Porto', 'pt'),
    shk: t('shk', 'Shakhtar Donetsk', 'ua'),
    ant: t('ant', 'Antwerp', 'be'),
  },
  groups: [
    group('A', ['bay', 'cop', 'gal', 'mun'], {
      bay: s('bay', 6, 5, 1, 0, 12, 6),
      cop: s('cop', 6, 2, 2, 2, 8, 8),
      gal: s('gal', 6, 1, 2, 3, 10, 13),
      mun: s('mun', 6, 1, 1, 4, 12, 15),
    }),
    group('B', ['ars', 'psv', 'len', 'sei'], {
      ars: s('ars', 6, 4, 1, 1, 16, 4),
      psv: s('psv', 6, 2, 3, 1, 8, 10),
      len: s('len', 6, 2, 2, 2, 6, 11),
      sei: s('sei', 6, 0, 2, 4, 7, 12),
    }),
    group('C', ['rma', 'nap', 'bra', 'ube'], {
      rma: s('rma', 6, 6, 0, 0, 16, 7),
      nap: s('nap', 6, 3, 1, 2, 10, 9),
      bra: s('bra', 6, 1, 1, 4, 6, 12),
      ube: s('ube', 6, 0, 2, 4, 6, 10),
    }),
    group('D', ['rso', 'int', 'ben', 'rbs'], {
      rso: s('rso', 6, 3, 3, 0, 7, 2),
      int: s('int', 6, 3, 3, 0, 8, 5),
      ben: s('ben', 6, 1, 1, 4, 7, 11),
      rbs: s('rbs', 6, 1, 1, 4, 4, 8),
    }),
    group('E', ['atl', 'laz', 'fey', 'cel'], {
      atl: s('atl', 6, 4, 2, 0, 17, 6),
      laz: s('laz', 6, 3, 1, 2, 7, 7),
      fey: s('fey', 6, 2, 0, 4, 9, 10),
      cel: s('cel', 6, 1, 1, 4, 5, 15),
    }),
    group('F', ['bvb', 'psg', 'acm', 'new'], {
      bvb: s('bvb', 6, 3, 2, 1, 7, 4),
      psg: s('psg', 6, 2, 2, 2, 9, 8),
      acm: s('acm', 6, 2, 2, 2, 5, 8),
      new: s('new', 6, 1, 2, 3, 6, 7),
    }),
    group('G', ['mci', 'rbl', 'ybo', 'rsb'], {
      mci: s('mci', 6, 6, 0, 0, 18, 7),
      rbl: s('rbl', 6, 4, 0, 2, 13, 10),
      ybo: s('ybo', 6, 1, 1, 4, 7, 13),
      rsb: s('rsb', 6, 0, 1, 5, 7, 15),
    }),
    group('H', ['bar', 'por', 'shk', 'ant'], {
      bar: s('bar', 6, 4, 0, 2, 12, 6),
      por: s('por', 6, 4, 0, 2, 15, 8),
      shk: s('shk', 6, 3, 0, 3, 10, 12),
      ant: s('ant', 6, 1, 0, 5, 6, 17),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2023.teams);

const PREDETERMINED: Record<string, string> = {
  int_atl: 'atl',
  psv_bvb: 'bvb',
  psg_rso: 'psg',
  nap_bar: 'bar',
  por_ars: 'ars',
  laz_bay: 'bay',
  rbl_rma: 'rma',
  cop_mci: 'mci',
  atl_bvb: 'bvb',
  psg_bar: 'psg',
  ars_bay: 'bay',
  mci_rma: 'rma',
  bvb_psg: 'bvb',
  bay_rma: 'rma',
  bvb_rma: 'rma',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['int', 'atl'],
      ['psv', 'bvb'],
    ],
    [
      ['psg', 'rso'],
      ['nap', 'bar'],
    ],
  ],
  [
    [
      ['por', 'ars'],
      ['laz', 'bay'],
    ],
    [
      ['rbl', 'rma'],
      ['cop', 'mci'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
