import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_2000: EuroYearData = {
  year: 2000,
  host: 'Belgium',
  champion: 'France',
  runnerUp: 'Italy',
  available: false,
  teams: {
    bel: t('bel', 'Belgium', 'be'),
    cze: t('cze', 'Czech Republic', 'cz'),
    den: t('den', 'Denmark', 'dk'),
    eng: t('eng', 'England', 'gb-eng'),
    esp: t('esp', 'Spain', 'es'),
    fra: t('fra', 'France', 'fr'),
    ger: t('ger', 'Germany', 'de'),
    ita: t('ita', 'Italy', 'it'),
    ned: t('ned', 'Netherlands', 'nl'),
    nor: t('nor', 'Norway', 'no'),
    por: t('por', 'Portugal', 'pt'),
    rou: t('rou', 'Romania', 'ro'),
    srb: t('srb', 'Serbia', 'rs'),
    svn: t('svn', 'Slovenia', 'si'),
    swe: t('swe', 'Sweden', 'se'),
    tur: t('tur', 'Turkey', 'tr'),
  },
  groups: [
    group('A', ['ger', 'por', 'eng', 'rou'], {
      por: s('por', 3, 3, 0, 0, 7, 2),
      rou: s('rou', 3, 1, 1, 1, 4, 4),
      eng: s('eng', 3, 1, 0, 2, 5, 6),
      ger: s('ger', 3, 0, 1, 2, 1, 5),
    }),
    group('B', ['bel', 'tur', 'swe', 'ita'], {
      ita: s('ita', 3, 3, 0, 0, 6, 2),
      tur: s('tur', 3, 1, 1, 1, 3, 2),
      bel: s('bel', 3, 1, 0, 2, 2, 5),
      swe: s('swe', 3, 0, 1, 2, 2, 4),
    }),
    group('C', ['srb', 'esp', 'nor', 'svn'], {
      esp: s('esp', 3, 2, 0, 1, 6, 5),
      srb: s('srb', 3, 1, 1, 1, 7, 7),
      nor: s('nor', 3, 1, 1, 1, 1, 1),
      svn: s('svn', 3, 0, 2, 1, 4, 5),
    }),
    group('D', ['fra', 'ned', 'cze', 'den'], {
      ned: s('ned', 3, 3, 0, 0, 7, 2),
      fra: s('fra', 3, 2, 0, 1, 7, 4),
      cze: s('cze', 3, 1, 0, 2, 3, 3),
      den: s('den', 3, 0, 0, 3, 0, 8),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_2000.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter-finals
  ita_rou: 'ita',
  por_tur: 'por',
  ned_srb: 'ned',
  esp_fra: 'fra',
  // Semi-finals
  fra_por: 'fra',
  ita_ned: 'ita',
  // Final
  fra_ita: 'fra',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['tur', 'por'],
    ['esp', 'fra'],
  ],
  [
    ['ita', 'rou'],
    ['ned', 'srb'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
