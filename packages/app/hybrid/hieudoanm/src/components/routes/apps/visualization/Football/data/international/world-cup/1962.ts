import { t, group, toKnockoutTeams, s } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1962,
  host: 'Chile',
  champion: 'Brazil',
  runnerUp: 'Czechoslovakia',
  available: false,
  teams: {
    uru: t('uru', 'Uruguay', 'uy'),
    col: t('col', 'Colombia', 'co'),
    urs: t('urs', 'Soviet Union', 'ru'),
    yug: t('yug', 'Yugoslavia', 'rs'),
    chi: t('chi', 'Chile', 'cl'),
    ita: t('ita', 'Italy', 'it'),
    sui: t('sui', 'Switzerland', 'ch'),
    frg: t('frg', 'West Germany', 'de'),
    bra: t('bra', 'Brazil', 'br'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
    mex: t('mex', 'Mexico', 'mx'),
    esp: t('esp', 'Spain', 'es'),
    hun: t('hun', 'Hungary', 'hu'),
    eng: t('eng', 'England', 'gb-eng'),
    arg: t('arg', 'Argentina', 'ar'),
    bul: t('bul', 'Bulgaria', 'bg'),
  },
  groups: [
    group('1', ['uru', 'col', 'urs', 'yug'], {
      uru: s('uru', 3, 1, 0, 2, 4, 6),
      col: s('col', 3, 0, 1, 2, 5, 11),
      urs: s('urs', 3, 2, 1, 0, 8, 5),
      yug: s('yug', 3, 2, 0, 1, 8, 3),
    }),
    group('2', ['chi', 'ita', 'sui', 'frg'], {
      chi: s('chi', 3, 2, 0, 1, 5, 3),
      ita: s('ita', 3, 1, 1, 1, 3, 2),
      sui: s('sui', 3, 0, 0, 3, 2, 8),
      frg: s('frg', 3, 2, 1, 0, 4, 1),
    }),
    group('3', ['bra', 'tch', 'mex', 'esp'], {
      bra: s('bra', 3, 2, 1, 0, 4, 1),
      tch: s('tch', 3, 1, 1, 1, 2, 3),
      mex: s('mex', 3, 1, 0, 2, 3, 4),
      esp: s('esp', 3, 1, 0, 2, 2, 3),
    }),
    group('4', ['hun', 'eng', 'arg', 'bul'], {
      hun: s('hun', 3, 2, 1, 0, 8, 2),
      eng: s('eng', 3, 1, 1, 1, 4, 3),
      arg: s('arg', 3, 1, 1, 1, 2, 3),
      bul: s('bul', 3, 0, 1, 2, 1, 7),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = [
  [
    ['chi', 'urs'],
    ['bra', 'eng'],
  ],
  [
    ['hun', 'tch'],
    ['frg', 'yug'],
  ],
];

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  bra_eng: 'bra',
  chi_urs: 'chi',
  hun_tch: 'tch',
  frg_yug: 'yug',
  // Semi Final
  bra_chi: 'bra',
  tch_yug: 'tch',
  // Final
  bra_tch: 'bra',
  // Third Place
  chi_yug: 'chi',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
