import type { BracketRaw } from '../../pages/knock-out/types';
import type { KnockoutYearData, WorldCupYearData } from './types';
import { group, s, t, toKnockoutTeams } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 2006,
  host: 'Germany',
  champion: 'Italy',
  runnerUp: 'France',
  available: false,
  teams: {
    ger: t('ger', 'Germany', 'de'),
    ecu: t('ecu', 'Ecuador', 'ec'),
    pol: t('pol', 'Poland', 'pl'),
    cri: t('cri', 'Costa Rica', 'cr'),
    eng: t('eng', 'England', 'gb-eng'),
    swe: t('swe', 'Sweden', 'se'),
    par: t('par', 'Paraguay', 'py'),
    tri: t('tri', 'Trinidad & T.', 'tt'),
    arg: t('arg', 'Argentina', 'ar'),
    ned: t('ned', 'Netherlands', 'nl'),
    civ: t('civ', "Côte d'Ivoire", 'ci'),
    ser: t('ser', 'Serbia', 'rs'),
    mex: t('mex', 'Mexico', 'mx'),
    irn: t('irn', 'Iran', 'ir'),
    ang: t('ang', 'Angola', 'ao'),
    por: t('por', 'Portugal', 'pt'),
    ita: t('ita', 'Italy', 'it'),
    gha: t('gha', 'Ghana', 'gh'),
    cze: t('cze', 'Czech Republic', 'cz'),
    usa: t('usa', 'United States', 'us'),
    bra: t('bra', 'Brazil', 'br'),
    cro: t('cro', 'Croatia', 'hr'),
    aus: t('aus', 'Australia', 'au'),
    jpn: t('jpn', 'Japan', 'jp'),
    fra: t('fra', 'France', 'fr'),
    sui: t('sui', 'Switzerland', 'ch'),
    kor: t('kor', 'South Korea', 'kr'),
    tog: t('tog', 'Togo', 'tg'),
    esp: t('esp', 'Spain', 'es'),
    ukr: t('ukr', 'Ukraine', 'ua'),
    tun: t('tun', 'Tunisia', 'tn'),
    sau: t('sau', 'Saudi Arabia', 'sa'),
  },
  groups: [
    group('A', ['ger', 'ecu', 'pol', 'cri'], {
      ger: s('ger', 3, 3, 0, 0, 8, 2),
      ecu: s('ecu', 3, 2, 0, 1, 5, 3),
      pol: s('pol', 3, 1, 0, 2, 2, 4),
      cri: s('cri', 3, 0, 0, 3, 3, 9),
    }),
    group('B', ['eng', 'swe', 'par', 'tri'], {
      eng: s('eng', 3, 2, 1, 0, 5, 2),
      swe: s('swe', 3, 1, 2, 0, 3, 2),
      par: s('par', 3, 1, 0, 2, 2, 2),
      tri: s('tri', 3, 0, 1, 2, 0, 4),
    }),
    group('C', ['arg', 'ned', 'civ', 'ser'], {
      arg: s('arg', 3, 2, 1, 0, 8, 1),
      ned: s('ned', 3, 2, 1, 0, 3, 1),
      civ: s('civ', 3, 1, 0, 2, 5, 6),
      ser: s('ser', 3, 0, 0, 3, 2, 10),
    }),
    group('D', ['mex', 'irn', 'ang', 'por'], {
      mex: s('mex', 3, 1, 1, 1, 4, 3),
      irn: s('irn', 3, 0, 1, 2, 2, 6),
      ang: s('ang', 3, 0, 2, 1, 1, 2),
      por: s('por', 3, 3, 0, 0, 5, 1),
    }),
    group('E', ['ita', 'gha', 'cze', 'usa'], {
      ita: s('ita', 3, 2, 1, 0, 5, 1),
      gha: s('gha', 3, 2, 0, 1, 4, 3),
      cze: s('cze', 3, 1, 0, 2, 3, 4),
      usa: s('usa', 3, 0, 1, 2, 2, 6),
    }),
    group('F', ['bra', 'cro', 'aus', 'jpn'], {
      bra: s('bra', 3, 3, 0, 0, 7, 1),
      cro: s('cro', 3, 0, 2, 1, 2, 3),
      aus: s('aus', 3, 1, 1, 1, 5, 5),
      jpn: s('jpn', 3, 0, 1, 2, 2, 7),
    }),
    group('G', ['fra', 'sui', 'kor', 'tog'], {
      fra: s('fra', 3, 1, 2, 0, 3, 1),
      sui: s('sui', 3, 2, 1, 0, 4, 0),
      kor: s('kor', 3, 1, 1, 1, 3, 4),
      tog: s('tog', 3, 0, 0, 3, 1, 6),
    }),
    group('H', ['esp', 'ukr', 'tun', 'sau'], {
      esp: s('esp', 3, 3, 0, 0, 8, 1),
      ukr: s('ukr', 3, 2, 0, 1, 5, 4),
      tun: s('tun', 3, 0, 1, 2, 3, 6),
      sau: s('sau', 3, 0, 1, 2, 2, 7),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(WORLD_CUP.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  ger_swe: 'ger',
  arg_mex: 'arg',
  ecu_eng: 'eng',
  ned_por: 'por',
  aus_ita: 'ita',
  sui_ukr: 'ukr',
  bra_gha: 'bra',
  esp_fra: 'fra',
  // Quarter Final
  arg_ger: 'ger',
  ita_ukr: 'ita',
  eng_por: 'por',
  bra_fra: 'fra',
  // Semi Final
  ger_ita: 'ita',
  fra_por: 'fra',
  // Final
  fra_ita: 'ita',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['ger', 'swe'],
      ['arg', 'mex'],
    ],
    [
      ['ita', 'aus'],
      ['sui', 'ukr'],
    ],
  ],
  [
    [
      ['eng', 'ecu'],
      ['por', 'ned'],
    ],
    [
      ['bra', 'gha'],
      ['esp', 'fra'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
