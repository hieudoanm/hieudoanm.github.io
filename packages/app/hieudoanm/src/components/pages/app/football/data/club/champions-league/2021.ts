import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2021: ChampionsLeagueYearData = {
  year: 2021,
  host: 'Europe',
  champion: 'Real Madrid',
  runnerUp: 'Liverpool',
  available: true,
  teams: {
    mci: t('mci', 'Manchester City', 'gb-eng'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    rbl: t('rbl', 'RB Leipzig', 'de'),
    clb: t('clb', 'Club Brugge', 'be'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    atl: t('atl', 'Atlético Madrid', 'es'),
    por: t('por', 'Porto', 'pt'),
    acm: t('acm', 'Milan', 'it'),
    ajx: t('ajx', 'Ajax', 'nl'),
    spo: t('spo', 'Sporting CP', 'pt'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    bes: t('bes', 'Beşiktaş', 'tr'),
    rma: t('rma', 'Real Madrid', 'es'),
    int: t('int', 'Inter Milan', 'it'),
    shk: t('shk', 'Shakhtar Donetsk', 'ua'),
    sheriff: t('sheriff', 'Sheriff Tiraspol', 'md'),
    bay: t('bay', 'Bayern Munich', 'de'),
    ben: t('ben', 'Benfica', 'pt'),
    bar: t('bar', 'Barcelona', 'es'),
    dyn: t('dyn', 'Dynamo Kyiv', 'ua'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    vil: t('vil', 'Villarreal', 'es'),
    ata: t('ata', 'Atalanta', 'it'),
    yb: t('yb', 'Young Boys', 'ch'),
    lil: t('lil', 'Lille', 'fr'),
    rbs: t('rbs', 'Red Bull Salzburg', 'at'),
    sei: t('sei', 'Sevilla', 'es'),
    wol: t('wol', 'Wolfsburg', 'de'),
    che: t('che', 'Chelsea', 'gb-eng'),
    juv: t('juv', 'Juventus', 'it'),
    zen: t('zen', 'Zenit Saint Petersburg', 'ru'),
    mal: t('mal', 'Malmö FF', 'se'),
  },
  groups: [
    group('A', ['mci', 'psg', 'rbl', 'clb'], {
      mci: s('mci', 6, 4, 0, 2, 18, 10),
      psg: s('psg', 6, 3, 2, 1, 13, 8),
      rbl: s('rbl', 6, 2, 1, 3, 15, 14),
      clb: s('clb', 6, 1, 1, 4, 6, 20),
    }),
    group('B', ['liv', 'atl', 'por', 'acm'], {
      liv: s('liv', 6, 6, 0, 0, 17, 6),
      atl: s('atl', 6, 2, 1, 3, 7, 8),
      por: s('por', 6, 1, 2, 3, 4, 11),
      acm: s('acm', 6, 1, 1, 4, 6, 9),
    }),
    group('C', ['ajx', 'spo', 'bvb', 'bes'], {
      ajx: s('ajx', 6, 6, 0, 0, 20, 5),
      spo: s('spo', 6, 3, 0, 3, 14, 12),
      bvb: s('bvb', 6, 3, 0, 3, 10, 11),
      bes: s('bes', 6, 0, 0, 6, 3, 19),
    }),
    group('D', ['rma', 'int', 'sheriff', 'shk'], {
      rma: s('rma', 6, 5, 0, 1, 14, 3),
      int: s('int', 6, 3, 1, 2, 8, 5),
      sheriff: s('sheriff', 6, 2, 1, 3, 7, 11),
      shk: s('shk', 6, 0, 2, 4, 2, 12),
    }),
    group('E', ['bay', 'ben', 'bar', 'dyn'], {
      bay: s('bay', 6, 6, 0, 0, 22, 3),
      ben: s('ben', 6, 2, 2, 2, 7, 9),
      bar: s('bar', 6, 2, 1, 3, 2, 9),
      dyn: s('dyn', 6, 0, 1, 5, 1, 11),
    }),
    group('F', ['mun', 'vil', 'ata', 'yb'], {
      mun: s('mun', 6, 3, 2, 1, 11, 8),
      vil: s('vil', 6, 3, 1, 2, 12, 9),
      ata: s('ata', 6, 1, 3, 2, 12, 13),
      yb: s('yb', 6, 1, 2, 3, 7, 12),
    }),
    group('G', ['lil', 'rbs', 'sei', 'wol'], {
      lil: s('lil', 6, 3, 2, 1, 7, 4),
      rbs: s('rbs', 6, 3, 1, 2, 8, 6),
      sei: s('sei', 6, 1, 3, 2, 5, 5),
      wol: s('wol', 6, 1, 2, 3, 5, 10),
    }),
    group('H', ['che', 'juv', 'zen', 'mal'], {
      che: s('che', 6, 4, 1, 1, 13, 4),
      juv: s('juv', 6, 4, 0, 2, 11, 7),
      zen: s('zen', 6, 1, 2, 3, 7, 10),
      mal: s('mal', 6, 0, 1, 5, 1, 11),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2021.teams);

const PREDETERMINED: Record<string, string> = {
  psg_rma: 'rma',
  mci_spo: 'mci',
  bay_rbs: 'bay',
  int_liv: 'liv',
  che_lil: 'che',
  juv_vil: 'vil',
  ajx_ben: 'ben',
  atl_mun: 'atl',
  che_rma: 'rma',
  atl_mci: 'mci',
  bay_vil: 'vil',
  ben_liv: 'liv',
  mci_rma: 'rma',
  liv_vil: 'liv',
  liv_rma: 'rma',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['psg', 'rma'],
      ['spo', 'mci'],
    ],
    [
      ['rbs', 'bay'],
      ['int', 'liv'],
    ],
  ],
  [
    [
      ['che', 'lil'],
      ['vil', 'juv'],
    ],
    [
      ['ben', 'ajx'],
      ['atl', 'mun'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
