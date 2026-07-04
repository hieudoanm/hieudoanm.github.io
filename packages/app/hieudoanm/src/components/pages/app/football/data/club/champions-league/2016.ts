import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2016: ChampionsLeagueYearData = {
  year: 2016,
  host: 'Europe',
  champion: 'Real Madrid',
  runnerUp: 'Juventus',
  available: true,
  teams: {
    ars: t('ars', 'Arsenal', 'gb-eng'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    lud: t('lud', 'Ludogorets', 'bg'),
    bas: t('bas', 'Basel', 'ch'),
    nap: t('nap', 'Napoli', 'it'),
    ben: t('ben', 'Benfica', 'pt'),
    bes: t('bes', 'Beşiktaş', 'tr'),
    dyn: t('dyn', 'Dynamo Kyiv', 'ua'),
    bar: t('bar', 'Barcelona', 'es'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    mgl: t('mgl', 'Borussia Mönchengladbach', 'de'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    atl: t('atl', 'Atlético Madrid', 'es'),
    bay: t('bay', 'Bayern Munich', 'de'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    ros: t('ros', 'Rostov', 'ru'),
    mon: t('mon', 'Monaco', 'fr'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    tot: t('tot', 'Tottenham Hotspur', 'gb-eng'),
    cska: t('cska', 'CSKA Moscow', 'ru'),
    rma: t('rma', 'Real Madrid', 'es'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    spo: t('spo', 'Sporting CP', 'pt'),
    leg: t('leg', 'Legia Warsaw', 'pl'),
    lei: t('lei', 'Leicester City', 'gb-eng'),
    por: t('por', 'Porto', 'pt'),
    cop: t('cop', 'Copenhagen', 'dk'),
    clb: t('clb', 'Club Brugge', 'be'),
    juv: t('juv', 'Juventus', 'it'),
    sei: t('sei', 'Sevilla', 'es'),
    lyo: t('lyo', 'Lyon', 'fr'),
    dza: t('dza', 'Dinamo Zagreb', 'hr'),
  },
  groups: [
    group('A', ['ars', 'psg', 'lud', 'bas'], {
      ars: s('ars', 6, 4, 2, 0, 18, 6),
      psg: s('psg', 6, 3, 3, 0, 13, 7),
      lud: s('lud', 6, 0, 3, 3, 6, 15),
      bas: s('bas', 6, 0, 2, 4, 3, 12),
    }),
    group('B', ['nap', 'ben', 'bes', 'dyn'], {
      nap: s('nap', 6, 3, 2, 1, 11, 8),
      ben: s('ben', 6, 2, 2, 2, 10, 10),
      bes: s('bes', 6, 1, 4, 1, 9, 14),
      dyn: s('dyn', 6, 1, 2, 3, 8, 6),
    }),
    group('C', ['bar', 'mci', 'mgl', 'cel'], {
      bar: s('bar', 6, 5, 0, 1, 20, 4),
      mci: s('mci', 6, 2, 3, 1, 12, 10),
      mgl: s('mgl', 6, 1, 2, 3, 5, 12),
      cel: s('cel', 6, 0, 3, 3, 5, 16),
    }),
    group('D', ['atl', 'bay', 'ros', 'psv'], {
      atl: s('atl', 6, 5, 0, 1, 7, 2),
      bay: s('bay', 6, 4, 0, 2, 14, 6),
      ros: s('ros', 6, 1, 2, 3, 6, 12),
      psv: s('psv', 6, 0, 2, 4, 4, 11),
    }),
    group('E', ['mon', 'lev', 'tot', 'cska'], {
      mon: s('mon', 6, 3, 2, 1, 9, 7),
      lev: s('lev', 6, 3, 1, 2, 8, 6),
      tot: s('tot', 6, 2, 1, 3, 6, 6),
      cska: s('cska', 6, 1, 2, 3, 7, 11),
    }),
    group('F', ['bvb', 'rma', 'leg', 'spo'], {
      bvb: s('bvb', 6, 4, 2, 0, 21, 9),
      rma: s('rma', 6, 3, 3, 0, 16, 10),
      leg: s('leg', 6, 1, 1, 4, 9, 24),
      spo: s('spo', 6, 1, 0, 5, 5, 8),
    }),
    group('G', ['lei', 'por', 'cop', 'clb'], {
      lei: s('lei', 6, 4, 1, 1, 7, 6),
      por: s('por', 6, 3, 2, 1, 9, 3),
      cop: s('cop', 6, 2, 3, 1, 7, 2),
      clb: s('clb', 6, 0, 0, 6, 2, 14),
    }),
    group('H', ['juv', 'sei', 'lyo', 'dza'], {
      juv: s('juv', 6, 4, 2, 0, 11, 2),
      sei: s('sei', 6, 3, 2, 1, 7, 3),
      lyo: s('lyo', 6, 2, 2, 2, 5, 3),
      dza: s('dza', 6, 0, 0, 6, 0, 15),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2016.teams);

const PREDETERMINED: Record<string, string> = {
  ars_bay: 'bay',
  nap_rma: 'rma',
  atl_lev: 'atl',
  lei_sei: 'lei',
  bar_psg: 'bar',
  juv_por: 'juv',
  ben_bvb: 'bvb',
  mci_mon: 'mon',
  bay_rma: 'rma',
  atl_lei: 'atl',
  bar_juv: 'juv',
  bvb_mon: 'mon',
  atl_rma: 'rma',
  juv_mon: 'juv',
  juv_rma: 'rma',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['bay', 'ars'],
      ['rma', 'nap'],
    ],
    [
      ['atl', 'lev'],
      ['lei', 'sei'],
    ],
  ],
  [
    [
      ['bar', 'psg'],
      ['juv', 'por'],
    ],
    [
      ['ben', 'bvb'],
      ['mci', 'mon'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
