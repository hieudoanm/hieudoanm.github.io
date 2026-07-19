import { t, group, toKnockoutTeams, s } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1966,
  host: 'England',
  champion: 'England',
  runnerUp: 'West Germany',
  available: false,
  teams: {
    eng: t('eng', 'England', 'gb-eng'),
    uru: t('uru', 'Uruguay', 'uy'),
    mex: t('mex', 'Mexico', 'mx'),
    fra: t('fra', 'France', 'fr'),
    frg: t('frg', 'West Germany', 'de'),
    arg: t('arg', 'Argentina', 'ar'),
    esp: t('esp', 'Spain', 'es'),
    sui: t('sui', 'Switzerland', 'ch'),
    por: t('por', 'Portugal', 'pt'),
    hun: t('hun', 'Hungary', 'hu'),
    bra: t('bra', 'Brazil', 'br'),
    bul: t('bul', 'Bulgaria', 'bg'),
    urs: t('urs', 'Soviet Union', 'ru'),
    ita: t('ita', 'Italy', 'it'),
    chi: t('chi', 'Chile', 'cl'),
    prk: t('prk', 'North Korea', 'kp'),
  },
  groups: [
    group('1', ['eng', 'uru', 'mex', 'fra'], {
      eng: s('eng', 3, 2, 1, 0, 4, 0),
      uru: s('uru', 3, 1, 2, 0, 2, 1),
      mex: s('mex', 3, 0, 2, 1, 1, 3),
      fra: s('fra', 3, 0, 1, 2, 2, 5),
    }),
    group('2', ['frg', 'arg', 'esp', 'sui'], {
      frg: s('frg', 3, 2, 1, 0, 7, 1),
      arg: s('arg', 3, 2, 1, 0, 4, 1),
      esp: s('esp', 3, 1, 0, 2, 4, 5),
      sui: s('sui', 3, 0, 0, 3, 1, 9),
    }),
    group('3', ['por', 'hun', 'bra', 'bul'], {
      por: s('por', 3, 3, 0, 0, 9, 2),
      hun: s('hun', 3, 2, 0, 1, 7, 5),
      bra: s('bra', 3, 1, 0, 2, 4, 6),
      bul: s('bul', 3, 0, 0, 3, 1, 8),
    }),
    group('4', ['urs', 'ita', 'chi', 'prk'], {
      urs: s('urs', 3, 3, 0, 0, 6, 1),
      ita: s('ita', 3, 1, 0, 2, 2, 2),
      chi: s('chi', 3, 0, 1, 2, 2, 5),
      prk: s('prk', 3, 1, 1, 1, 2, 4),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = [
  [
    ['eng', 'arg'],
    ['por', 'prk'],
  ],
  [
    ['frg', 'uru'],
    ['urs', 'hun'],
  ],
];

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  arg_eng: 'eng',
  frg_uru: 'frg',
  hun_urs: 'urs',
  por_prk: 'por',
  // Semi Final
  eng_por: 'eng',
  frg_urs: 'frg',
  // Final
  eng_frg: 'eng',
  // Third Place
  por_urs: 'por',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
