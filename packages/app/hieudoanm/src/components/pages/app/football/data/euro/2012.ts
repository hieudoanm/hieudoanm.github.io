import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_2012: EuroYearData = {
  year: 2012,
  host: 'Poland',
  champion: 'Spain',
  runnerUp: 'Italy',
  available: false,
  teams: {
    cro: t('cro', 'Croatia', 'hr'),
    cze: t('cze', 'Czech Republic', 'cz'),
    den: t('den', 'Denmark', 'dk'),
    eng: t('eng', 'England', 'gb-eng'),
    esp: t('esp', 'Spain', 'es'),
    fra: t('fra', 'France', 'fr'),
    ger: t('ger', 'Germany', 'de'),
    gre: t('gre', 'Greece', 'gr'),
    irl: t('irl', 'Republic of Ireland', 'ie'),
    ita: t('ita', 'Italy', 'it'),
    ned: t('ned', 'Netherlands', 'nl'),
    pol: t('pol', 'Poland', 'pl'),
    por: t('por', 'Portugal', 'pt'),
    rus: t('rus', 'Russia', 'ru'),
    swe: t('swe', 'Sweden', 'se'),
    ukr: t('ukr', 'Ukraine', 'ua'),
  },
  groups: [
    group('A', ['pol', 'rus', 'gre', 'cze'], {
      cze: s('cze', 3, 2, 0, 1, 4, 5),
      rus: s('rus', 3, 1, 1, 1, 5, 3),
      gre: s('gre', 3, 1, 1, 1, 3, 3),
      pol: s('pol', 3, 0, 2, 1, 2, 3),
    }),
    group('B', ['ger', 'ned', 'den', 'por'], {
      ger: s('ger', 3, 3, 0, 0, 5, 2),
      por: s('por', 3, 2, 0, 1, 5, 4),
      den: s('den', 3, 1, 0, 2, 4, 5),
      ned: s('ned', 3, 0, 0, 3, 2, 5),
    }),
    group('C', ['irl', 'esp', 'ita', 'cro'], {
      esp: s('esp', 3, 2, 1, 0, 6, 1),
      ita: s('ita', 3, 1, 2, 0, 4, 2),
      cro: s('cro', 3, 1, 1, 1, 4, 3),
      irl: s('irl', 3, 0, 0, 3, 1, 9),
    }),
    group('D', ['fra', 'ukr', 'swe', 'eng'], {
      eng: s('eng', 3, 2, 1, 0, 5, 3),
      fra: s('fra', 3, 1, 1, 1, 3, 3),
      swe: s('swe', 3, 1, 0, 2, 5, 5),
      ukr: s('ukr', 3, 1, 0, 2, 2, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_2012.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter-finals
  cze_por: 'por',
  ger_gre: 'ger',
  esp_fra: 'esp',
  eng_ita: 'ita',
  // Semi-finals
  esp_por: 'esp',
  ger_ita: 'ita',
  // Final
  esp_ita: 'esp',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['cze', 'por'],
    ['esp', 'fra'],
  ],
  [
    ['ger', 'gre'],
    ['eng', 'ita'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
