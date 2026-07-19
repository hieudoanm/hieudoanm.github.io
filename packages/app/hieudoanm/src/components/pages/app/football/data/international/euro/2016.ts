import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_2016: EuroYearData = {
  year: 2016,
  host: 'France',
  champion: 'Portugal',
  runnerUp: 'France',
  available: false,
  teams: {
    alb: t('alb', 'Albania', 'al'),
    aut: t('aut', 'Austria', 'at'),
    bel: t('bel', 'Belgium', 'be'),
    cro: t('cro', 'Croatia', 'hr'),
    cze: t('cze', 'Czech Republic', 'cz'),
    eng: t('eng', 'England', 'gb-eng'),
    esp: t('esp', 'Spain', 'es'),
    fra: t('fra', 'France', 'fr'),
    ger: t('ger', 'Germany', 'de'),
    hun: t('hun', 'Hungary', 'hu'),
    irl: t('irl', 'Republic of Ireland', 'ie'),
    isl: t('isl', 'Iceland', 'is'),
    ita: t('ita', 'Italy', 'it'),
    nir: t('nir', 'Northern Ireland', 'gb-nir'),
    pol: t('pol', 'Poland', 'pl'),
    por: t('por', 'Portugal', 'pt'),
    rou: t('rou', 'Romania', 'ro'),
    rus: t('rus', 'Russia', 'ru'),
    sui: t('sui', 'Switzerland', 'ch'),
    svk: t('svk', 'Slovakia', 'sk'),
    swe: t('swe', 'Sweden', 'se'),
    tur: t('tur', 'Turkey', 'tr'),
    ukr: t('ukr', 'Ukraine', 'ua'),
    wal: t('wal', 'Wales', 'gb-wls'),
  },
  groups: [
    group('A', ['fra', 'alb', 'rou', 'sui'], {
      fra: s('fra', 3, 2, 1, 0, 4, 1),
      sui: s('sui', 3, 1, 2, 0, 2, 1),
      alb: s('alb', 3, 1, 0, 2, 1, 3),
      rou: s('rou', 3, 0, 1, 2, 2, 4),
    }),
    group('B', ['eng', 'wal', 'rus', 'svk'], {
      wal: s('wal', 3, 2, 0, 1, 6, 3),
      eng: s('eng', 3, 1, 2, 0, 3, 2),
      svk: s('svk', 3, 1, 1, 1, 3, 3),
      rus: s('rus', 3, 0, 1, 2, 2, 6),
    }),
    group('C', ['ger', 'pol', 'ukr', 'nir'], {
      ger: s('ger', 3, 2, 1, 0, 3, 0),
      pol: s('pol', 3, 2, 1, 0, 2, 0),
      nir: s('nir', 3, 1, 0, 2, 2, 2),
      ukr: s('ukr', 3, 0, 0, 3, 0, 5),
    }),
    group('D', ['tur', 'esp', 'cze', 'cro'], {
      cro: s('cro', 3, 2, 1, 0, 5, 3),
      esp: s('esp', 3, 2, 0, 1, 5, 2),
      tur: s('tur', 3, 1, 0, 2, 2, 4),
      cze: s('cze', 3, 0, 1, 2, 2, 5),
    }),
    group('E', ['bel', 'irl', 'ita', 'swe'], {
      bel: s('bel', 3, 2, 0, 1, 4, 2),
      ita: s('ita', 3, 2, 0, 1, 3, 1),
      irl: s('irl', 3, 1, 1, 1, 2, 4),
      swe: s('swe', 3, 0, 1, 2, 1, 3),
    }),
    group('F', ['aut', 'por', 'isl', 'hun'], {
      hun: s('hun', 3, 1, 2, 0, 6, 4),
      isl: s('isl', 3, 1, 2, 0, 4, 3),
      por: s('por', 3, 0, 3, 0, 4, 4),
      aut: s('aut', 3, 0, 1, 2, 1, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_2016.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  cro_por: 'por',
  pol_sui: 'pol',
  nir_wal: 'wal',
  fra_irl: 'fra',
  ger_svk: 'ger',
  bel_hun: 'bel',
  eng_isl: 'isl',
  esp_ita: 'ita',
  // Quarter-finals
  pol_por: 'por',
  bel_wal: 'wal',
  ger_ita: 'ger',
  fra_isl: 'fra',
  // Semi-finals
  por_wal: 'por',
  fra_ger: 'fra',
  // Final
  fra_por: 'por',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['cro', 'por'],
      ['sui', 'pol'],
    ],
    [
      ['wal', 'nir'],
      ['hun', 'bel'],
    ],
  ],
  [
    [
      ['ger', 'svk'],
      ['ita', 'esp'],
    ],
    [
      ['fra', 'irl'],
      ['eng', 'isl'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
