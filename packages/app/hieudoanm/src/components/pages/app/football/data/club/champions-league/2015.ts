import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2015: ChampionsLeagueYearData = {
  year: 2015,
  host: 'Europe',
  champion: 'Real Madrid',
  runnerUp: 'Atletico Madrid',
  available: true,
  teams: {
    rma: t('rma', 'Real Madrid', 'es'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    shakhtar: t('shakhtar', 'Shakhtar Donetsk', 'ua'),
    mal: t('mal', 'Malmö FF', 'se'),
    wol: t('wol', 'Wolfsburg', 'de'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    cska: t('cska', 'CSKA Moscow', 'ru'),
    atl: t('atl', 'Atletico Madrid', 'es'),
    ben: t('ben', 'Benfica', 'pt'),
    gal: t('gal', 'Galatasaray', 'tr'),
    ast: t('ast', 'Astana', 'kz'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    juv: t('juv', 'Juventus', 'it'),
    sei: t('sei', 'Sevilla', 'es'),
    mgl: t('mgl', 'Borussia Mönchengladbach', 'de'),
    bar: t('bar', 'Barcelona', 'es'),
    rm: t('rm', 'Roma', 'it'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    bate: t('bate', 'BATE Borisov', 'by'),
    bay: t('bay', 'Bayern Munich', 'de'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    oly: t('oly', 'Olympiacos', 'gr'),
    dnk: t('dnk', 'Dinamo Zagreb', 'hr'),
    che: t('che', 'Chelsea', 'gb-eng'),
    dyn: t('dyn', 'Dynamo Kyiv', 'ua'),
    por: t('por', 'Porto', 'pt'),
    mta: t('mta', 'Maccabi Tel Aviv', 'il'),
    zen: t('zen', 'Zenit Saint Petersburg', 'ru'),
    gen: t('gen', 'Gent', 'be'),
    val: t('val', 'Valencia', 'es'),
    lyo: t('lyo', 'Lyon', 'fr'),
  },
  groups: [
    group('A', ['rma', 'psg', 'shakhtar', 'mal'], {
      rma: s('rma', 6, 5, 1, 0, 19, 3),
      psg: s('psg', 6, 4, 1, 1, 12, 1),
      shakhtar: s('shakhtar', 6, 1, 0, 5, 7, 14),
      mal: s('mal', 6, 1, 0, 5, 1, 21),
    }),
    group('B', ['wol', 'psv', 'mun', 'cska'], {
      wol: s('wol', 6, 4, 0, 2, 9, 6),
      psv: s('psv', 6, 3, 1, 2, 8, 7),
      mun: s('mun', 6, 2, 2, 2, 7, 7),
      cska: s('cska', 6, 1, 1, 4, 5, 9),
    }),
    group('C', ['atl', 'ben', 'gal', 'ast'], {
      atl: s('atl', 6, 4, 1, 1, 11, 3),
      ben: s('ben', 6, 3, 1, 2, 10, 8),
      gal: s('gal', 6, 1, 2, 3, 6, 10),
      ast: s('ast', 6, 0, 4, 2, 5, 11),
    }),
    group('D', ['mci', 'juv', 'sei', 'mgl'], {
      mci: s('mci', 6, 4, 0, 2, 12, 8),
      juv: s('juv', 6, 3, 2, 1, 6, 3),
      sei: s('sei', 6, 2, 0, 4, 8, 11),
      mgl: s('mgl', 6, 1, 2, 3, 8, 12),
    }),
    group('E', ['bar', 'rm', 'lev', 'bate'], {
      bar: s('bar', 6, 4, 2, 0, 15, 4),
      rm: s('rm', 6, 1, 3, 2, 11, 16),
      lev: s('lev', 6, 1, 3, 2, 13, 12),
      bate: s('bate', 6, 1, 2, 3, 5, 12),
    }),
    group('F', ['bay', 'ars', 'oly', 'dnk'], {
      bay: s('bay', 6, 5, 0, 1, 19, 3),
      ars: s('ars', 6, 3, 0, 3, 12, 10),
      oly: s('oly', 6, 3, 0, 3, 6, 13),
      dnk: s('dnk', 6, 1, 0, 5, 3, 14),
    }),
    group('G', ['che', 'dyn', 'por', 'mta'], {
      che: s('che', 6, 4, 1, 1, 13, 3),
      dyn: s('dyn', 6, 3, 2, 1, 8, 4),
      por: s('por', 6, 3, 1, 2, 9, 8),
      mta: s('mta', 6, 0, 0, 6, 1, 16),
    }),
    group('H', ['zen', 'gen', 'val', 'lyo'], {
      zen: s('zen', 6, 5, 0, 1, 13, 6),
      gen: s('gen', 6, 3, 1, 2, 8, 7),
      val: s('val', 6, 2, 0, 4, 5, 9),
      lyo: s('lyo', 6, 1, 1, 4, 5, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2015.teams);

const PREDETERMINED: Record<string, string> = {
  ars_bar: 'bar',
  psv_atl: 'atl',
  bay_juv: 'bay',
  ben_zen: 'ben',
  dyn_mci: 'mci',
  che_psg: 'psg',
  rm_rma: 'rma',
  gen_wol: 'wol',
  atl_bar: 'atl',
  bay_ben: 'bay',
  mci_psg: 'mci',
  rma_wol: 'rma',
  atl_bay: 'atl',
  mci_rma: 'rma',
  atl_rma: 'rma',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['ars', 'bar'],
      ['psv', 'atl'],
    ],
    [
      ['bay', 'juv'],
      ['ben', 'zen'],
    ],
  ],
  [
    [
      ['dyn', 'mci'],
      ['che', 'psg'],
    ],
    [
      ['rm', 'rma'],
      ['gen', 'wol'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
