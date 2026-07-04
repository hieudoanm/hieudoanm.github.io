import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_1998: ChampionsLeagueYearData = {
  year: 1998,
  host: 'Europe',
  champion: 'Manchester United',
  runnerUp: 'Bayern Munich',
  available: true,
  teams: {
    oly: t('oly', 'Olympiacos', 'gr'),
    dza: t('dza', 'Dinamo Zagreb', 'hr'),
    por: t('por', 'Porto', 'pt'),
    ajx: t('ajx', 'Ajax', 'nl'),
    juv: t('juv', 'Juventus', 'it'),
    gal: t('gal', 'Galatasaray', 'tr'),
    ros: t('ros', 'Rosenborg', 'no'),
    ath: t('ath', 'Athletic Bilbao', 'es'),
    rma: t('rma', 'Real Madrid', 'es'),
    int: t('int', 'Inter Milan', 'it'),
    spa: t('spa', 'Spartak Moscow', 'ru'),
    stm: t('stm', 'Sturm Graz', 'at'),
    bay: t('bay', 'Bayern Munich', 'de'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    bro: t('bro', 'Brøndby', 'dk'),
    bar: t('bar', 'Barcelona', 'es'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    len: t('len', 'Lens', 'fr'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    pan: t('pan', 'Panathinaikos', 'gr'),
    kai: t('kai', 'Kaiserslautern', 'de'),
    ben: t('ben', 'Benfica', 'pt'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    hjk: t('hjk', 'HJK Helsinki', 'fi'),
  },
  groups: [
    group('A', ['oly', 'dza', 'por', 'ajx'], {
      oly: s('oly', 6, 3, 2, 1, 8, 6),
      dza: s('dza', 6, 2, 2, 2, 5, 7),
      por: s('por', 6, 2, 1, 3, 11, 9),
      ajx: s('ajx', 6, 2, 1, 3, 4, 6),
    }),
    group('B', ['juv', 'gal', 'ros', 'ath'], {
      juv: s('juv', 6, 1, 5, 0, 7, 5),
      gal: s('gal', 6, 2, 2, 2, 8, 8),
      ros: s('ros', 6, 2, 2, 2, 7, 8),
      ath: s('ath', 6, 1, 3, 2, 5, 6),
    }),
    group('C', ['rma', 'int', 'spa', 'stm'], {
      rma: s('rma', 6, 4, 1, 1, 15, 5),
      int: s('int', 6, 3, 1, 2, 11, 9),
      spa: s('spa', 6, 2, 2, 2, 7, 6),
      stm: s('stm', 6, 0, 0, 6, 2, 15),
    }),
    group('D', ['bay', 'mun', 'bro', 'bar'], {
      bay: s('bay', 6, 3, 2, 1, 11, 7),
      mun: s('mun', 6, 2, 4, 0, 9, 4),
      bro: s('bro', 6, 1, 2, 3, 10, 15),
      bar: s('bar', 6, 0, 4, 2, 5, 9),
    }),
    group('E', ['dky', 'len', 'ars', 'pan'], {
      dky: s('dky', 6, 3, 2, 1, 11, 7),
      len: s('len', 6, 2, 2, 2, 7, 7),
      ars: s('ars', 6, 2, 2, 2, 8, 8),
      pan: s('pan', 6, 0, 4, 2, 6, 10),
    }),
    group('F', ['kai', 'ben', 'psv', 'hjk'], {
      kai: s('kai', 6, 4, 1, 1, 12, 6),
      ben: s('ben', 6, 2, 2, 2, 8, 9),
      psv: s('psv', 6, 2, 1, 3, 10, 11),
      hjk: s('hjk', 6, 1, 2, 3, 8, 12),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_1998.teams);

const PREDETERMINED: Record<string, string> = {
  rma_dky: 'dky',
  mun_int: 'mun',
  juv_oly: 'juv',
  bay_kai: 'bay',
  dky_bay: 'bay',
  mun_juv: 'mun',
  bay_mun: 'mun',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['rma', 'dky'],
    ['mun', 'int'],
  ],
  [
    ['juv', 'oly'],
    ['bay', 'kai'],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
