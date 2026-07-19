import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_2004: EuroYearData = {
  year: 2004,
  host: 'Portugal',
  champion: 'Greece',
  runnerUp: 'Portugal',
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
    gre: t('gre', 'Greece', 'gr'),
    ita: t('ita', 'Italy', 'it'),
    lva: t('lva', 'Latvia', 'lv'),
    ned: t('ned', 'Netherlands', 'nl'),
    por: t('por', 'Portugal', 'pt'),
    rus: t('rus', 'Russia', 'ru'),
    sui: t('sui', 'Switzerland', 'ch'),
    swe: t('swe', 'Sweden', 'se'),
  },
  groups: [
    group('A', ['por', 'esp', 'gre', 'rus'], {
      por: s('por', 3, 2, 0, 1, 4, 2),
      gre: s('gre', 3, 1, 1, 1, 4, 4),
      esp: s('esp', 3, 1, 1, 1, 2, 2),
      rus: s('rus', 3, 1, 0, 2, 2, 4),
    }),
    group('B', ['fra', 'sui', 'cro', 'eng'], {
      fra: s('fra', 3, 2, 1, 0, 7, 4),
      eng: s('eng', 3, 2, 0, 1, 8, 4),
      cro: s('cro', 3, 0, 2, 1, 4, 6),
      sui: s('sui', 3, 0, 1, 2, 1, 6),
    }),
    group('C', ['den', 'swe', 'bul', 'ita'], {
      swe: s('swe', 3, 1, 2, 0, 8, 3),
      den: s('den', 3, 1, 2, 0, 4, 2),
      ita: s('ita', 3, 1, 2, 0, 3, 2),
      bul: s('bul', 3, 0, 0, 3, 1, 9),
    }),
    group('D', ['cze', 'ger', 'lva', 'ned'], {
      cze: s('cze', 3, 3, 0, 0, 7, 4),
      ned: s('ned', 3, 1, 1, 1, 6, 4),
      ger: s('ger', 3, 0, 2, 1, 2, 3),
      lva: s('lva', 3, 0, 1, 2, 1, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_2004.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter-finals
  eng_por: 'por',
  fra_gre: 'gre',
  ned_swe: 'ned',
  cze_den: 'cze',
  // Semi-finals
  ned_por: 'por',
  cze_gre: 'gre',
  // Final
  gre_por: 'gre',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['por', 'eng'],
    ['swe', 'ned'],
  ],
  [
    ['fra', 'gre'],
    ['cze', 'den'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
