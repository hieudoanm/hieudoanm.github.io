import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2005: ChampionsLeagueYearData = {
  year: 2005,
  host: 'Europe',
  champion: 'Barcelona',
  runnerUp: 'Arsenal',
  available: true,
  teams: {
    juv: t('juv', 'Juventus', 'it'),
    bay: t('bay', 'Bayern Munich', 'de'),
    brg: t('brg', 'Club Brugge', 'be'),
    rap: t('rap', 'Rapid Vienna', 'at'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    ajx: t('ajx', 'Ajax', 'nl'),
    thu: t('thu', 'Thun', 'ch'),
    spa: t('spa', 'Sparta Prague', 'cz'),
    bar: t('bar', 'Barcelona', 'es'),
    wer: t('wer', 'Werder Bremen', 'de'),
    udn: t('udn', 'Udinese', 'it'),
    pan: t('pan', 'Panathinaikos', 'gr'),
    vil: t('vil', 'Villarreal', 'es'),
    ben: t('ben', 'Benfica', 'pt'),
    lil: t('lil', 'Lille', 'fr'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    acm: t('acm', 'Milan', 'it'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    sch: t('sch', 'Schalke 04', 'de'),
    fen: t('fen', 'Fenerbahçe', 'tr'),
    lyo: t('lyo', 'Lyon', 'fr'),
    rma: t('rma', 'Real Madrid', 'es'),
    ros: t('ros', 'Rosenborg', 'no'),
    oly: t('oly', 'Olympiacos', 'gr'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    che: t('che', 'Chelsea', 'gb-eng'),
    bet: t('bet', 'Real Betis', 'es'),
    and: t('and', 'Anderlecht', 'be'),
    int: t('int', 'Inter Milan', 'it'),
    por: t('por', 'Porto', 'pt'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    art: t('art', 'Artmedia Bratislava', 'sk'),
  },
  groups: [
    group('A', ['juv', 'bay', 'brg', 'rap'], {
      juv: s('juv', 6, 5, 0, 1, 12, 5),
      bay: s('bay', 6, 4, 1, 1, 10, 4),
      brg: s('brg', 6, 2, 1, 3, 6, 7),
      rap: s('rap', 6, 0, 0, 6, 3, 15),
    }),
    group('B', ['ars', 'ajx', 'thu', 'spa'], {
      ars: s('ars', 6, 5, 1, 0, 10, 2),
      ajx: s('ajx', 6, 3, 2, 1, 10, 6),
      thu: s('thu', 6, 1, 1, 4, 4, 11),
      spa: s('spa', 6, 0, 2, 4, 2, 7),
    }),
    group('C', ['bar', 'wer', 'udn', 'pan'], {
      bar: s('bar', 6, 4, 1, 1, 16, 5),
      wer: s('wer', 6, 3, 1, 2, 12, 9),
      udn: s('udn', 6, 2, 1, 3, 8, 11),
      pan: s('pan', 6, 1, 1, 4, 4, 15),
    }),
    group('D', ['vil', 'ben', 'lil', 'mun'], {
      vil: s('vil', 6, 2, 4, 0, 6, 2),
      ben: s('ben', 6, 3, 1, 2, 8, 6),
      lil: s('lil', 6, 1, 3, 2, 4, 6),
      mun: s('mun', 6, 1, 2, 3, 5, 9),
    }),
    group('E', ['acm', 'psv', 'sch', 'fen'], {
      acm: s('acm', 6, 3, 2, 1, 12, 6),
      psv: s('psv', 6, 3, 1, 2, 8, 7),
      sch: s('sch', 6, 2, 2, 2, 8, 8),
      fen: s('fen', 6, 1, 1, 4, 7, 14),
    }),
    group('F', ['lyo', 'rma', 'ros', 'oly'], {
      lyo: s('lyo', 6, 4, 1, 1, 11, 5),
      rma: s('rma', 6, 3, 1, 2, 9, 7),
      ros: s('ros', 6, 1, 2, 3, 6, 10),
      oly: s('oly', 6, 1, 2, 3, 5, 9),
    }),
    group('G', ['liv', 'che', 'bet', 'and'], {
      che: s('che', 6, 3, 2, 1, 8, 3),
      liv: s('liv', 6, 3, 2, 1, 7, 3),
      bet: s('bet', 6, 2, 1, 3, 7, 9),
      and: s('and', 6, 1, 1, 4, 4, 11),
    }),
    group('H', ['int', 'ran', 'art', 'por'], {
      int: s('int', 6, 4, 1, 1, 9, 4),
      ran: s('ran', 6, 2, 2, 2, 8, 6),
      art: s('art', 6, 2, 2, 2, 8, 9),
      por: s('por', 6, 0, 3, 3, 6, 12),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2005.teams);

const PREDETERMINED: Record<string, string> = {
  bar_che: 'bar',
  ars_rma: 'ars',
  ben_liv: 'ben',
  lyo_psv: 'lyo',
  acm_bay: 'acm',
  ajx_int: 'int',
  juv_wer: 'juv',
  ran_vil: 'vil',
  ars_juv: 'ars',
  bar_ben: 'bar',
  acm_lyo: 'acm',
  int_vil: 'vil',
  ars_vil: 'ars',
  acm_vil: 'acm',
  acm_bar: 'bar',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['che', 'bar'],
      ['ars', 'rma'],
    ],
    [
      ['ben', 'liv'],
      ['psv', 'lyo'],
    ],
  ],
  [
    [
      ['acm', 'bay'],
      ['ajx', 'int'],
    ],
    [
      ['juv', 'wer'],
      ['vil', 'ran'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
