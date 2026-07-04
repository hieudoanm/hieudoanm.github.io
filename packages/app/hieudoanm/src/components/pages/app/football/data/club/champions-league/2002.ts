import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2002: ChampionsLeagueYearData = {
  year: 2002,
  host: 'Europe',
  champion: 'Milan',
  runnerUp: 'Juventus',
  available: true,
  teams: {
    ars: t('ars', 'Arsenal', 'gb-eng'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    aux: t('aux', 'Auxerre', 'fr'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    val: t('val', 'Valencia', 'es'),
    bas: t('bas', 'Basel', 'ch'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    spm: t('spm', 'Spartak Moscow', 'ru'),
    rma: t('rma', 'Real Madrid', 'es'),
    rom: t('rom', 'Roma', 'it'),
    aek: t('aek', 'AEK Athens', 'gr'),
    gnk: t('gnk', 'Genk', 'be'),
    int: t('int', 'Inter Milan', 'it'),
    ajx: t('ajx', 'Ajax', 'nl'),
    lyo: t('lyo', 'Lyon', 'fr'),
    ros: t('ros', 'Rosenborg', 'no'),
    juv: t('juv', 'Juventus', 'it'),
    new: t('new', 'Newcastle United', 'gb-eng'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    fey: t('fey', 'Feyenoord', 'nl'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    mha: t('mha', 'Maccabi Haifa', 'il'),
    oly: t('oly', 'Olympiacos', 'gr'),
    acm: t('acm', 'Milan', 'it'),
    dep: t('dep', 'Deportivo La Coruña', 'es'),
    len: t('len', 'Lens', 'fr'),
    bay: t('bay', 'Bayern Munich', 'de'),
    bar: t('bar', 'Barcelona', 'es'),
    lst: t('lst', 'Lokomotiv Moscow', 'ru'),
    clb: t('clb', 'Club Brugge', 'be'),
    gal: t('gal', 'Galatasaray', 'tr'),
  },
  groups: [
    group('A', ['ars', 'bvb', 'aux', 'psv'], {
      ars: s('ars', 6, 3, 1, 2, 9, 4),
      bvb: s('bvb', 6, 3, 1, 2, 8, 7),
      aux: s('aux', 6, 2, 1, 3, 4, 7),
      psv: s('psv', 6, 1, 3, 2, 5, 8),
    }),
    group('B', ['val', 'bas', 'liv', 'spm'], {
      val: s('val', 6, 5, 1, 0, 17, 4),
      bas: s('bas', 6, 2, 3, 1, 12, 12),
      liv: s('liv', 6, 2, 2, 2, 12, 8),
      spm: s('spm', 6, 0, 0, 6, 1, 18),
    }),
    group('C', ['rma', 'rom', 'aek', 'gnk'], {
      rma: s('rma', 6, 2, 3, 1, 15, 7),
      rom: s('rom', 6, 2, 3, 1, 3, 4),
      aek: s('aek', 6, 0, 6, 0, 7, 7),
      gnk: s('gnk', 6, 0, 4, 2, 2, 9),
    }),
    group('D', ['int', 'ajx', 'lyo', 'ros'], {
      int: s('int', 6, 3, 2, 1, 12, 8),
      ajx: s('ajx', 6, 2, 2, 2, 6, 5),
      lyo: s('lyo', 6, 2, 2, 2, 12, 9),
      ros: s('ros', 6, 0, 4, 2, 4, 12),
    }),
    group('E', ['juv', 'new', 'dky', 'fey'], {
      juv: s('juv', 6, 4, 1, 1, 12, 3),
      new: s('new', 6, 3, 0, 3, 6, 8),
      dky: s('dky', 6, 2, 1, 3, 6, 9),
      fey: s('fey', 6, 1, 2, 3, 4, 8),
    }),
    group('F', ['mun', 'lev', 'mha', 'oly'], {
      mun: s('mun', 6, 5, 0, 1, 16, 8),
      lev: s('lev', 6, 3, 0, 3, 9, 11),
      mha: s('mha', 6, 2, 1, 3, 12, 12),
      oly: s('oly', 6, 1, 1, 4, 11, 17),
    }),
    group('G', ['acm', 'dep', 'len', 'bay'], {
      acm: s('acm', 6, 4, 0, 2, 12, 7),
      dep: s('dep', 6, 4, 0, 2, 11, 8),
      len: s('len', 6, 2, 1, 3, 7, 10),
      bay: s('bay', 6, 1, 1, 4, 7, 12),
    }),
    group('H', ['bar', 'lst', 'clb', 'gal'], {
      bar: s('bar', 6, 6, 0, 0, 14, 5),
      lst: s('lst', 6, 2, 2, 2, 7, 5),
      clb: s('clb', 6, 1, 2, 3, 5, 10),
      gal: s('gal', 6, 0, 2, 4, 5, 12),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2002.teams);

const PREDETERMINED: Record<string, string> = {
  acm_ars: 'acm',
  rma_juv: 'juv',
  val_ajx: 'val',
  bar_new: 'juv',
  acm_int: 'acm',
  juv_bar: 'juv',
  acm_juv: 'acm',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['acm', 'ars'],
    ['rma', 'juv'],
  ],
  [
    ['val', 'ajx'],
    ['bar', 'new'],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
