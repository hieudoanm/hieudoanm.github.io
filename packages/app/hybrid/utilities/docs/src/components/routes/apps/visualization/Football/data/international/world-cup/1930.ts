import { t, group, s, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1930,
  host: 'Uruguay',
  champion: 'Uruguay',
  runnerUp: 'Argentina',
  available: false,
  teams: {
    arg: t('arg', 'Argentina', 'ar'),
    bra: t('bra', 'Brazil', 'br'),
    bol: t('bol', 'Bolivia', 'bo'),
    chi: t('chi', 'Chile', 'cl'),
    fra: t('fra', 'France', 'fr'),
    mex: t('mex', 'Mexico', 'mx'),
    par: t('par', 'Paraguay', 'py'),
    per: t('per', 'Peru', 'pe'),
    rom: t('rom', 'Romania', 'ro'),
    usa: t('usa', 'United States', 'us'),
    uru: t('uru', 'Uruguay', 'uy'),
    yug: t('yug', 'Yugoslavia', 'rs'),
    bel: t('bel', 'Belgium', 'be'),
  },
  groups: [
    group('1', ['arg', 'chi', 'fra', 'mex'], {
      arg: s('arg', 3, 3, 0, 0, 10, 4),
      chi: s('chi', 3, 2, 0, 1, 5, 3),
      fra: s('fra', 3, 1, 0, 2, 4, 3),
      mex: s('mex', 3, 0, 0, 3, 4, 13),
    }),
    group('2', ['yug', 'bra', 'bol'], {
      yug: s('yug', 2, 2, 0, 0, 6, 1),
      bra: s('bra', 2, 1, 0, 1, 5, 2),
      bol: s('bol', 2, 0, 0, 2, 0, 8),
    }),
    group('3', ['uru', 'rom', 'per'], {
      uru: s('uru', 2, 2, 0, 0, 5, 0),
      rom: s('rom', 2, 1, 0, 1, 3, 5),
      per: s('per', 2, 0, 0, 2, 1, 4),
    }),
    group('4', ['usa', 'par', 'bel'], {
      usa: s('usa', 2, 2, 0, 0, 6, 0),
      par: s('par', 2, 1, 0, 1, 1, 3),
      bel: s('bel', 2, 0, 0, 2, 0, 4),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = [
  ['arg', 'usa'],
  ['yug', 'uru'],
];

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  arg_usa: 'arg',
  uru_yug: 'uru',
  // Final
  arg_uru: 'uru',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
