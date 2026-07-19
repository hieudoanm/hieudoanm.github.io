import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_2000: ChampionsLeagueYearData = {
  year: 2000,
  host: 'Europe',
  champion: 'Bayern Munich',
  runnerUp: 'Valencia',
  available: true,
  teams: {
    rma: t('rma', 'Real Madrid', 'es'),
    spm: t('spm', 'Spartak Moscow', 'ru'),
    lev: t('lev', 'Bayer Leverkusen', 'de'),
    spo: t('spo', 'Sporting CP', 'pt'),
    ars: t('ars', 'Arsenal', 'gb-eng'),
    laz: t('laz', 'Lazio', 'it'),
    shk: t('shk', 'Shakhtar Donetsk', 'ua'),
    spr: t('spr', 'Sparta Prague', 'cz'),
    val: t('val', 'Valencia', 'es'),
    lyo: t('lyo', 'Lyon', 'fr'),
    oly: t('oly', 'Olympiacos', 'gr'),
    hee: t('hee', 'Heerenveen', 'nl'),
    stm: t('stm', 'Sturm Graz', 'at'),
    gal: t('gal', 'Galatasaray', 'tr'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    mon: t('mon', 'Monaco', 'fr'),
    dep: t('dep', 'Deportivo La Coruña', 'es'),
    pan: t('pan', 'Panathinaikos', 'gr'),
    ham: t('ham', 'Hamburg', 'de'),
    juv: t('juv', 'Juventus', 'it'),
    bay: t('bay', 'Bayern Munich', 'de'),
    psg: t('psg', 'Paris Saint-Germain', 'fr'),
    ros: t('ros', 'Rosenborg', 'no'),
    hel: t('hel', 'Helsingborg', 'se'),
    and: t('and', 'Anderlecht', 'be'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    psv: t('psv', 'PSV Eindhoven', 'nl'),
    dky: t('dky', 'Dynamo Kyiv', 'ua'),
    acm: t('acm', 'Milan', 'it'),
    lee: t('lee', 'Leeds United', 'gb-eng'),
    bar: t('bar', 'Barcelona', 'es'),
    bes: t('bes', 'Beşiktaş', 'tr'),
  },
  groups: [
    group('A', ['rma', 'spm', 'lev', 'spo'], {
      rma: s('rma', 6, 4, 1, 1, 15, 8),
      spm: s('spm', 6, 4, 0, 2, 9, 3),
      lev: s('lev', 6, 2, 1, 3, 9, 12),
      spo: s('spo', 6, 0, 2, 4, 5, 15),
    }),
    group('B', ['ars', 'laz', 'shk', 'spr'], {
      ars: s('ars', 6, 4, 1, 1, 11, 8),
      laz: s('laz', 6, 4, 1, 1, 13, 4),
      shk: s('shk', 6, 2, 0, 4, 10, 15),
      spr: s('spr', 6, 1, 0, 5, 6, 13),
    }),
    group('C', ['val', 'lyo', 'oly', 'hee'], {
      val: s('val', 6, 4, 1, 1, 7, 4),
      lyo: s('lyo', 6, 3, 0, 3, 8, 6),
      oly: s('oly', 6, 3, 0, 3, 6, 5),
      hee: s('hee', 6, 1, 1, 4, 3, 9),
    }),
    group('D', ['stm', 'gal', 'ran', 'mon'], {
      stm: s('stm', 6, 3, 1, 2, 9, 12),
      gal: s('gal', 6, 2, 2, 2, 10, 13),
      ran: s('ran', 6, 2, 2, 2, 10, 7),
      mon: s('mon', 6, 2, 1, 3, 13, 10),
    }),
    group('E', ['dep', 'pan', 'ham', 'juv'], {
      dep: s('dep', 6, 2, 4, 0, 6, 4),
      pan: s('pan', 6, 2, 2, 2, 6, 5),
      ham: s('ham', 6, 1, 3, 2, 9, 9),
      juv: s('juv', 6, 1, 3, 2, 9, 12),
    }),
    group('F', ['bay', 'psg', 'ros', 'hel'], {
      bay: s('bay', 6, 3, 2, 1, 9, 4),
      psg: s('psg', 6, 3, 1, 2, 14, 9),
      ros: s('ros', 6, 2, 1, 3, 13, 15),
      hel: s('hel', 6, 1, 2, 3, 6, 14),
    }),
    group('G', ['and', 'mun', 'psv', 'dky'], {
      and: s('and', 6, 4, 0, 2, 11, 14),
      mun: s('mun', 6, 3, 1, 2, 11, 7),
      psv: s('psv', 6, 3, 0, 3, 9, 9),
      dky: s('dky', 6, 1, 1, 4, 7, 8),
    }),
    group('H', ['acm', 'lee', 'bar', 'bes'], {
      acm: s('acm', 6, 3, 2, 1, 11, 6),
      lee: s('lee', 6, 2, 3, 1, 9, 6),
      bar: s('bar', 6, 2, 2, 2, 13, 9),
      bes: s('bes', 6, 1, 1, 4, 4, 16),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_2000.teams);

const PREDETERMINED: Record<string, string> = {
  bay_mun: 'bay',
  gal_rma: 'rma',
  ars_val: 'val',
  dep_lee: 'lee',
  bay_rma: 'bay',
  lee_val: 'val',
  bay_val: 'bay',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['bay', 'mun'],
    ['rma', 'gal'],
  ],
  [
    ['val', 'ars'],
    ['dep', 'lee'],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
