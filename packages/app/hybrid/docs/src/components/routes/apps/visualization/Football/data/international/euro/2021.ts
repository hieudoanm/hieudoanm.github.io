import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_2021: EuroYearData = {
  year: 2021,
  host: 'Europe',
  champion: 'Italy',
  runnerUp: 'England',
  available: false,
  teams: {
    aut: t('aut', 'Austria', 'at'),
    bel: t('bel', 'Belgium', 'be'),
    cro: t('cro', 'Croatia', 'hr'),
    cze: t('cze', 'Czech Republic', 'cz'),
    den: t('den', 'Denmark', 'dk'),
    eng: t('eng', 'England', 'gb-eng'),
    esp: t('esp', 'Spain', 'es'),
    fin: t('fin', 'Finland', 'fi'),
    fra: t('fra', 'France', 'fr'),
    ger: t('ger', 'Germany', 'de'),
    hun: t('hun', 'Hungary', 'hu'),
    ita: t('ita', 'Italy', 'it'),
    mkd: t('mkd', 'North Macedonia', 'mk'),
    ned: t('ned', 'Netherlands', 'nl'),
    pol: t('pol', 'Poland', 'pl'),
    por: t('por', 'Portugal', 'pt'),
    rus: t('rus', 'Russia', 'ru'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    sui: t('sui', 'Switzerland', 'ch'),
    svk: t('svk', 'Slovakia', 'sk'),
    swe: t('swe', 'Sweden', 'se'),
    tur: t('tur', 'Turkey', 'tr'),
    ukr: t('ukr', 'Ukraine', 'ua'),
    wal: t('wal', 'Wales', 'gb-wls'),
  },
  groups: [
    group('A', ['ita', 'wal', 'tur', 'sui'], {
      ita: s('ita', 3, 3, 0, 0, 7, 0),
      wal: s('wal', 3, 1, 1, 1, 3, 2),
      sui: s('sui', 3, 1, 1, 1, 4, 5),
      tur: s('tur', 3, 0, 0, 3, 1, 8),
    }),
    group('B', ['den', 'rus', 'fin', 'bel'], {
      bel: s('bel', 3, 3, 0, 0, 7, 1),
      den: s('den', 3, 1, 0, 2, 5, 4),
      fin: s('fin', 3, 1, 0, 2, 1, 3),
      rus: s('rus', 3, 1, 0, 2, 2, 7),
    }),
    group('C', ['aut', 'ned', 'ukr', 'mkd'], {
      ned: s('ned', 3, 3, 0, 0, 8, 2),
      aut: s('aut', 3, 2, 0, 1, 4, 3),
      ukr: s('ukr', 3, 1, 0, 2, 4, 5),
      mkd: s('mkd', 3, 0, 0, 3, 2, 8),
    }),
    group('D', ['eng', 'sco', 'cro', 'cze'], {
      eng: s('eng', 3, 2, 1, 0, 2, 0),
      cro: s('cro', 3, 1, 1, 1, 4, 3),
      cze: s('cze', 3, 1, 1, 1, 3, 2),
      sco: s('sco', 3, 0, 1, 2, 1, 5),
    }),
    group('E', ['pol', 'esp', 'swe', 'svk'], {
      swe: s('swe', 3, 2, 1, 0, 4, 2),
      esp: s('esp', 3, 1, 2, 0, 6, 1),
      svk: s('svk', 3, 1, 0, 2, 2, 7),
      pol: s('pol', 3, 0, 1, 2, 4, 6),
    }),
    group('F', ['ger', 'hun', 'por', 'fra'], {
      fra: s('fra', 3, 1, 2, 0, 4, 3),
      por: s('por', 3, 1, 1, 1, 7, 6),
      ger: s('ger', 3, 1, 1, 1, 6, 5),
      hun: s('hun', 3, 0, 2, 1, 3, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_2021.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  aut_ita: 'ita',
  den_wal: 'den',
  bel_por: 'bel',
  cze_ned: 'cze',
  cro_esp: 'esp',
  fra_sui: 'sui',
  eng_ger: 'eng',
  swe_ukr: 'ukr',
  // Quarter-finals
  bel_ita: 'ita',
  esp_sui: 'esp',
  cze_den: 'den',
  eng_ukr: 'eng',
  // Semi-finals
  esp_ita: 'ita',
  den_eng: 'eng',
  // Final
  eng_ita: 'ita',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['ita', 'aut'],
      ['bel', 'por'],
    ],
    [
      ['cro', 'esp'],
      ['fra', 'sui'],
    ],
  ],
  [
    [
      ['wal', 'den'],
      ['ned', 'cze'],
    ],
    [
      ['eng', 'ger'],
      ['swe', 'ukr'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
