import type { BracketRaw } from '../../../pages/knock-out/types';
import type { KnockoutYearData, WorldCupYearData } from './types';
import { group, s, t, toKnockoutTeams } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 2010,
  host: 'South Africa',
  champion: 'Spain',
  runnerUp: 'Netherlands',
  available: false,
  teams: {
    rsa: t('rsa', 'South Africa', 'za'),
    uru: t('uru', 'Uruguay', 'uy'),
    mex: t('mex', 'Mexico', 'mx'),
    fra: t('fra', 'France', 'fr'),
    arg: t('arg', 'Argentina', 'ar'),
    kor: t('kor', 'South Korea', 'kr'),
    gre: t('gre', 'Greece', 'gr'),
    nig: t('nig', 'Nigeria', 'ng'),
    eng: t('eng', 'England', 'gb-eng'),
    usa: t('usa', 'United States', 'us'),
    slo: t('slo', 'Slovenia', 'si'),
    alg: t('alg', 'Algeria', 'dz'),
    ger: t('ger', 'Germany', 'de'),
    aus: t('aus', 'Australia', 'au'),
    ser: t('ser', 'Serbia', 'rs'),
    gha: t('gha', 'Ghana', 'gh'),
    ned: t('ned', 'Netherlands', 'nl'),
    jpn: t('jpn', 'Japan', 'jp'),
    cam: t('cam', 'Cameroon', 'cm'),
    den: t('den', 'Denmark', 'dk'),
    ita: t('ita', 'Italy', 'it'),
    par: t('par', 'Paraguay', 'py'),
    nzl: t('nzl', 'New Zealand', 'nz'),
    svk: t('svk', 'Slovakia', 'sk'),
    bra: t('bra', 'Brazil', 'br'),
    prk: t('prk', 'North Korea', 'kp'),
    civ: t('civ', "Côte d'Ivoire", 'ci'),
    por: t('por', 'Portugal', 'pt'),
    esp: t('esp', 'Spain', 'es'),
    sui: t('sui', 'Switzerland', 'ch'),
    hon: t('hon', 'Honduras', 'hn'),
    chi: t('chi', 'Chile', 'cl'),
  },
  groups: [
    group('A', ['rsa', 'uru', 'mex', 'fra'], {
      rsa: s('rsa', 3, 1, 1, 1, 3, 5),
      uru: s('uru', 3, 2, 1, 0, 4, 0),
      mex: s('mex', 3, 1, 1, 1, 3, 2),
      fra: s('fra', 3, 0, 1, 2, 1, 4),
    }),
    group('B', ['arg', 'kor', 'gre', 'nig'], {
      arg: s('arg', 3, 3, 0, 0, 7, 1),
      kor: s('kor', 3, 1, 1, 1, 5, 6),
      gre: s('gre', 3, 1, 0, 2, 2, 5),
      nig: s('nig', 3, 0, 1, 2, 3, 5),
    }),
    group('C', ['eng', 'usa', 'slo', 'alg'], {
      eng: s('eng', 3, 1, 2, 0, 2, 1),
      usa: s('usa', 3, 1, 2, 0, 4, 3),
      slo: s('slo', 3, 1, 1, 1, 3, 3),
      alg: s('alg', 3, 0, 1, 2, 0, 2),
    }),
    group('D', ['ger', 'aus', 'ser', 'gha'], {
      ger: s('ger', 3, 2, 0, 1, 5, 1),
      aus: s('aus', 3, 1, 1, 1, 3, 6),
      ser: s('ser', 3, 1, 0, 2, 2, 3),
      gha: s('gha', 3, 1, 1, 1, 2, 2),
    }),
    group('E', ['ned', 'jpn', 'cam', 'den'], {
      ned: s('ned', 3, 3, 0, 0, 5, 1),
      jpn: s('jpn', 3, 2, 0, 1, 4, 2),
      cam: s('cam', 3, 0, 0, 3, 2, 5),
      den: s('den', 3, 1, 0, 2, 3, 6),
    }),
    group('F', ['ita', 'par', 'nzl', 'svk'], {
      ita: s('ita', 3, 0, 2, 1, 4, 5),
      par: s('par', 3, 1, 2, 0, 3, 1),
      nzl: s('nzl', 3, 0, 3, 0, 2, 2),
      svk: s('svk', 3, 1, 1, 1, 4, 5),
    }),
    group('G', ['bra', 'prk', 'civ', 'por'], {
      bra: s('bra', 3, 2, 1, 0, 5, 2),
      prk: s('prk', 3, 0, 0, 3, 1, 12),
      civ: s('civ', 3, 1, 1, 1, 4, 3),
      por: s('por', 3, 1, 2, 0, 7, 0),
    }),
    group('H', ['esp', 'sui', 'hon', 'chi'], {
      esp: s('esp', 3, 2, 0, 1, 4, 2),
      sui: s('sui', 3, 1, 1, 1, 1, 1),
      hon: s('hon', 3, 0, 1, 2, 0, 3),
      chi: s('chi', 3, 2, 0, 1, 3, 2),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(WORLD_CUP.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  kor_uru: 'uru',
  gha_usa: 'gha',
  arg_mex: 'arg',
  eng_ger: 'ger',
  ned_svk: 'ned',
  bra_chi: 'bra',
  jpn_par: 'par',
  esp_por: 'esp',
  // Quarter Final
  gha_uru: 'uru',
  arg_ger: 'ger',
  bra_ned: 'ned',
  esp_par: 'esp',
  // Semi Final
  ned_uru: 'ned',
  esp_ger: 'esp',
  // Final
  esp_ned: 'esp',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['uru', 'kor'],
      ['usa', 'gha'],
    ],
    [
      ['ned', 'svk'],
      ['bra', 'chi'],
    ],
  ],
  [
    [
      ['ger', 'eng'],
      ['arg', 'mex'],
    ],
    [
      ['par', 'jpn'],
      ['esp', 'por'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
