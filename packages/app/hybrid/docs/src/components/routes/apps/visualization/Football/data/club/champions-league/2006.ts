import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2006: ChampionsLeagueYearData = {
  year: 2006,
  host: 'Europe',
  champion: 'Milan',
  runnerUp: 'Liverpool',
  available: true,
  teams: {
    che: t('che', 'Chelsea', 'gb-eng'),
    bar: t('bar', 'Barcelona', 'es'),
    wer: t('wer', 'Werder Bremen', 'de'),
    lev: t('lev', 'Levski Sofia', 'bg'),
    bay: t('bay', 'Bayern Munich', 'de'),
    int: t('int', 'Inter Milan', 'it'),
    spo: t('spo', 'Sporting CP', 'pt'),
    spm: t('spm', 'Spartak Moscow', 'ru'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    bor: t('bor', 'Bordeaux', 'fr'),
    gal: t('gal', 'Galatasaray', 'tr'),
    val: t('val', 'Valencia', 'es'),
    rm: t('rm', 'Roma', 'it'),
    shakhtar: t('shakhtar', 'Shakhtar Donetsk', 'ua'),
    oly: t('oly', 'Olympiacos', 'gr'),
    lyo: t('lyo', 'Lyon', 'fr'),
    rma: t('rma', 'Real Madrid', 'es'),
    ste: t('ste', 'Steaua București', 'ro'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    ben: t('ben', 'Benfica', 'pt'),
    cop: t('cop', 'Copenhagen', 'dk'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    por: t('por', 'Porto', 'pt'),
    csk: t('csk', 'CSKA Moscow', 'ru'),
    ham: t('ham', 'Hamburg', 'de'),
    acm: t('acm', 'Milan', 'it'),
    lil: t('lil', 'Lille', 'fr'),
    and: t('and', 'Anderlecht', 'be'),
    aek: t('aek', 'AEK Athens', 'gr'),
  },
  groups: [
    group('A', ['che', 'bar', 'wer', 'lev'], {
      che: s('che', 6, 4, 1, 1, 10, 4),
      bar: s('bar', 6, 3, 2, 1, 12, 4),
      wer: s('wer', 6, 3, 1, 2, 7, 5),
      lev: s('lev', 6, 0, 0, 6, 1, 17),
    }),
    group('B', ['bay', 'int', 'spo', 'spm'], {
      bay: s('bay', 6, 3, 3, 0, 10, 3),
      int: s('int', 6, 3, 1, 2, 8, 6),
      spo: s('spo', 6, 2, 1, 3, 8, 10),
      spm: s('spm', 6, 1, 1, 4, 7, 14),
    }),
    group('C', ['liv', 'psv', 'bor', 'gal'], {
      liv: s('liv', 6, 4, 1, 1, 11, 5),
      psv: s('psv', 6, 3, 1, 2, 6, 6),
      bor: s('bor', 6, 2, 1, 3, 6, 7),
      gal: s('gal', 6, 1, 1, 4, 4, 9),
    }),
    group('D', ['val', 'rm', 'shakhtar', 'oly'], {
      val: s('val', 6, 4, 1, 1, 11, 6),
      rm: s('rm', 6, 3, 1, 2, 8, 4),
      shakhtar: s('shakhtar', 6, 1, 3, 2, 6, 11),
      oly: s('oly', 6, 0, 3, 3, 5, 9),
    }),
    group('E', ['lyo', 'rma', 'ste', 'dky'], {
      lyo: s('lyo', 6, 4, 2, 0, 12, 3),
      rma: s('rma', 6, 3, 2, 1, 10, 5),
      ste: s('ste', 6, 1, 2, 3, 7, 11),
      dky: s('dky', 6, 0, 2, 4, 4, 14),
    }),
    group('F', ['mun', 'cel', 'ben', 'cop'], {
      mun: s('mun', 6, 4, 0, 2, 10, 5),
      cel: s('cel', 6, 3, 0, 3, 8, 9),
      ben: s('ben', 6, 3, 0, 3, 8, 8),
      cop: s('cop', 6, 2, 0, 4, 6, 10),
    }),
    group('G', ['ars', 'por', 'csk', 'ham'], {
      ars: s('ars', 6, 3, 2, 1, 8, 3),
      por: s('por', 6, 3, 2, 1, 9, 4),
      csk: s('csk', 6, 2, 2, 2, 4, 5),
      ham: s('ham', 6, 1, 0, 5, 7, 16),
    }),
    group('H', ['acm', 'lil', 'and', 'aek'], {
      acm: s('acm', 6, 3, 1, 2, 8, 4),
      lil: s('lil', 6, 2, 3, 1, 8, 5),
      aek: s('aek', 6, 2, 2, 2, 6, 9),
      and: s('and', 6, 0, 2, 4, 4, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2006.teams);

const PREDETERMINED: Record<string, string> = {
  che_por: 'che',
  int_val: 'val',
  bar_liv: 'liv',
  ars_psv: 'psv',
  lil_mun: 'mun',
  lyo_rm: 'rm',
  acm_cel: 'acm',
  bay_rma: 'bay',
  che_val: 'che',
  liv_psv: 'liv',
  mun_rm: 'mun',
  acm_bay: 'acm',
  che_liv: 'liv',
  acm_mun: 'acm',
  acm_liv: 'acm',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['che', 'por'],
      ['int', 'val'],
    ],
    [
      ['bar', 'liv'],
      ['ars', 'psv'],
    ],
  ],
  [
    [
      ['lil', 'mun'],
      ['lyo', 'rm'],
    ],
    [
      ['acm', 'cel'],
      ['bay', 'rma'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
