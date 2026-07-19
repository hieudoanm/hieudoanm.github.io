import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_1996: EuroYearData = {
  year: 1996,
  host: 'England',
  champion: 'Germany',
  runnerUp: 'Czech Republic',
  available: false,
  teams: {
    bul: t('bul', 'Bulgaria', 'bg'),
    cro: t('cro', 'Croatia', 'hr'),
    cze: t('cze', 'Czech Republic', 'cz'),
    den: t('den', 'Denmark', 'dk'),
    eng: t('eng', 'England', 'gb-eng'),
    esp: t('esp', 'Spain', 'es'),
    fra: t('fra', 'France', 'fr'),
    ger: t('ger', 'Germany', 'de'),
    ita: t('ita', 'Italy', 'it'),
    ned: t('ned', 'Netherlands', 'nl'),
    por: t('por', 'Portugal', 'pt'),
    rou: t('rou', 'Romania', 'ro'),
    rus: t('rus', 'Russia', 'ru'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    sui: t('sui', 'Switzerland', 'ch'),
    tur: t('tur', 'Turkey', 'tr'),
  },
  groups: [
    group('A', ['eng', 'ned', 'sui', 'sco'], {
      eng: s('eng', 3, 2, 1, 0, 7, 2),
      ned: s('ned', 3, 1, 1, 1, 3, 4),
      sco: s('sco', 3, 1, 1, 1, 1, 2),
      sui: s('sui', 3, 0, 1, 2, 1, 4),
    }),
    group('B', ['esp', 'rou', 'bul', 'fra'], {
      fra: s('fra', 3, 2, 1, 0, 5, 2),
      esp: s('esp', 3, 1, 2, 0, 4, 3),
      bul: s('bul', 3, 1, 1, 1, 3, 4),
      rou: s('rou', 3, 0, 0, 3, 1, 4),
    }),
    group('C', ['ger', 'ita', 'cze', 'rus'], {
      ger: s('ger', 3, 2, 1, 0, 5, 0),
      ita: s('ita', 3, 1, 1, 1, 3, 3),
      cze: s('cze', 3, 1, 1, 1, 5, 6),
      rus: s('rus', 3, 0, 1, 2, 4, 8),
    }),
    group('D', ['den', 'tur', 'por', 'cro'], {
      por: s('por', 3, 2, 1, 0, 5, 1),
      cro: s('cro', 3, 2, 0, 1, 4, 3),
      den: s('den', 3, 1, 1, 1, 4, 4),
      tur: s('tur', 3, 0, 0, 3, 0, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_1996.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter-finals
  eng_esp: 'eng',
  fra_ned: 'fra',
  cze_por: 'cze',
  cro_ger: 'ger',
  // Semi-finals
  eng_ger: 'ger',
  cze_fra: 'cze',
  // Final
  cze_ger: 'ger',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['eng', 'esp'],
    ['ger', 'cro'],
  ],
  [
    ['fra', 'ned'],
    ['cze', 'por'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
