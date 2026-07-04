import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2014: ChampionsLeagueYearData = {
  year: 2014,
  host: 'Europe',
  champion: 'Barcelona',
  runnerUp: 'Juventus',
  available: true,
  teams: {
    atl: t('atl', 'Atletico Madrid', 'es'),
    juv: t('juv', 'Juventus', 'it'),
    oly: t('oly', 'Olympiacos', 'gr'),
    mal: t('mal', 'Malmö FF', 'se'),
    rma: t('rma', 'Real Madrid', 'es'),
    bas: t('bas', 'Basel', 'ch'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    lud: t('lud', 'Ludogorets Razgrad', 'bg'),
    mon: t('mon', 'Monaco', 'fr'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    zen: t('zen', 'Zenit Saint Petersburg', 'ru'),
    ben: t('ben', 'Benfica', 'pt'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    and: t('and', 'Anderlecht', 'be'),
    gal: t('gal', 'Galatasaray', 'tr'),
    bay: t('bay', 'Bayern Munich', 'de'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    rm: t('rm', 'Roma', 'it'),
    cska: t('cska', 'CSKA Moscow', 'ru'),
    bar: t('bar', 'Barcelona', 'es'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    ajx: t('ajx', 'Ajax', 'nl'),
    apo: t('apo', 'APOEL', 'cy'),
    che: t('che', 'Chelsea', 'gb-eng'),
    sch: t('sch', 'Schalke 04', 'de'),
    spo: t('spo', 'Sporting CP', 'pt'),
    mar: t('mar', 'Maribor', 'si'),
    por: t('por', 'Porto', 'pt'),
    shakhtar: t('shakhtar', 'Shakhtar Donetsk', 'ua'),
    ath: t('ath', 'Athletic Bilbao', 'es'),
    bate: t('bate', 'BATE Borisov', 'by'),
  },
  groups: [
    group('A', ['atl', 'juv', 'oly', 'mal'], {
      atl: s('atl', 6, 4, 1, 1, 14, 3),
      juv: s('juv', 6, 3, 1, 2, 7, 4),
      oly: s('oly', 6, 3, 0, 3, 10, 13),
      mal: s('mal', 6, 1, 0, 5, 4, 15),
    }),
    group('B', ['rma', 'bas', 'liv', 'lud'], {
      rma: s('rma', 6, 6, 0, 0, 16, 2),
      bas: s('bas', 6, 2, 1, 3, 7, 8),
      liv: s('liv', 6, 1, 2, 3, 5, 9),
      lud: s('lud', 6, 1, 1, 4, 5, 14),
    }),
    group('C', ['mon', 'lev', 'zen', 'ben'], {
      mon: s('mon', 6, 3, 2, 1, 4, 1),
      lev: s('lev', 6, 3, 1, 2, 7, 4),
      zen: s('zen', 6, 2, 1, 3, 4, 6),
      ben: s('ben', 6, 1, 2, 3, 2, 6),
    }),
    group('D', ['bvb', 'ars', 'and', 'gal'], {
      bvb: s('bvb', 6, 4, 1, 1, 14, 4),
      ars: s('ars', 6, 4, 1, 1, 15, 8),
      and: s('and', 6, 1, 3, 2, 8, 10),
      gal: s('gal', 6, 0, 1, 5, 4, 19),
    }),
    group('E', ['bay', 'mci', 'rm', 'cska'], {
      bay: s('bay', 6, 5, 0, 1, 16, 4),
      mci: s('mci', 6, 2, 2, 2, 9, 8),
      rm: s('rm', 6, 1, 2, 3, 8, 14),
      cska: s('cska', 6, 1, 2, 3, 6, 13),
    }),
    group('F', ['bar', 'psg', 'ajx', 'apo'], {
      bar: s('bar', 6, 5, 0, 1, 15, 5),
      psg: s('psg', 6, 4, 1, 1, 10, 7),
      ajx: s('ajx', 6, 1, 2, 3, 8, 10),
      apo: s('apo', 6, 0, 1, 5, 1, 12),
    }),
    group('G', ['che', 'sch', 'spo', 'mar'], {
      che: s('che', 6, 4, 2, 0, 17, 3),
      sch: s('sch', 6, 2, 2, 2, 9, 14),
      spo: s('spo', 6, 2, 1, 3, 12, 12),
      mar: s('mar', 6, 0, 3, 3, 4, 13),
    }),
    group('H', ['por', 'shakhtar', 'ath', 'bate'], {
      por: s('por', 6, 4, 2, 0, 16, 4),
      shakhtar: s('shakhtar', 6, 2, 3, 1, 15, 4),
      ath: s('ath', 6, 2, 1, 3, 5, 6),
      bate: s('bate', 6, 1, 0, 5, 2, 24),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2014.teams);

const PREDETERMINED: Record<string, string> = {
  bvb_juv: 'juv',
  bas_por: 'por',
  ars_mon: 'mon',
  bar_mci: 'bar',
  bay_shakhtar: 'bay',
  lev_atl: 'atl',
  che_psg: 'psg',
  rma_sch: 'rma',
  juv_mon: 'juv',
  bar_psg: 'bar',
  atl_rma: 'rma',
  bay_por: 'bay',
  bar_bay: 'bar',
  juv_rma: 'juv',
  bar_juv: 'bar',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['bvb', 'juv'],
      ['ars', 'mon'],
    ],
    [
      ['lev', 'atl'],
      ['rma', 'sch'],
    ],
  ],
  [
    [
      ['bar', 'mci'],
      ['che', 'psg'],
    ],
    [
      ['bas', 'por'],
      ['bay', 'shakhtar'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
