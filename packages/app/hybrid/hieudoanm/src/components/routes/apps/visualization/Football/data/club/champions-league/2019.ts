import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2019: ChampionsLeagueYearData = {
  year: 2019,
  host: 'Europe',
  champion: 'Bayern Munich',
  runnerUp: 'Paris Saint-Germain',
  available: true,
  teams: {
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    rma: t('rma', 'Real Madrid', 'es'),
    clb: t('clb', 'Club Brugge', 'be'),
    gal: t('gal', 'Galatasaray', 'tr'),
    bay: t('bay', 'Bayern Munich', 'de'),
    tot: t('tot', 'Tottenham Hotspur', 'gb-eng'),
    oly: t('oly', 'Olympiacos', 'gr'),
    crv: t('crv', 'Red Star Belgrade', 'rs'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    shk: t('shk', 'Shakhtar Donetsk', 'ua'),
    dza: t('dza', 'Dinamo Zagreb', 'hr'),
    ata: t('ata', 'Atalanta', 'it'),
    juv: t('juv', 'Juventus', 'it'),
    atl: t('atl', 'Atlético Madrid', 'es'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    lok: t('lok', 'Lokomotiv Moscow', 'ru'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    nap: t('nap', 'Napoli', 'it'),
    rbs: t('rbs', 'Red Bull Salzburg', 'at'),
    gen: t('gen', 'Genk', 'be'),
    bar: t('bar', 'Barcelona', 'es'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    int: t('int', 'Inter Milan', 'it'),
    slv: t('slv', 'Slavia Prague', 'cz'),
    rbl: t('rbl', 'RB Leipzig', 'de'),
    lyo: t('lyo', 'Lyon', 'fr'),
    ben: t('ben', 'Benfica', 'pt'),
    zen: t('zen', 'Zenit Saint Petersburg', 'ru'),
    che: t('che', 'Chelsea', 'gb-eng'),
    ajx: t('ajx', 'Ajax', 'nl'),
    val: t('val', 'Valencia', 'es'),
    lil: t('lil', 'Lille', 'fr'),
  },
  groups: [
    group('A', ['psg', 'rma', 'clb', 'gal'], {
      psg: s('psg', 6, 5, 1, 0, 17, 2),
      rma: s('rma', 6, 3, 2, 1, 14, 8),
      clb: s('clb', 6, 0, 3, 3, 4, 12),
      gal: s('gal', 6, 0, 2, 4, 3, 16),
    }),
    group('B', ['bay', 'tot', 'oly', 'crv'], {
      bay: s('bay', 6, 6, 0, 0, 24, 5),
      tot: s('tot', 6, 3, 1, 2, 18, 14),
      oly: s('oly', 6, 1, 1, 4, 8, 14),
      crv: s('crv', 6, 1, 0, 5, 3, 20),
    }),
    group('C', ['mci', 'shk', 'dza', 'ata'], {
      mci: s('mci', 6, 4, 2, 0, 16, 4),
      shk: s('shk', 6, 1, 3, 2, 8, 13),
      dza: s('dza', 6, 1, 2, 3, 10, 13),
      ata: s('ata', 6, 1, 1, 4, 10, 14),
    }),
    group('D', ['juv', 'atl', 'lev', 'lok'], {
      juv: s('juv', 6, 5, 1, 0, 12, 4),
      atl: s('atl', 6, 3, 1, 2, 8, 5),
      lev: s('lev', 6, 2, 0, 4, 5, 9),
      lok: s('lok', 6, 1, 0, 5, 4, 11),
    }),
    group('E', ['liv', 'nap', 'rbs', 'gen'], {
      liv: s('liv', 6, 4, 1, 1, 13, 8),
      nap: s('nap', 6, 3, 3, 0, 9, 5),
      rbs: s('rbs', 6, 2, 1, 3, 16, 13),
      gen: s('gen', 6, 0, 1, 5, 5, 17),
    }),
    group('F', ['bar', 'bvb', 'int', 'slv'], {
      bar: s('bar', 6, 4, 2, 0, 9, 4),
      bvb: s('bvb', 6, 3, 1, 2, 8, 8),
      int: s('int', 6, 2, 1, 3, 10, 9),
      slv: s('slv', 6, 0, 2, 4, 4, 10),
    }),
    group('G', ['rbl', 'lyo', 'ben', 'zen'], {
      rbl: s('rbl', 6, 3, 2, 1, 10, 8),
      lyo: s('lyo', 6, 2, 2, 2, 9, 8),
      ben: s('ben', 6, 2, 1, 3, 10, 11),
      zen: s('zen', 6, 2, 1, 3, 7, 9),
    }),
    group('H', ['che', 'ajx', 'val', 'lil'], {
      che: s('che', 6, 3, 2, 1, 11, 7),
      ajx: s('ajx', 6, 3, 1, 2, 12, 6),
      val: s('val', 6, 2, 2, 2, 9, 10),
      lil: s('lil', 6, 1, 1, 4, 4, 13),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2019.teams);

const PREDETERMINED: Record<string, string> = {
  bvb_psg: 'psg',
  mci_rma: 'mci',
  ata_val: 'ata',
  atl_liv: 'liv',
  rbl_tot: 'rbl',
  juv_lyo: 'lyo',
  bay_che: 'bay',
  bar_nap: 'bar',
  atl_rbl: 'rbl',
  lyo_mci: 'lyo',
  ata_psg: 'psg',
  bar_bay: 'bay',
  psg_rbl: 'psg',
  bay_lyo: 'bay',
  bay_psg: 'bay',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['bvb', 'psg'],
      ['ata', 'val'],
    ],
    [
      ['rma', 'mci'],
      ['lyo', 'juv'],
    ],
  ],
  [
    [
      ['tot', 'rbl'],
      ['atl', 'liv'],
    ],
    [
      ['che', 'bay'],
      ['nap', 'bar'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
