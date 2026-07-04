import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2022: ChampionsLeagueYearData = {
  year: 2022,
  host: 'Europe',
  champion: 'Manchester City',
  runnerUp: 'Inter Milan',
  available: true,
  teams: {
    nap: t('nap', 'Napoli', 'it'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    ajx: t('ajx', 'Ajax', 'nl'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    por: t('por', 'Porto', 'pt'),
    clb: t('clb', 'Club Brugge', 'be'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    atl: t('atl', 'Atlético Madrid', 'es'),
    bay: t('bay', 'Bayern Munich', 'de'),
    int: t('int', 'Inter Milan', 'it'),
    bar: t('bar', 'Barcelona', 'es'),
    plz: t('plz', 'Viktoria Plzeň', 'cz'),
    tot: t('tot', 'Tottenham Hotspur', 'gb-eng'),
    fra: t('fra', 'Eintracht Frankfurt', 'de'),
    spo: t('spo', 'Sporting CP', 'pt'),
    mar: t('mar', 'Marseille', 'fr'),
    che: t('che', 'Chelsea', 'gb-eng'),
    acm: t('acm', 'Milan', 'it'),
    rbs: t('rbs', 'Red Bull Salzburg', 'at'),
    dza: t('dza', 'Dinamo Zagreb', 'hr'),
    rma: t('rma', 'Real Madrid', 'es'),
    rbl: t('rbl', 'RB Leipzig', 'de'),
    shk: t('shk', 'Shakhtar Donetsk', 'ua'),
    cel: t('cel', 'Celtic', 'gb-sct'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    sei: t('sei', 'Sevilla', 'es'),
    cop: t('cop', 'Copenhagen', 'dk'),
    ben: t('ben', 'Benfica', 'pt'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    juv: t('juv', 'Juventus', 'it'),
    mch: t('mch', 'Maccabi Haifa', 'il'),
  },
  groups: [
    group('A', ['nap', 'liv', 'ajx', 'ran'], {
      nap: s('nap', 6, 5, 0, 1, 20, 6),
      liv: s('liv', 6, 5, 0, 1, 17, 6),
      ajx: s('ajx', 6, 2, 0, 4, 11, 16),
      ran: s('ran', 6, 0, 0, 6, 2, 22),
    }),
    group('B', ['por', 'clb', 'lev', 'atl'], {
      por: s('por', 6, 4, 0, 2, 12, 7),
      clb: s('clb', 6, 3, 2, 1, 7, 4),
      lev: s('lev', 6, 1, 2, 3, 4, 8),
      atl: s('atl', 6, 1, 2, 3, 5, 9),
    }),
    group('C', ['bay', 'int', 'bar', 'plz'], {
      bay: s('bay', 6, 6, 0, 0, 18, 2),
      int: s('int', 6, 3, 1, 2, 10, 7),
      bar: s('bar', 6, 2, 1, 3, 12, 12),
      plz: s('plz', 6, 0, 0, 6, 5, 24),
    }),
    group('D', ['tot', 'fra', 'spo', 'mar'], {
      tot: s('tot', 6, 3, 2, 1, 8, 6),
      fra: s('fra', 6, 3, 1, 2, 7, 8),
      spo: s('spo', 6, 2, 1, 3, 8, 9),
      mar: s('mar', 6, 2, 0, 4, 8, 8),
    }),
    group('E', ['che', 'acm', 'rbs', 'dza'], {
      che: s('che', 6, 4, 1, 1, 10, 4),
      acm: s('acm', 6, 3, 1, 2, 12, 7),
      rbs: s('rbs', 6, 1, 3, 2, 5, 9),
      dza: s('dza', 6, 1, 1, 4, 4, 11),
    }),
    group('F', ['rma', 'rbl', 'shk', 'cel'], {
      rma: s('rma', 6, 4, 1, 1, 15, 6),
      rbl: s('rbl', 6, 4, 0, 2, 13, 9),
      shk: s('shk', 6, 1, 3, 2, 8, 10),
      cel: s('cel', 6, 0, 2, 4, 4, 15),
    }),
    group('G', ['mci', 'bvb', 'sei', 'cop'], {
      mci: s('mci', 6, 4, 2, 0, 14, 2),
      bvb: s('bvb', 6, 2, 3, 1, 10, 5),
      sei: s('sei', 6, 1, 2, 3, 6, 12),
      cop: s('cop', 6, 0, 3, 3, 1, 12),
    }),
    group('H', ['ben', 'psg', 'juv', 'mch'], {
      ben: s('ben', 6, 4, 2, 0, 16, 7),
      psg: s('psg', 6, 4, 2, 0, 16, 7),
      juv: s('juv', 6, 1, 0, 5, 9, 13),
      mch: s('mch', 6, 1, 0, 5, 7, 21),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2022.teams);

const PREDETERMINED: Record<string, string> = {
  liv_rma: 'rma',
  bvb_che: 'che',
  mci_rbl: 'mci',
  bay_psg: 'bay',
  acm_tot: 'acm',
  fra_nap: 'nap',
  ben_clb: 'ben',
  int_por: 'int',
  che_rma: 'rma',
  bay_mci: 'mci',
  acm_nap: 'acm',
  ben_int: 'int',
  mci_rma: 'mci',
  acm_int: 'int',
  int_mci: 'mci',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['liv', 'rma'],
      ['bvb', 'che'],
    ],
    [
      ['rbl', 'mci'],
      ['psg', 'bay'],
    ],
  ],
  [
    [
      ['acm', 'tot'],
      ['nap', 'fra'],
    ],
    [
      ['ben', 'clb'],
      ['int', 'por'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
