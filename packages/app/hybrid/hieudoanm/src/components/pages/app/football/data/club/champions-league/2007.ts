import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2007: ChampionsLeagueYearData = {
  year: 2007,
  host: 'Europe',
  champion: 'Manchester United',
  runnerUp: 'Chelsea',
  available: true,
  teams: {
    por: t('por', 'Porto', 'pt'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    mar: t('mar', 'Marseille', 'fr'),
    bes: t('bes', 'Beşiktaş', 'tr'),
    che: t('che', 'Chelsea', 'gb-eng'),
    sch: t('sch', 'Schalke 04', 'de'),
    ros: t('ros', 'Rosenborg', 'no'),
    val: t('val', 'Valencia', 'es'),
    rma: t('rma', 'Real Madrid', 'es'),
    oly: t('oly', 'Olympiacos', 'gr'),
    wer: t('wer', 'Werder Bremen', 'de'),
    laz: t('laz', 'Lazio', 'it'),
    acm: t('acm', 'Milan', 'it'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    ben: t('ben', 'Benfica', 'pt'),
    shakhtar: t('shakhtar', 'Shakhtar Donetsk', 'ua'),
    bar: t('bar', 'Barcelona', 'es'),
    lyo: t('lyo', 'Lyon', 'fr'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    stg: t('stg', 'VfB Stuttgart', 'de'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    rm: t('rm', 'Roma', 'it'),
    spo: t('spo', 'Sporting CP', 'pt'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    int: t('int', 'Inter Milan', 'it'),
    fen: t('fen', 'Fenerbahçe', 'tr'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    csk: t('csk', 'CSKA Moscow', 'ru'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    sei: t('sei', 'Sevilla', 'es'),
    sla: t('sla', 'Slavia Prague', 'cz'),
    ste: t('ste', 'Steaua București', 'ro'),
  },
  groups: [
    group('A', ['por', 'liv', 'mar', 'bes'], {
      por: s('por', 6, 3, 2, 1, 8, 5),
      liv: s('liv', 6, 3, 1, 2, 18, 5),
      mar: s('mar', 6, 2, 1, 3, 6, 9),
      bes: s('bes', 6, 2, 0, 4, 4, 17),
    }),
    group('B', ['che', 'sch', 'ros', 'val'], {
      che: s('che', 6, 3, 3, 0, 10, 4),
      sch: s('sch', 6, 2, 2, 2, 5, 4),
      ros: s('ros', 6, 2, 1, 3, 6, 10),
      val: s('val', 6, 1, 2, 3, 2, 5),
    }),
    group('C', ['rma', 'oly', 'wer', 'laz'], {
      rma: s('rma', 6, 3, 2, 1, 13, 9),
      oly: s('oly', 6, 3, 2, 1, 11, 7),
      wer: s('wer', 6, 2, 0, 4, 8, 13),
      laz: s('laz', 6, 1, 2, 3, 8, 11),
    }),
    group('D', ['acm', 'cel', 'ben', 'shakhtar'], {
      acm: s('acm', 6, 4, 1, 1, 12, 5),
      cel: s('cel', 6, 3, 0, 3, 5, 6),
      ben: s('ben', 6, 2, 1, 3, 5, 6),
      shakhtar: s('shakhtar', 6, 2, 0, 4, 6, 11),
    }),
    group('E', ['bar', 'lyo', 'ran', 'stg'], {
      bar: s('bar', 6, 4, 2, 0, 11, 3),
      lyo: s('lyo', 6, 3, 1, 2, 11, 8),
      ran: s('ran', 6, 2, 1, 3, 7, 8),
      stg: s('stg', 6, 1, 0, 5, 7, 17),
    }),
    group('F', ['mun', 'rm', 'spo', 'dky'], {
      mun: s('mun', 6, 5, 1, 0, 13, 4),
      rm: s('rm', 6, 3, 2, 1, 11, 6),
      spo: s('spo', 6, 2, 1, 3, 9, 12),
      dky: s('dky', 6, 0, 0, 6, 4, 15),
    }),
    group('G', ['int', 'fen', 'psv', 'csk'], {
      int: s('int', 6, 5, 0, 1, 14, 3),
      fen: s('fen', 6, 3, 1, 2, 8, 9),
      psv: s('psv', 6, 2, 1, 3, 3, 6),
      csk: s('csk', 6, 0, 2, 4, 4, 11),
    }),
    group('H', ['ars', 'sei', 'sla', 'ste'], {
      ars: s('ars', 6, 4, 1, 1, 14, 4),
      sei: s('sei', 6, 3, 1, 2, 11, 7),
      sla: s('sla', 6, 1, 2, 3, 5, 16),
      ste: s('ste', 6, 1, 2, 3, 5, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2007.teams);

const PREDETERMINED: Record<string, string> = {
  che_oly: 'che',
  fen_sei: 'fen',
  int_liv: 'liv',
  acm_ars: 'ars',
  lyo_mun: 'mun',
  rm_rma: 'rm',
  bar_cel: 'bar',
  por_sch: 'sch',
  che_fen: 'che',
  ars_liv: 'liv',
  mun_rm: 'mun',
  bar_sch: 'bar',
  che_liv: 'che',
  bar_mun: 'mun',
  che_mun: 'mun',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['che', 'oly'],
      ['fen', 'sei'],
    ],
    [
      ['int', 'liv'],
      ['acm', 'ars'],
    ],
  ],
  [
    [
      ['lyo', 'mun'],
      ['rma', 'rm'],
    ],
    [
      ['bar', 'cel'],
      ['por', 'sch'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
