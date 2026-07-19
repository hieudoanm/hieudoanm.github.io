import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2008: ChampionsLeagueYearData = {
  year: 2008,
  host: 'Europe',
  champion: 'Barcelona',
  runnerUp: 'Manchester United',
  available: true,
  teams: {
    che: t('che', 'Chelsea', 'gb-eng'),
    rm: t('rm', 'Roma', 'it'),
    bor: t('bor', 'Bordeaux', 'fr'),
    cfr: t('cfr', 'CFR Cluj', 'ro'),
    int: t('int', 'Inter Milan', 'it'),
    wer: t('wer', 'Werder Bremen', 'de'),
    pan: t('pan', 'Panathinaikos', 'gr'),
    ano: t('ano', 'Anorthosis Famagusta', 'cy'),
    bar: t('bar', 'Barcelona', 'es'),
    spo: t('spo', 'Sporting CP', 'pt'),
    bas: t('bas', 'Basel', 'ch'),
    shakhtar: t('shakhtar', 'Shakhtar Donetsk', 'ua'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    atl: t('atl', 'Atletico Madrid', 'es'),
    mar: t('mar', 'Marseille', 'fr'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    vil: t('vil', 'Villarreal', 'es'),
    aal: t('aal', 'Aalborg', 'dk'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    lyo: t('lyo', 'Lyon', 'fr'),
    bay: t('bay', 'Bayern Munich', 'de'),
    fio: t('fio', 'Fiorentina', 'it'),
    ste: t('ste', 'Steaua București', 'ro'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    por: t('por', 'Porto', 'pt'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    fen: t('fen', 'Fenerbahçe', 'tr'),
    juv: t('juv', 'Juventus', 'it'),
    rma: t('rma', 'Real Madrid', 'es'),
    zen: t('zen', 'Zenit Saint Petersburg', 'ru'),
    bat: t('bat', 'BATE Borisov', 'by'),
  },
  groups: [
    group('A', ['che', 'rm', 'bor', 'cfr'], {
      che: s('che', 6, 3, 2, 1, 9, 5),
      rm: s('rm', 6, 3, 1, 2, 10, 6),
      bor: s('bor', 6, 2, 3, 1, 5, 5),
      cfr: s('cfr', 6, 1, 1, 4, 5, 13),
    }),
    group('B', ['int', 'wer', 'pan', 'ano'], {
      int: s('int', 6, 3, 3, 0, 8, 3),
      wer: s('wer', 6, 2, 3, 1, 7, 6),
      pan: s('pan', 6, 1, 3, 2, 6, 7),
      ano: s('ano', 6, 0, 2, 4, 4, 9),
    }),
    group('C', ['bar', 'spo', 'bas', 'shakhtar'], {
      bar: s('bar', 6, 4, 1, 1, 18, 8),
      spo: s('spo', 6, 4, 0, 2, 8, 8),
      bas: s('bas', 6, 2, 0, 4, 5, 10),
      shakhtar: s('shakhtar', 6, 1, 1, 4, 5, 10),
    }),
    group('D', ['liv', 'atl', 'mar', 'psv'], {
      liv: s('liv', 6, 4, 2, 0, 12, 3),
      atl: s('atl', 6, 3, 3, 0, 9, 4),
      mar: s('mar', 6, 1, 1, 4, 5, 10),
      psv: s('psv', 6, 1, 0, 5, 5, 14),
    }),
    group('E', ['mun', 'vil', 'aal', 'cel'], {
      mun: s('mun', 6, 4, 2, 0, 10, 4),
      vil: s('vil', 6, 2, 3, 1, 9, 7),
      aal: s('aal', 6, 1, 3, 2, 7, 10),
      cel: s('cel', 6, 0, 2, 4, 4, 9),
    }),
    group('F', ['bay', 'lyo', 'fio', 'ste'], {
      bay: s('bay', 6, 4, 2, 0, 12, 4),
      lyo: s('lyo', 6, 3, 2, 1, 12, 7),
      fio: s('fio', 6, 1, 3, 2, 5, 9),
      ste: s('ste', 6, 0, 1, 5, 3, 12),
    }),
    group('G', ['ars', 'por', 'dky', 'fen'], {
      ars: s('ars', 6, 3, 2, 1, 11, 5),
      por: s('por', 6, 3, 0, 3, 9, 8),
      dky: s('dky', 6, 2, 2, 2, 4, 6),
      fen: s('fen', 6, 1, 2, 3, 4, 9),
    }),
    group('H', ['juv', 'rma', 'zen', 'bat'], {
      juv: s('juv', 6, 3, 2, 1, 6, 3),
      rma: s('rma', 6, 3, 1, 2, 9, 6),
      zen: s('zen', 6, 1, 2, 3, 4, 7),
      bat: s('bat', 6, 0, 3, 3, 3, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2008.teams);

const PREDETERMINED: Record<string, string> = {
  che_juv: 'che',
  int_mun: 'mun',
  ars_rm: 'ars',
  acm_liv: 'liv',
  bar_lyo: 'bar',
  bay_sport: 'bay',
  atl_por: 'por',
  pan_vil: 'vil',
  ars_liv: 'liv',
  bar_bay: 'bar',
  che_liv: 'che',
  mun_por: 'mun',
  bar_mun: 'bar',
  bar_che: 'bar',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['che', 'juv'],
      ['int', 'mun'],
    ],
    [
      ['ars', 'rm'],
      ['liv', 'acm'],
    ],
  ],
  [
    [
      ['bar', 'lyo'],
      ['bay', 'spo'],
    ],
    [
      ['por', 'atl'],
      ['vil', 'pan'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
