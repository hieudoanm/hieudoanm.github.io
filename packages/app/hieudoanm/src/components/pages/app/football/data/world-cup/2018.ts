import type { BracketRaw } from '../../pages/knock-out/types';
import type { KnockoutYearData, WorldCupYearData } from './types';
import { group, s, t, toKnockoutTeams } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 2018,
  host: 'Russia',
  champion: 'France',
  runnerUp: 'Croatia',
  available: false,
  teams: {
    rus: t('rus', 'Russia', 'ru'),
    sau: t('sau', 'Saudi Arabia', 'sa'),
    egy: t('egy', 'Egypt', 'eg'),
    uru: t('uru', 'Uruguay', 'uy'),
    por: t('por', 'Portugal', 'pt'),
    esp: t('esp', 'Spain', 'es'),
    mar: t('mar', 'Morocco', 'ma'),
    irn: t('irn', 'Iran', 'ir'),
    fra: t('fra', 'France', 'fr'),
    aus: t('aus', 'Australia', 'au'),
    per: t('per', 'Peru', 'pe'),
    den: t('den', 'Denmark', 'dk'),
    arg: t('arg', 'Argentina', 'ar'),
    ice: t('ice', 'Iceland', 'is'),
    cro: t('cro', 'Croatia', 'hr'),
    nig: t('nig', 'Nigeria', 'ng'),
    bra: t('bra', 'Brazil', 'br'),
    sui: t('sui', 'Switzerland', 'ch'),
    cri: t('cri', 'Costa Rica', 'cr'),
    ser: t('ser', 'Serbia', 'rs'),
    ger: t('ger', 'Germany', 'de'),
    mex: t('mex', 'Mexico', 'mx'),
    swe: t('swe', 'Sweden', 'se'),
    kor: t('kor', 'South Korea', 'kr'),
    bel: t('bel', 'Belgium', 'be'),
    pan: t('pan', 'Panama', 'pa'),
    tun: t('tun', 'Tunisia', 'tn'),
    eng: t('eng', 'England', 'gb-eng'),
    col: t('col', 'Colombia', 'co'),
    jpn: t('jpn', 'Japan', 'jp'),
    pol: t('pol', 'Poland', 'pl'),
    sen: t('sen', 'Senegal', 'sn'),
  },
  groups: [
    group('A', ['rus', 'sau', 'egy', 'uru'], {
      rus: s('rus', 3, 2, 0, 1, 8, 4),
      sau: s('sau', 3, 1, 0, 2, 2, 7),
      egy: s('egy', 3, 0, 0, 3, 2, 6),
      uru: s('uru', 3, 3, 0, 0, 5, 0),
    }),
    group('B', ['por', 'esp', 'mar', 'irn'], {
      por: s('por', 3, 1, 2, 0, 5, 4),
      esp: s('esp', 3, 1, 2, 0, 6, 5),
      mar: s('mar', 3, 0, 1, 2, 2, 4),
      irn: s('irn', 3, 1, 1, 1, 2, 2),
    }),
    group('C', ['fra', 'aus', 'per', 'den'], {
      fra: s('fra', 3, 2, 1, 0, 3, 1),
      aus: s('aus', 3, 0, 1, 2, 2, 5),
      per: s('per', 3, 1, 0, 2, 2, 2),
      den: s('den', 3, 1, 2, 0, 2, 1),
    }),
    group('D', ['arg', 'ice', 'cro', 'nig'], {
      arg: s('arg', 3, 1, 1, 1, 3, 5),
      ice: s('ice', 3, 0, 1, 2, 2, 5),
      cro: s('cro', 3, 3, 0, 0, 7, 1),
      nig: s('nig', 3, 1, 0, 2, 3, 4),
    }),
    group('E', ['bra', 'sui', 'cri', 'ser'], {
      bra: s('bra', 3, 2, 1, 0, 5, 1),
      sui: s('sui', 3, 1, 2, 0, 5, 4),
      cri: s('cri', 3, 0, 1, 2, 2, 5),
      ser: s('ser', 3, 1, 0, 2, 2, 4),
    }),
    group('F', ['ger', 'mex', 'swe', 'kor'], {
      ger: s('ger', 3, 1, 0, 2, 2, 4),
      mex: s('mex', 3, 2, 0, 1, 3, 4),
      swe: s('swe', 3, 2, 0, 1, 5, 2),
      kor: s('kor', 3, 1, 0, 2, 3, 3),
    }),
    group('G', ['bel', 'pan', 'tun', 'eng'], {
      bel: s('bel', 3, 3, 0, 0, 9, 2),
      pan: s('pan', 3, 0, 0, 3, 2, 11),
      tun: s('tun', 3, 1, 0, 2, 5, 8),
      eng: s('eng', 3, 2, 0, 1, 8, 3),
    }),
    group('H', ['col', 'jpn', 'pol', 'sen'], {
      col: s('col', 3, 2, 0, 1, 5, 2),
      jpn: s('jpn', 3, 1, 1, 1, 4, 4),
      pol: s('pol', 3, 1, 0, 2, 2, 5),
      sen: s('sen', 3, 1, 1, 1, 4, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(WORLD_CUP.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  arg_fra: 'fra',
  por_uru: 'uru',
  esp_rus: 'rus',
  cro_den: 'cro',
  bra_mex: 'bra',
  bel_jpn: 'bel',
  sui_swe: 'swe',
  col_eng: 'eng',
  // Quarter Final
  fra_uru: 'fra',
  bel_bra: 'bel',
  eng_swe: 'eng',
  cro_rus: 'cro',
  // Semi Final
  bel_fra: 'fra',
  cro_eng: 'cro',
  // Final
  cro_fra: 'fra',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['uru', 'por'],
      ['fra', 'arg'],
    ],
    [
      ['bra', 'mex'],
      ['bel', 'jpn'],
    ],
  ],
  [
    [
      ['esp', 'rus'],
      ['cro', 'den'],
    ],
    [
      ['swe', 'sui'],
      ['col', 'eng'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
