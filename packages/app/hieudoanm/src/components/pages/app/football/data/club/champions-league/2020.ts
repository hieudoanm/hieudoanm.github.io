import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2020: ChampionsLeagueYearData = {
  year: 2020,
  host: 'Europe',
  champion: 'Chelsea',
  runnerUp: 'Manchester City',
  available: true,
  teams: {
    bay: t('bay', 'Bayern Munich', 'de'),
    atl: t('atl', 'Atlético Madrid', 'es'),
    rbs: t('rbs', 'Red Bull Salzburg', 'at'),
    lok: t('lok', 'Lokomotiv Moscow', 'ru'),
    rma: t('rma', 'Real Madrid', 'es'),
    mgl: t('mgl', 'Borussia Mönchengladbach', 'de'),
    shk: t('shk', 'Shakhtar Donetsk', 'ua'),
    int: t('int', 'Inter Milan', 'it'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    por: t('por', 'Porto', 'pt'),
    oly: t('oly', 'Olympiacos', 'gr'),
    mar: t('mar', 'Marseille', 'fr'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    ata: t('ata', 'Atalanta', 'it'),
    ajx: t('ajx', 'Ajax', 'nl'),
    mid: t('mid', 'Midtjylland', 'dk'),
    che: t('che', 'Chelsea', 'gb-eng'),
    sei: t('sei', 'Sevilla', 'es'),
    kras: t('kras', 'Krasnodar', 'ru'),
    ren: t('ren', 'Rennes', 'fr'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    laz: t('laz', 'Lazio', 'it'),
    clb: t('clb', 'Club Brugge', 'be'),
    zen: t('zen', 'Zenit Saint Petersburg', 'ru'),
    juv: t('juv', 'Juventus', 'it'),
    bar: t('bar', 'Barcelona', 'es'),
    dyn: t('dyn', 'Dynamo Kyiv', 'ua'),
    fer: t('fer', 'Ferencváros', 'hu'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    rbl: t('rbl', 'RB Leipzig', 'de'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    ist: t('ist', 'İstanbul Başakşehir', 'tr'),
  },
  groups: [
    group('A', ['bay', 'atl', 'rbs', 'lok'], {
      bay: s('bay', 6, 5, 1, 0, 18, 5),
      atl: s('atl', 6, 2, 3, 1, 7, 8),
      rbs: s('rbs', 6, 1, 1, 4, 10, 17),
      lok: s('lok', 6, 0, 3, 3, 5, 10),
    }),
    group('B', ['rma', 'mgl', 'shk', 'int'], {
      rma: s('rma', 6, 3, 1, 2, 11, 9),
      mgl: s('mgl', 6, 2, 2, 2, 16, 9),
      shk: s('shk', 6, 2, 2, 2, 5, 12),
      int: s('int', 6, 1, 3, 2, 7, 9),
    }),
    group('C', ['mci', 'por', 'oly', 'mar'], {
      mci: s('mci', 6, 5, 1, 0, 13, 1),
      por: s('por', 6, 4, 1, 1, 10, 3),
      oly: s('oly', 6, 1, 0, 5, 2, 10),
      mar: s('mar', 6, 1, 0, 5, 2, 13),
    }),
    group('D', ['liv', 'ata', 'ajx', 'mid'], {
      liv: s('liv', 6, 4, 1, 1, 10, 3),
      ata: s('ata', 6, 3, 2, 1, 10, 8),
      ajx: s('ajx', 6, 2, 1, 3, 7, 7),
      mid: s('mid', 6, 0, 2, 4, 4, 13),
    }),
    group('E', ['che', 'sei', 'kras', 'ren'], {
      che: s('che', 6, 4, 2, 0, 14, 2),
      sei: s('sei', 6, 4, 1, 1, 9, 8),
      kras: s('kras', 6, 1, 2, 3, 6, 11),
      ren: s('ren', 6, 0, 1, 5, 3, 11),
    }),
    group('F', ['bvb', 'laz', 'clb', 'zen'], {
      bvb: s('bvb', 6, 4, 1, 1, 12, 5),
      laz: s('laz', 6, 2, 4, 0, 11, 7),
      clb: s('clb', 6, 2, 2, 2, 8, 10),
      zen: s('zen', 6, 0, 1, 5, 4, 13),
    }),
    group('G', ['juv', 'bar', 'dyn', 'fer'], {
      juv: s('juv', 6, 5, 0, 1, 14, 4),
      bar: s('bar', 6, 5, 0, 1, 16, 5),
      dyn: s('dyn', 6, 1, 1, 4, 4, 13),
      fer: s('fer', 6, 0, 1, 5, 5, 17),
    }),
    group('H', ['psg', 'rbl', 'mun', 'ist'], {
      psg: s('psg', 6, 4, 0, 2, 13, 6),
      rbl: s('rbl', 6, 4, 0, 2, 11, 12),
      mun: s('mun', 6, 3, 0, 3, 15, 10),
      ist: s('ist', 6, 1, 0, 5, 7, 18),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2020.teams);

const PREDETERMINED: Record<string, string> = {
  mgl_mci: 'mci',
  laz_bay: 'bay',
  bar_psg: 'psg',
  rbl_liv: 'liv',
  por_juv: 'por',
  sei_bvb: 'bvb',
  ata_rma: 'rma',
  atl_che: 'che',
  mci_bvb: 'mci',
  bay_psg: 'psg',
  por_che: 'che',
  rma_liv: 'rma',
  mci_psg: 'mci',
  che_rma: 'che',
  che_mci: 'che',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['mgl', 'mci'],
      ['laz', 'bay'],
    ],
    [
      ['bar', 'psg'],
      ['rbl', 'liv'],
    ],
  ],
  [
    [
      ['por', 'juv'],
      ['sei', 'bvb'],
    ],
    [
      ['ata', 'rma'],
      ['atl', 'che'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
