import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2017: ChampionsLeagueYearData = {
  year: 2017,
  host: 'Europe',
  champion: 'Real Madrid',
  runnerUp: 'Liverpool',
  available: true,
  teams: {
    mun: t('mun', 'Manchester United', 'gb-eng'),
    bas: t('bas', 'Basel', 'ch'),
    cska: t('cska', 'CSKA Moscow', 'ru'),
    ben: t('ben', 'Benfica', 'pt'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    bay: t('bay', 'Bayern Munich', 'de'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    and: t('and', 'Anderlecht', 'be'),
    rm: t('rm', 'Roma', 'it'),
    che: t('che', 'Chelsea', 'gb-eng'),
    atl: t('atl', 'Atlético Madrid', 'es'),
    qar: t('qar', 'Qarabag', 'az'),
    bar: t('bar', 'Barcelona', 'es'),
    juv: t('juv', 'Juventus', 'it'),
    spo: t('spo', 'Sporting CP', 'pt'),
    oly: t('oly', 'Olympiacos', 'gr'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    sei: t('sei', 'Sevilla', 'es'),
    spm: t('spm', 'Spartak Moscow', 'ru'),
    mar: t('mar', 'Maribor', 'si'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    shk: t('shk', 'Shakhtar Donetsk', 'ua'),
    nap: t('nap', 'Napoli', 'it'),
    fey: t('fey', 'Feyenoord', 'nl'),
    bes: t('bes', 'Beşiktaş', 'tr'),
    por: t('por', 'Porto', 'pt'),
    rbl: t('rbl', 'RB Leipzig', 'de'),
    mon: t('mon', 'Monaco', 'fr'),
    tot: t('tot', 'Tottenham Hotspur', 'gb-eng'),
    rma: t('rma', 'Real Madrid', 'es'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    apo: t('apo', 'APOEL', 'cy'),
  },
  groups: [
    group('A', ['mun', 'bas', 'cska', 'ben'], {
      mun: s('mun', 6, 5, 0, 1, 12, 3),
      bas: s('bas', 6, 4, 0, 2, 11, 5),
      cska: s('cska', 6, 3, 0, 3, 8, 10),
      ben: s('ben', 6, 0, 0, 6, 1, 14),
    }),
    group('B', ['psg', 'bay', 'cel', 'and'], {
      psg: s('psg', 6, 5, 0, 1, 25, 4),
      bay: s('bay', 6, 5, 0, 1, 13, 6),
      cel: s('cel', 6, 1, 0, 5, 5, 18),
      and: s('and', 6, 1, 0, 5, 2, 17),
    }),
    group('C', ['rm', 'che', 'atl', 'qar'], {
      rm: s('rm', 6, 3, 2, 1, 9, 6),
      che: s('che', 6, 3, 2, 1, 16, 8),
      atl: s('atl', 6, 1, 4, 1, 5, 4),
      qar: s('qar', 6, 0, 2, 4, 2, 14),
    }),
    group('D', ['bar', 'juv', 'spo', 'oly'], {
      bar: s('bar', 6, 4, 2, 0, 15, 4),
      juv: s('juv', 6, 3, 3, 0, 7, 5),
      spo: s('spo', 6, 2, 1, 3, 6, 7),
      oly: s('oly', 6, 0, 1, 5, 4, 16),
    }),
    group('E', ['liv', 'sei', 'spm', 'mar'], {
      liv: s('liv', 6, 3, 3, 0, 23, 6),
      sei: s('sei', 6, 2, 3, 1, 12, 12),
      spm: s('spm', 6, 1, 3, 2, 11, 14),
      mar: s('mar', 6, 0, 3, 3, 3, 17),
    }),
    group('F', ['mci', 'shk', 'nap', 'fey'], {
      mci: s('mci', 6, 5, 0, 1, 14, 5),
      shk: s('shk', 6, 4, 0, 2, 9, 9),
      nap: s('nap', 6, 2, 0, 4, 11, 11),
      fey: s('fey', 6, 1, 0, 5, 5, 14),
    }),
    group('G', ['bes', 'por', 'rbl', 'mon'], {
      bes: s('bes', 6, 3, 2, 1, 8, 6),
      por: s('por', 6, 3, 1, 2, 15, 10),
      rbl: s('rbl', 6, 2, 1, 3, 10, 11),
      mon: s('mon', 6, 1, 2, 3, 6, 12),
    }),
    group('H', ['tot', 'rma', 'bvb', 'apo'], {
      tot: s('tot', 6, 5, 1, 0, 15, 4),
      rma: s('rma', 6, 4, 1, 1, 17, 7),
      bvb: s('bvb', 6, 0, 2, 4, 5, 12),
      apo: s('apo', 6, 0, 2, 4, 2, 16),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2017.teams);

const PREDETERMINED: Record<string, string> = {
  bay_bes: 'bay',
  sei_mun: 'sei',
  juv_tot: 'juv',
  psg_rma: 'rma',
  bar_che: 'bar',
  rm_shk: 'rm',
  liv_por: 'liv',
  bas_mci: 'mci',
  bay_sei: 'bay',
  juv_rma: 'rma',
  bar_rm: 'rm',
  liv_mci: 'liv',
  bay_rma: 'rma',
  liv_rm: 'liv',
  liv_rma: 'rma',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['bay', 'bes'],
      ['sei', 'mun'],
    ],
    [
      ['juv', 'tot'],
      ['psg', 'rma'],
    ],
  ],
  [
    [
      ['bar', 'che'],
      ['rm', 'shk'],
    ],
    [
      ['liv', 'por'],
      ['bas', 'mci'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
