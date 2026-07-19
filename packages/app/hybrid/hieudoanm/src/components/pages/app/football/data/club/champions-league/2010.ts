import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2010: ChampionsLeagueYearData = {
  year: 2010,
  host: 'Europe',
  champion: 'Barcelona',
  runnerUp: 'Manchester United',
  available: true,
  teams: {
    tot: t('tot', 'Tottenham Hotspur', 'gb-eng'),
    int: t('int', 'Inter Milan', 'it'),
    twe: t('twe', 'Twente', 'nl'),
    bre: t('bre', 'Werder Bremen', 'de'),
    sch: t('sch', 'Schalke 04', 'de'),
    lyo: t('lyo', 'Lyon', 'fr'),
    ben: t('ben', 'Benfica', 'pt'),
    hap: t('hap', 'Hapoel Tel Aviv', 'il'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    val: t('val', 'Valencia', 'es'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    bur: t('bur', 'Bursaspor', 'tr'),
    bar: t('bar', 'Barcelona', 'es'),
    cop: t('cop', 'Copenhagen', 'dk'),
    rub: t('rub', 'Rubin Kazan', 'ru'),
    pan: t('pan', 'Panathinaikos', 'gr'),
    bay: t('bay', 'Bayern Munich', 'de'),
    rm: t('rm', 'Roma', 'it'),
    bas: t('bas', 'Basel', 'ch'),
    cfr: t('cfr', 'CFR Cluj', 'ro'),
    che: t('che', 'Chelsea', 'gb-eng'),
    mar: t('mar', 'Marseille', 'fr'),
    spa: t('spa', 'Spartak Moscow', 'ru'),
    zil: t('zil', 'MSK Žilina', 'sk'),
    rma: t('rma', 'Real Madrid', 'es'),
    acm: t('acm', 'AC Milan', 'it'),
    ajx: t('ajx', 'Ajax', 'nl'),
    aux: t('aux', 'Auxerre', 'fr'),
    shakhtar: t('shakhtar', 'Shakhtar Donetsk', 'ua'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    bra: t('bra', 'Braga', 'pt'),
    par: t('par', 'Partizan', 'rs'),
  },
  groups: [
    group('A', ['tot', 'int', 'twe', 'bre'], {
      tot: s('tot', 6, 3, 2, 1, 18, 11),
      int: s('int', 6, 3, 1, 2, 12, 11),
      twe: s('twe', 6, 1, 3, 2, 9, 11),
      bre: s('bre', 6, 1, 2, 3, 6, 12),
    }),
    group('B', ['sch', 'lyo', 'ben', 'hap'], {
      sch: s('sch', 6, 4, 1, 1, 10, 3),
      lyo: s('lyo', 6, 3, 1, 2, 11, 10),
      ben: s('ben', 6, 2, 0, 4, 7, 12),
      hap: s('hap', 6, 1, 2, 3, 7, 10),
    }),
    group('C', ['mun', 'val', 'ran', 'bur'], {
      mun: s('mun', 6, 4, 2, 0, 7, 1),
      val: s('val', 6, 3, 2, 1, 15, 4),
      ran: s('ran', 6, 1, 3, 2, 3, 6),
      bur: s('bur', 6, 0, 1, 5, 2, 16),
    }),
    group('D', ['bar', 'cop', 'rub', 'pan'], {
      bar: s('bar', 6, 4, 2, 0, 14, 3),
      cop: s('cop', 6, 3, 1, 2, 7, 5),
      rub: s('rub', 6, 1, 3, 2, 2, 4),
      pan: s('pan', 6, 0, 2, 4, 2, 13),
    }),
    group('E', ['bay', 'rm', 'bas', 'cfr'], {
      bay: s('bay', 6, 5, 0, 1, 16, 6),
      rm: s('rm', 6, 3, 1, 2, 10, 11),
      bas: s('bas', 6, 2, 0, 4, 8, 11),
      cfr: s('cfr', 6, 1, 1, 4, 6, 12),
    }),
    group('F', ['che', 'mar', 'spa', 'zil'], {
      che: s('che', 6, 5, 0, 1, 14, 4),
      mar: s('mar', 6, 4, 0, 2, 12, 3),
      spa: s('spa', 6, 3, 0, 3, 7, 10),
      zil: s('zil', 6, 0, 0, 6, 3, 19),
    }),
    group('G', ['rma', 'acm', 'ajx', 'aux'], {
      rma: s('rma', 6, 5, 1, 0, 15, 2),
      acm: s('acm', 6, 2, 2, 2, 7, 7),
      ajx: s('ajx', 6, 2, 1, 3, 6, 10),
      aux: s('aux', 6, 1, 0, 5, 3, 12),
    }),
    group('H', ['shakhtar', 'ars', 'bra', 'par'], {
      shakhtar: s('shakhtar', 6, 5, 0, 1, 12, 6),
      ars: s('ars', 6, 4, 0, 2, 18, 7),
      bra: s('bra', 6, 3, 0, 3, 5, 11),
      par: s('par', 6, 0, 0, 6, 2, 13),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2010.teams);

const PREDETERMINED: Record<string, string> = {
  lyo_rma: 'rma',
  acm_tot: 'tot',
  ars_bar: 'bar',
  rm_shakhtar: 'shakhtar',
  sch_val: 'sch',
  bay_int: 'int',
  che_cop: 'che',
  mar_mun: 'mun',
  rma_tot: 'rma',
  bar_shakhtar: 'bar',
  int_sch: 'sch',
  che_mun: 'mun',
  bar_rma: 'bar',
  mun_sch: 'mun',
  bar_mun: 'bar',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['lyo', 'rma'],
      ['acm', 'tot'],
    ],
    [
      ['ars', 'bar'],
      ['rm', 'shakhtar'],
    ],
  ],
  [
    [
      ['val', 'sch'],
      ['int', 'bay'],
    ],
    [
      ['mar', 'mun'],
      ['cop', 'che'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
