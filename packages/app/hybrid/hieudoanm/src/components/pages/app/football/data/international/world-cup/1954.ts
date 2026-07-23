import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1954,
  host: 'Switzerland',
  champion: 'West Germany',
  runnerUp: 'Hungary',
  available: false,
  teams: {
    bra: t('bra', 'Brazil', 'br'),
    yug: t('yug', 'Yugoslavia', 'rs'),
    fra: t('fra', 'France', 'fr'),
    mex: t('mex', 'Mexico', 'mx'),
    hun: t('hun', 'Hungary', 'hu'),
    frg: t('frg', 'West Germany', 'de'),
    tur: t('tur', 'Turkey', 'tr'),
    kor: t('kor', 'South Korea', 'kr'),
    uru: t('uru', 'Uruguay', 'uy'),
    aut: t('aut', 'Austria', 'at'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    eng: t('eng', 'England', 'gb-eng'),
    bel: t('bel', 'Belgium', 'be'),
    ita: t('ita', 'Italy', 'it'),
    sui: t('sui', 'Switzerland', 'ch'),
  },
  groups: [
    group('1', ['bra', 'yug', 'fra', 'mex'], {
      bra: s('bra', 2, 1, 1, 0, 6, 1),
      yug: s('yug', 2, 1, 1, 0, 2, 1),
      fra: s('fra', 2, 1, 0, 1, 3, 3),
      mex: s('mex', 2, 0, 0, 2, 2, 8),
    }),
    group('2', ['hun', 'frg', 'tur', 'kor'], {
      hun: s('hun', 2, 2, 0, 0, 17, 3),
      frg: s('frg', 2, 1, 0, 1, 7, 9),
      tur: s('tur', 2, 1, 0, 1, 8, 4),
      kor: s('kor', 2, 0, 0, 2, 0, 16),
    }),
    group('3', ['uru', 'aut', 'tch', 'sco'], {
      uru: s('uru', 2, 2, 0, 0, 9, 0),
      aut: s('aut', 2, 2, 0, 0, 6, 0),
      tch: s('tch', 2, 0, 0, 2, 0, 7),
      sco: s('sco', 2, 0, 0, 2, 0, 8),
    }),
    group('4', ['eng', 'bel', 'ita', 'sui'], {
      eng: s('eng', 2, 1, 1, 0, 6, 4),
      bel: s('bel', 2, 0, 1, 1, 5, 8),
      ita: s('ita', 2, 1, 0, 1, 5, 3),
      sui: s('sui', 2, 1, 0, 1, 2, 3),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = [
  [
    ['frg', 'yug'],
    ['aut', 'sui'],
  ],
  [
    ['hun', 'bra'],
    ['uru', 'eng'],
  ],
];

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  aut_sui: 'aut',
  bra_hun: 'hun',
  eng_uru: 'uru',
  frg_yug: 'frg',
  // Semi Final
  aut_frg: 'frg',
  hun_uru: 'hun',
  // Final
  frg_hun: 'frg',
  // Third Place
  aut_uru: 'aut',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
