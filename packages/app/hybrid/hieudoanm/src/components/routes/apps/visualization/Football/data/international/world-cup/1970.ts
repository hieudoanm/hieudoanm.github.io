import { t, group, toKnockoutTeams, s } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1970,
  host: 'Mexico',
  champion: 'Brazil',
  runnerUp: 'Italy',
  available: false,
  teams: {
    mex: t('mex', 'Mexico', 'mx'),
    urs: t('urs', 'Soviet Union', 'ru'),
    bel: t('bel', 'Belgium', 'be'),
    slv: t('slv', 'El Salvador', 'sv'),
    ita: t('ita', 'Italy', 'it'),
    uru: t('uru', 'Uruguay', 'uy'),
    swe: t('swe', 'Sweden', 'se'),
    isr: t('isr', 'Israel', 'il'),
    bra: t('bra', 'Brazil', 'br'),
    eng: t('eng', 'England', 'gb-eng'),
    rom: t('rom', 'Romania', 'ro'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
    frg: t('frg', 'West Germany', 'de'),
    per: t('per', 'Peru', 'pe'),
    bul: t('bul', 'Bulgaria', 'bg'),
    mar: t('mar', 'Morocco', 'ma'),
  },
  groups: [
    group('1', ['mex', 'urs', 'bel', 'slv'], {
      mex: s('mex', 3, 2, 1, 0, 5, 0),
      urs: s('urs', 3, 2, 1, 0, 6, 1),
      bel: s('bel', 3, 1, 0, 2, 4, 5),
      slv: s('slv', 3, 0, 0, 3, 0, 9),
    }),
    group('2', ['ita', 'uru', 'swe', 'isr'], {
      ita: s('ita', 3, 1, 2, 0, 1, 0),
      uru: s('uru', 3, 1, 1, 1, 2, 1),
      swe: s('swe', 3, 1, 1, 1, 2, 2),
      isr: s('isr', 3, 0, 2, 1, 1, 3),
    }),
    group('3', ['bra', 'eng', 'rom', 'tch'], {
      bra: s('bra', 3, 3, 0, 0, 8, 3),
      eng: s('eng', 3, 2, 0, 1, 2, 1),
      rom: s('rom', 3, 1, 0, 2, 4, 5),
      tch: s('tch', 3, 0, 0, 3, 2, 7),
    }),
    group('4', ['frg', 'per', 'bul', 'mar'], {
      frg: s('frg', 3, 3, 0, 0, 10, 4),
      per: s('per', 3, 2, 0, 1, 7, 5),
      bul: s('bul', 3, 0, 1, 2, 5, 9),
      mar: s('mar', 3, 0, 1, 2, 2, 6),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = [
  [
    ['urs', 'uru'],
    ['bra', 'per'],
  ],
  [
    ['ita', 'mex'],
    ['frg', 'eng'],
  ],
];

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  bra_per: 'bra',
  eng_frg: 'frg',
  ita_mex: 'ita',
  urs_uru: 'uru',
  // Semi Final
  bra_uru: 'bra',
  frg_ita: 'ita',
  // Final
  bra_ita: 'bra',
  // Third Place
  frg_uru: 'frg',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
