import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_2024: EuroYearData = {
  year: 2024,
  host: 'Germany',
  champion: 'Spain',
  runnerUp: 'England',
  available: false,
  teams: {
    alb: t('alb', 'Albania', 'al'),
    aut: t('aut', 'Austria', 'at'),
    bel: t('bel', 'Belgium', 'be'),
    cro: t('cro', 'Croatia', 'hr'),
    cze: t('cze', 'Czech Republic', 'cz'),
    den: t('den', 'Denmark', 'dk'),
    eng: t('eng', 'England', 'gb-eng'),
    esp: t('esp', 'Spain', 'es'),
    fra: t('fra', 'France', 'fr'),
    geo: t('geo', 'Georgia', 'ge'),
    ger: t('ger', 'Germany', 'de'),
    hun: t('hun', 'Hungary', 'hu'),
    ita: t('ita', 'Italy', 'it'),
    ned: t('ned', 'Netherlands', 'nl'),
    pol: t('pol', 'Poland', 'pl'),
    por: t('por', 'Portugal', 'pt'),
    rou: t('rou', 'Romania', 'ro'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    srb: t('srb', 'Serbia', 'rs'),
    sui: t('sui', 'Switzerland', 'ch'),
    svk: t('svk', 'Slovakia', 'sk'),
    svn: t('svn', 'Slovenia', 'si'),
    tur: t('tur', 'Turkey', 'tr'),
    ukr: t('ukr', 'Ukraine', 'ua'),
  },
  groups: [
    group('A', ['ger', 'hun', 'sco', 'sui'], {
      ger: s('ger', 3, 2, 1, 0, 8, 2),
      sui: s('sui', 3, 1, 2, 0, 5, 3),
      hun: s('hun', 3, 1, 0, 2, 2, 5),
      sco: s('sco', 3, 0, 1, 2, 2, 7),
    }),
    group('B', ['ita', 'esp', 'cro', 'alb'], {
      esp: s('esp', 3, 3, 0, 0, 5, 0),
      ita: s('ita', 3, 1, 1, 1, 3, 3),
      cro: s('cro', 3, 0, 2, 1, 3, 6),
      alb: s('alb', 3, 0, 1, 2, 3, 5),
    }),
    group('C', ['srb', 'svn', 'den', 'eng'], {
      eng: s('eng', 3, 1, 2, 0, 2, 1),
      svn: s('svn', 3, 0, 3, 0, 2, 2),
      den: s('den', 3, 0, 3, 0, 2, 2),
      srb: s('srb', 3, 0, 2, 1, 1, 2),
    }),
    group('D', ['pol', 'aut', 'ned', 'fra'], {
      aut: s('aut', 3, 2, 0, 1, 6, 4),
      fra: s('fra', 3, 1, 2, 0, 2, 1),
      ned: s('ned', 3, 1, 1, 1, 4, 4),
      pol: s('pol', 3, 0, 1, 2, 3, 6),
    }),
    group('E', ['bel', 'rou', 'svk', 'ukr'], {
      rou: s('rou', 3, 1, 1, 1, 4, 3),
      bel: s('bel', 3, 1, 1, 1, 2, 1),
      svk: s('svk', 3, 1, 1, 1, 3, 3),
      ukr: s('ukr', 3, 1, 1, 1, 2, 4),
    }),
    group('F', ['por', 'tur', 'geo', 'cze'], {
      por: s('por', 3, 2, 0, 1, 5, 3),
      tur: s('tur', 3, 2, 0, 1, 5, 5),
      geo: s('geo', 3, 1, 1, 1, 4, 4),
      cze: s('cze', 3, 0, 1, 2, 3, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_2024.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  den_ger: 'ger',
  ita_sui: 'sui',
  eng_svk: 'eng',
  esp_geo: 'esp',
  bel_fra: 'fra',
  por_svn: 'por',
  aut_tur: 'tur',
  ned_rou: 'ned',
  // Quarter-finals
  esp_ger: 'esp',
  fra_por: 'fra',
  eng_sui: 'eng',
  ned_tur: 'ned',
  // Semi-finals
  esp_fra: 'esp',
  eng_ned: 'eng',
  // Final
  eng_esp: 'esp',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['ger', 'den'],
      ['esp', 'geo'],
    ],
    [
      ['fra', 'bel'],
      ['por', 'svn'],
    ],
  ],
  [
    [
      ['sui', 'ita'],
      ['eng', 'svk'],
    ],
    [
      ['aut', 'tur'],
      ['rou', 'ned'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
