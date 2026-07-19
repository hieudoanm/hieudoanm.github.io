import { s, t, group } from './types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1950,
  host: 'Brazil',
  champion: 'Uruguay',
  runnerUp: 'Brazil',
  available: false,
  teams: {
    bra: t('bra', 'Brazil', 'br'),
    yug: t('yug', 'Yugoslavia', 'rs'),
    sui: t('sui', 'Switzerland', 'ch'),
    mex: t('mex', 'Mexico', 'mx'),
    esp: t('esp', 'Spain', 'es'),
    eng: t('eng', 'England', 'gb-eng'),
    chi: t('chi', 'Chile', 'cl'),
    usa: t('usa', 'United States', 'us'),
    swe: t('swe', 'Sweden', 'se'),
    ita: t('ita', 'Italy', 'it'),
    par: t('par', 'Paraguay', 'py'),
    uru: t('uru', 'Uruguay', 'uy'),
    bol: t('bol', 'Bolivia', 'bo'),
  },
  groups: [
    group('1', ['bra', 'yug', 'sui', 'mex'], {
      bra: s('bra', 3, 2, 0, 1, 8, 2),
      yug: s('yug', 3, 2, 0, 1, 7, 3),
      sui: s('sui', 3, 1, 1, 1, 4, 6),
      mex: s('mex', 3, 0, 1, 2, 2, 10),
    }),
    group('2', ['esp', 'eng', 'chi', 'usa'], {
      esp: s('esp', 3, 3, 0, 0, 6, 1),
      eng: s('eng', 3, 1, 0, 2, 2, 2),
      chi: s('chi', 3, 1, 0, 2, 5, 6),
      usa: s('usa', 3, 1, 0, 2, 4, 8),
    }),
    group('3', ['swe', 'ita', 'par'], {
      swe: s('swe', 2, 1, 1, 0, 3, 2),
      ita: s('ita', 2, 1, 1, 0, 4, 3),
      par: s('par', 2, 0, 0, 2, 2, 4),
    }),
    group('4', ['uru', 'bol'], {
      uru: s('uru', 1, 1, 0, 0, 8, 0),
      bol: s('bol', 1, 0, 0, 1, 0, 8),
    }),
  ],
};

export const KNOCKOUT: KnockoutYearData | null = null;
