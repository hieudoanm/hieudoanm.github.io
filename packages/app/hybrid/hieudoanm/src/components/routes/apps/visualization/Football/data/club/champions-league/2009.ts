import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2009: ChampionsLeagueYearData = {
  year: 2009,
  host: 'Europe',
  champion: 'Inter Milan',
  runnerUp: 'Bayern Munich',
  available: true,
  teams: {
    juv: t('juv', 'Juventus', 'it'),
    bay: t('bay', 'Bayern Munich', 'de'),
    bor: t('bor', 'Bordeaux', 'fr'),
    mha: t('mha', 'Maccabi Haifa', 'il'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    csk: t('csk', 'CSKA Moscow', 'ru'),
    wol: t('wol', 'VfL Wolfsburg', 'de'),
    bes: t('bes', 'Beşiktaş', 'tr'),
    rma: t('rma', 'Real Madrid', 'es'),
    acm: t('acm', 'Milan', 'it'),
    mar: t('mar', 'Marseille', 'fr'),
    zur: t('zur', 'Zürich', 'ch'),
    che: t('che', 'Chelsea', 'gb-eng'),
    por: t('por', 'Porto', 'pt'),
    atl: t('atl', 'Atletico Madrid', 'es'),
    apo: t('apo', 'APOEL', 'cy'),
    lyo: t('lyo', 'Lyon', 'fr'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    fio: t('fio', 'Fiorentina', 'it'),
    deb: t('deb', 'Debrecen', 'hu'),
    bar: t('bar', 'Barcelona', 'es'),
    int: t('int', 'Inter Milan', 'it'),
    rub: t('rub', 'Rubin Kazan', 'ru'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    sei: t('sei', 'Sevilla', 'es'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    stg: t('stg', 'VfB Stuttgart', 'de'),
    uni: t('uni', 'Unirea Urziceni', 'ro'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    oly: t('oly', 'Olympiacos', 'gr'),
    sta: t('sta', 'Standard Liège', 'be'),
    az: t('az', 'AZ Alkmaar', 'nl'),
  },
  groups: [
    group('A', ['juv', 'bay', 'bor', 'mha'], {
      bor: s('bor', 6, 4, 1, 1, 9, 4),
      bay: s('bay', 6, 3, 1, 2, 9, 5),
      juv: s('juv', 6, 2, 2, 2, 4, 5),
      mha: s('mha', 6, 0, 2, 4, 3, 11),
    }),
    group('B', ['mun', 'csk', 'wol', 'bes'], {
      mun: s('mun', 6, 4, 1, 1, 10, 6),
      csk: s('csk', 6, 3, 1, 2, 10, 6),
      wol: s('wol', 6, 2, 1, 3, 9, 9),
      bes: s('bes', 6, 1, 1, 4, 3, 11),
    }),
    group('C', ['rma', 'acm', 'mar', 'zur'], {
      rma: s('rma', 6, 4, 1, 1, 15, 7),
      acm: s('acm', 6, 2, 3, 1, 8, 7),
      mar: s('mar', 6, 2, 1, 3, 10, 10),
      zur: s('zur', 6, 1, 1, 4, 5, 14),
    }),
    group('D', ['che', 'por', 'atl', 'apo'], {
      che: s('che', 6, 4, 2, 0, 9, 2),
      por: s('por', 6, 4, 0, 2, 8, 3),
      atl: s('atl', 6, 0, 3, 3, 3, 8),
      apo: s('apo', 6, 0, 3, 3, 2, 9),
    }),
    group('E', ['lyo', 'liv', 'fio', 'deb'], {
      fio: s('fio', 6, 4, 0, 2, 12, 7),
      lyo: s('lyo', 6, 3, 1, 2, 9, 7),
      liv: s('liv', 6, 2, 1, 3, 7, 7),
      deb: s('deb', 6, 1, 0, 5, 5, 12),
    }),
    group('F', ['bar', 'int', 'rub', 'dky'], {
      bar: s('bar', 6, 4, 2, 0, 13, 5),
      int: s('int', 6, 2, 3, 1, 7, 6),
      rub: s('rub', 6, 1, 3, 2, 4, 7),
      dky: s('dky', 6, 0, 2, 4, 4, 10),
    }),
    group('G', ['sei', 'ran', 'stg', 'uni'], {
      sei: s('sei', 6, 4, 1, 1, 11, 4),
      stg: s('stg', 6, 2, 3, 1, 9, 7),
      uni: s('uni', 6, 2, 2, 2, 7, 7),
      ran: s('ran', 6, 0, 2, 4, 3, 12),
    }),
    group('H', ['ars', 'oly', 'sta', 'az'], {
      ars: s('ars', 6, 4, 1, 1, 12, 5),
      oly: s('oly', 6, 3, 1, 2, 7, 6),
      sta: s('sta', 6, 1, 2, 3, 7, 10),
      az: s('az', 6, 0, 2, 4, 3, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2009.teams);

const PREDETERMINED: Record<string, string> = {
  acm_mun: 'mun',
  ars_por: 'ars',
  lyo_rma: 'lyo',
  bay_fio: 'bay',
  csk_sei: 'csk',
  che_int: 'int',
  bar_stg: 'bar',
  bor_oly: 'bor',
  ars_bar: 'bar',
  bay_mun: 'bay',
  bor_lyo: 'lyo',
  csk_int: 'int',
  bar_lyo: 'bar',
  bay_int: 'int',
  bar_int: 'int',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['acm', 'mun'],
      ['ars', 'por'],
    ],
    [
      ['lyo', 'rma'],
      ['bay', 'fio'],
    ],
  ],
  [
    [
      ['csk', 'sei'],
      ['che', 'int'],
    ],
    [
      ['bar', 'stg'],
      ['oly', 'bor'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
