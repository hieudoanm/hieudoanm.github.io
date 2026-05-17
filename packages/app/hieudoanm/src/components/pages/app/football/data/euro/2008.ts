import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_2008: EuroYearData = {
  year: 2008,
  host: 'Austria',
  champion: 'Spain',
  runnerUp: 'Germany',
  available: false,
  teams: {
    aut: t('aut', 'Austria', 'at'),
    cro: t('cro', 'Croatia', 'hr'),
    cze: t('cze', 'Czech Republic', 'cz'),
    esp: t('esp', 'Spain', 'es'),
    fra: t('fra', 'France', 'fr'),
    ger: t('ger', 'Germany', 'de'),
    gre: t('gre', 'Greece', 'gr'),
    ita: t('ita', 'Italy', 'it'),
    ned: t('ned', 'Netherlands', 'nl'),
    pol: t('pol', 'Poland', 'pl'),
    por: t('por', 'Portugal', 'pt'),
    rou: t('rou', 'Romania', 'ro'),
    rus: t('rus', 'Russia', 'ru'),
    sui: t('sui', 'Switzerland', 'ch'),
    swe: t('swe', 'Sweden', 'se'),
    tur: t('tur', 'Turkey', 'tr'),
  },
  groups: [
    group('A', ['por', 'sui', 'cze', 'tur'], {
      por: s('por', 3, 2, 0, 1, 5, 3),
      tur: s('tur', 3, 2, 0, 1, 5, 5),
      sui: s('sui', 3, 1, 0, 2, 3, 3),
      cze: s('cze', 3, 1, 0, 2, 4, 6),
    }),
    group('B', ['aut', 'ger', 'cro', 'pol'], {
      cro: s('cro', 3, 3, 0, 0, 4, 1),
      ger: s('ger', 3, 2, 0, 1, 4, 2),
      aut: s('aut', 3, 0, 1, 2, 1, 3),
      pol: s('pol', 3, 0, 1, 2, 1, 4),
    }),
    group('C', ['ned', 'rou', 'ita', 'fra'], {
      ned: s('ned', 3, 3, 0, 0, 9, 1),
      ita: s('ita', 3, 1, 1, 1, 3, 4),
      rou: s('rou', 3, 0, 2, 1, 1, 3),
      fra: s('fra', 3, 0, 1, 2, 1, 6),
    }),
    group('D', ['gre', 'esp', 'swe', 'rus'], {
      esp: s('esp', 3, 3, 0, 0, 8, 3),
      rus: s('rus', 3, 2, 0, 1, 4, 4),
      swe: s('swe', 3, 1, 0, 2, 3, 4),
      gre: s('gre', 3, 0, 0, 3, 1, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_2008.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter-finals
  ger_por: 'ger',
  cro_tur: 'tur',
  ned_rus: 'rus',
  esp_ita: 'esp',
  // Semi-finals
  ger_tur: 'ger',
  esp_rus: 'esp',
  // Final
  esp_ger: 'esp',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['por', 'ger'],
    ['cro', 'tur'],
  ],
  [
    ['ned', 'rus'],
    ['esp', 'ita'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
