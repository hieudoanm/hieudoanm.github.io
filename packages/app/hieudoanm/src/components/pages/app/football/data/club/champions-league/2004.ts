import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2004: ChampionsLeagueYearData = {
  year: 2004,
  host: 'Europe',
  champion: 'Liverpool',
  runnerUp: 'Milan',
  available: true,
  teams: {
    mon: t('mon', 'Monaco', 'fr'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    oly: t('oly', 'Olympiacos', 'gr'),
    dep: t('dep', 'Deportivo La Coruña', 'es'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    rma: t('rma', 'Real Madrid', 'es'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    rm: t('rm', 'Roma', 'it'),
    juv: t('juv', 'Juventus', 'it'),
    bay: t('bay', 'Bayern Munich', 'de'),
    ajx: t('ajx', 'Ajax', 'nl'),
    mta: t('mta', 'Maccabi Tel Aviv', 'il'),
    lyo: t('lyo', 'Lyon', 'fr'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    fen: t('fen', 'Fenerbahçe', 'tr'),
    spa: t('spa', 'Sparta Prague', 'cz'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    pan: t('pan', 'Panathinaikos', 'gr'),
    ros: t('ros', 'Rosenborg', 'no'),
    bar: t('bar', 'Barcelona', 'es'),
    acm: t('acm', 'Milan', 'it'),
    shakhtar: t('shakhtar', 'Shakhtar Donetsk', 'ua'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    int: t('int', 'Inter Milan', 'it'),
    wer: t('wer', 'Werder Bremen', 'de'),
    val: t('val', 'Valencia', 'es'),
    and: t('and', 'Anderlecht', 'be'),
    che: t('che', 'Chelsea', 'gb-eng'),
    por: t('por', 'Porto', 'pt'),
    csk: t('csk', 'CSKA Moscow', 'ru'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
  },
  groups: [
    group('A', ['mon', 'liv', 'oly', 'dep'], {
      mon: s('mon', 6, 4, 0, 2, 10, 4),
      liv: s('liv', 6, 3, 1, 2, 6, 3),
      oly: s('oly', 6, 3, 1, 2, 7, 6),
      dep: s('dep', 6, 0, 2, 4, 4, 14),
    }),
    group('B', ['lev', 'rma', 'dky', 'rm'], {
      lev: s('lev', 6, 3, 2, 1, 13, 7),
      rma: s('rma', 6, 3, 2, 1, 11, 8),
      dky: s('dky', 6, 2, 1, 3, 8, 11),
      rm: s('rm', 6, 1, 1, 4, 6, 12),
    }),
    group('C', ['juv', 'bay', 'ajx', 'mta'], {
      juv: s('juv', 6, 5, 1, 0, 6, 1),
      bay: s('bay', 6, 3, 1, 2, 12, 5),
      ajx: s('ajx', 6, 1, 1, 4, 6, 10),
      mta: s('mta', 6, 1, 1, 4, 4, 12),
    }),
    group('D', ['lyo', 'mun', 'fen', 'spa'], {
      lyo: s('lyo', 6, 4, 1, 1, 17, 8),
      mun: s('mun', 6, 3, 2, 1, 11, 7),
      fen: s('fen', 6, 3, 0, 3, 10, 10),
      spa: s('spa', 6, 0, 1, 5, 2, 15),
    }),
    group('E', ['ars', 'psv', 'pan', 'ros'], {
      ars: s('ars', 6, 3, 1, 2, 11, 7),
      psv: s('psv', 6, 3, 1, 2, 6, 7),
      pan: s('pan', 6, 2, 1, 3, 5, 7),
      ros: s('ros', 6, 2, 1, 3, 8, 9),
    }),
    group('F', ['bar', 'acm', 'shakhtar', 'cel'], {
      bar: s('bar', 6, 3, 2, 1, 8, 5),
      acm: s('acm', 6, 3, 1, 2, 9, 5),
      shakhtar: s('shakhtar', 6, 2, 0, 4, 8, 13),
      cel: s('cel', 6, 1, 3, 2, 5, 7),
    }),
    group('G', ['int', 'wer', 'val', 'and'], {
      int: s('int', 6, 4, 1, 1, 14, 3),
      wer: s('wer', 6, 4, 1, 1, 12, 6),
      val: s('val', 6, 2, 1, 3, 6, 10),
      and: s('and', 6, 0, 1, 5, 4, 17),
    }),
    group('H', ['che', 'por', 'csk', 'psg'], {
      che: s('che', 6, 4, 1, 1, 10, 3),
      por: s('por', 6, 2, 2, 2, 7, 8),
      csk: s('csk', 6, 2, 1, 3, 5, 7),
      psg: s('psg', 6, 1, 2, 3, 3, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2004.teams);

const PREDETERMINED: Record<string, string> = {
  liv_lev: 'liv',
  juv_rma: 'juv',
  ars_bay: 'bay',
  acm_mun: 'acm',
  mon_psv: 'psv',
  bar_che: 'che',
  lyo_wer: 'lyo',
  int_por: 'int',
  juv_liv: 'liv',
  acm_int: 'acm',
  che_bay: 'che',
  lyo_psv: 'psv',
  che_liv: 'liv',
  acm_psv: 'acm',
  acm_liv: 'liv',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['liv', 'lev'],
      ['juv', 'rma'],
    ],
    [
      ['ars', 'bay'],
      ['acm', 'mun'],
    ],
  ],
  [
    [
      ['mon', 'psv'],
      ['bar', 'che'],
    ],
    [
      ['lyo', 'wer'],
      ['int', 'por'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
