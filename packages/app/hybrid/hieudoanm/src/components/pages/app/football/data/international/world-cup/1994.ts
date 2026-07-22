import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1994,
  host: 'USA',
  champion: 'Brazil',
  runnerUp: 'Italy',
  available: false,
  teams: {
    usa: t('usa', 'United States', 'us'),
    sui: t('sui', 'Switzerland', 'ch'),
    col: t('col', 'Colombia', 'co'),
    rom: t('rom', 'Romania', 'ro'),
    bra: t('bra', 'Brazil', 'br'),
    rus: t('rus', 'Russia', 'ru'),
    cam: t('cam', 'Cameroon', 'cm'),
    swe: t('swe', 'Sweden', 'se'),
    ger: t('ger', 'Germany', 'de'),
    bol: t('bol', 'Bolivia', 'bo'),
    esp: t('esp', 'Spain', 'es'),
    kor: t('kor', 'South Korea', 'kr'),
    arg: t('arg', 'Argentina', 'ar'),
    nig: t('nig', 'Nigeria', 'ng'),
    bul: t('bul', 'Bulgaria', 'bg'),
    gre: t('gre', 'Greece', 'gr'),
    mex: t('mex', 'Mexico', 'mx'),
    irl: t('irl', 'Ireland', 'ie'),
    ita: t('ita', 'Italy', 'it'),
    nor: t('nor', 'Norway', 'no'),
    ned: t('ned', 'Netherlands', 'nl'),
    sau: t('sau', 'Saudi Arabia', 'sa'),
    bel: t('bel', 'Belgium', 'be'),
    mar: t('mar', 'Morocco', 'ma'),
  },
  groups: [
    group('A', ['usa', 'sui', 'col', 'rom'], {
      usa: s('usa', 3, 1, 1, 1, 3, 3),
      sui: s('sui', 3, 1, 1, 1, 5, 4),
      col: s('col', 3, 1, 0, 2, 4, 5),
      rom: s('rom', 3, 2, 0, 1, 5, 5),
    }),
    group('B', ['bra', 'rus', 'cam', 'swe'], {
      bra: s('bra', 3, 2, 1, 0, 6, 1),
      rus: s('rus', 3, 1, 0, 2, 7, 6),
      cam: s('cam', 3, 0, 1, 2, 3, 11),
      swe: s('swe', 3, 1, 2, 0, 6, 4),
    }),
    group('C', ['ger', 'bol', 'esp', 'kor'], {
      ger: s('ger', 3, 2, 1, 0, 5, 3),
      bol: s('bol', 3, 0, 1, 2, 1, 4),
      esp: s('esp', 3, 1, 2, 0, 6, 4),
      kor: s('kor', 3, 0, 2, 1, 4, 5),
    }),
    group('D', ['arg', 'nig', 'bul', 'gre'], {
      arg: s('arg', 3, 2, 0, 1, 6, 3),
      nig: s('nig', 3, 2, 0, 1, 6, 2),
      bul: s('bul', 3, 2, 0, 1, 6, 3),
      gre: s('gre', 3, 0, 0, 3, 0, 10),
    }),
    group('E', ['mex', 'irl', 'ita', 'nor'], {
      mex: s('mex', 3, 1, 1, 1, 3, 3),
      irl: s('irl', 3, 1, 1, 1, 2, 2),
      ita: s('ita', 3, 1, 1, 1, 2, 2),
      nor: s('nor', 3, 1, 1, 1, 1, 1),
    }),
    group('F', ['ned', 'sau', 'bel', 'mar'], {
      ned: s('ned', 3, 2, 0, 1, 4, 3),
      sau: s('sau', 3, 2, 0, 1, 4, 3),
      bel: s('bel', 3, 2, 0, 1, 2, 1),
      mar: s('mar', 3, 0, 0, 3, 2, 5),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(WORLD_CUP.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  bel_ger: 'ger',
  esp_sui: 'esp',
  sau_swe: 'swe',
  arg_rom: 'rom',
  irl_ned: 'ned',
  bra_usa: 'bra',
  ita_nig: 'ita',
  bul_mex: 'bul',
  // Quarter Final
  bra_ned: 'bra',
  bul_ger: 'bul',
  rom_swe: 'swe',
  esp_ita: 'ita',
  // Semi Final
  bra_swe: 'bra',
  bul_ita: 'ita',
  // Final
  bra_ita: 'bra',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['rom', 'arg'],
      ['sau', 'swe'],
    ],
    [
      ['ned', 'irl'],
      ['bra', 'usa'],
    ],
  ],
  [
    [
      ['nig', 'ita'],
      ['esp', 'sui'],
    ],
    [
      ['mex', 'bul'],
      ['ger', 'bel'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
