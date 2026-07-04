import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2018: ChampionsLeagueYearData = {
  year: 2018,
  host: 'Europe',
  champion: 'Liverpool',
  runnerUp: 'Tottenham Hotspur',
  available: true,
  teams: {
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    atl: t('atl', 'Atlético Madrid', 'es'),
    clb: t('clb', 'Club Brugge', 'be'),
    mon: t('mon', 'Monaco', 'fr'),
    bar: t('bar', 'Barcelona', 'es'),
    tot: t('tot', 'Tottenham Hotspur', 'gb-eng'),
    int: t('int', 'Inter Milan', 'it'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    liv: t('liv', 'Liverpool', 'gb-eng'),
    nap: t('nap', 'Napoli', 'it'),
    crv: t('crv', 'Red Star Belgrade', 'rs'),
    por: t('por', 'Porto', 'pt'),
    s04: t('s04', 'Schalke 04', 'de'),
    gal: t('gal', 'Galatasaray', 'tr'),
    lok: t('lok', 'Lokomotiv Moscow', 'ru'),
    bay: t('bay', 'Bayern Munich', 'de'),
    ajx: t('ajx', 'Ajax', 'nl'),
    ben: t('ben', 'Benfica', 'pt'),
    aek: t('aek', 'AEK Athens', 'gr'),
    mci: t('mci', 'Manchester City', 'gb-eng'),
    lyo: t('lyo', 'Lyon', 'fr'),
    shk: t('shk', 'Shakhtar Donetsk', 'ua'),
    hof: t('hof', 'Hoffenheim', 'de'),
    rma: t('rma', 'Real Madrid', 'es'),
    rm: t('rm', 'Roma', 'it'),
    plz: t('plz', 'Viktoria Plzeň', 'cz'),
    cska: t('cska', 'CSKA Moscow', 'ru'),
    juv: t('juv', 'Juventus', 'it'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    val: t('val', 'Valencia', 'es'),
    yb: t('yb', 'Young Boys', 'ch'),
  },
  groups: [
    group('A', ['bvb', 'atl', 'clb', 'mon'], {
      bvb: s('bvb', 6, 4, 1, 1, 10, 2),
      atl: s('atl', 6, 4, 1, 1, 9, 6),
      clb: s('clb', 6, 1, 3, 2, 6, 5),
      mon: s('mon', 6, 0, 1, 5, 2, 14),
    }),
    group('B', ['bar', 'tot', 'int', 'psv'], {
      bar: s('bar', 6, 4, 2, 0, 14, 5),
      tot: s('tot', 6, 2, 2, 2, 9, 10),
      int: s('int', 6, 2, 2, 2, 6, 7),
      psv: s('psv', 6, 0, 2, 4, 6, 13),
    }),
    group('C', ['psg', 'liv', 'nap', 'crv'], {
      psg: s('psg', 6, 3, 2, 1, 17, 9),
      liv: s('liv', 6, 3, 0, 3, 9, 7),
      nap: s('nap', 6, 2, 3, 1, 7, 5),
      crv: s('crv', 6, 1, 1, 4, 5, 17),
    }),
    group('D', ['por', 's04', 'gal', 'lok'], {
      por: s('por', 6, 5, 1, 0, 15, 6),
      s04: s('s04', 6, 3, 2, 1, 6, 4),
      gal: s('gal', 6, 1, 1, 4, 5, 8),
      lok: s('lok', 6, 1, 0, 5, 4, 12),
    }),
    group('E', ['bay', 'ajx', 'ben', 'aek'], {
      bay: s('bay', 6, 4, 2, 0, 15, 5),
      ajx: s('ajx', 6, 3, 3, 0, 11, 5),
      ben: s('ben', 6, 2, 1, 3, 6, 11),
      aek: s('aek', 6, 0, 0, 6, 2, 13),
    }),
    group('F', ['mci', 'lyo', 'shk', 'hof'], {
      mci: s('mci', 6, 4, 1, 1, 16, 6),
      lyo: s('lyo', 6, 1, 5, 0, 12, 11),
      shk: s('shk', 6, 1, 3, 2, 8, 16),
      hof: s('hof', 6, 0, 3, 3, 11, 14),
    }),
    group('G', ['rma', 'rm', 'plz', 'cska'], {
      rma: s('rma', 6, 4, 0, 2, 12, 5),
      rm: s('rm', 6, 3, 0, 3, 11, 8),
      plz: s('plz', 6, 2, 1, 3, 8, 11),
      cska: s('cska', 6, 2, 1, 3, 8, 15),
    }),
    group('H', ['juv', 'mun', 'val', 'yb'], {
      juv: s('juv', 6, 4, 0, 2, 9, 4),
      mun: s('mun', 6, 3, 1, 2, 7, 4),
      val: s('val', 6, 2, 2, 2, 6, 6),
      yb: s('yb', 6, 1, 1, 4, 4, 12),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2018.teams);

const PREDETERMINED: Record<string, string> = {
  s04_mci: 'mci',
  ajx_rma: 'ajx',
  lyo_bar: 'bar',
  liv_bay: 'liv',
  bvb_tot: 'tot',
  psg_mun: 'mun',
  por_rm: 'por',
  juv_atl: 'juv',
  mci_tot: 'tot',
  ajx_juv: 'ajx',
  bar_mun: 'bar',
  liv_por: 'liv',
  tot_ajx: 'tot',
  bar_liv: 'liv',
  liv_tot: 'liv',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['s04', 'mci'],
      ['bvb', 'tot'],
    ],
    [
      ['ajx', 'rma'],
      ['juv', 'atl'],
    ],
  ],
  [
    [
      ['lyo', 'bar'],
      ['psg', 'mun'],
    ],
    [
      ['liv', 'bay'],
      ['por', 'rm'],
    ],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
