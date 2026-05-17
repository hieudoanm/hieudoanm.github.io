import type { BracketRaw } from '../../pages/knock-out/types';
import type { KnockoutYearData, WorldCupYearData } from './types';
import { group, s, t, toKnockoutTeams } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1986,
  host: 'Mexico',
  champion: 'Argentina',
  runnerUp: 'West Germany',
  available: false,
  teams: {
    arg: t('arg', 'Argentina', 'ar'),
    ita: t('ita', 'Italy', 'it'),
    bul: t('bul', 'Bulgaria', 'bg'),
    kor: t('kor', 'South Korea', 'kr'),
    mex: t('mex', 'Mexico', 'mx'),
    bel: t('bel', 'Belgium', 'be'),
    par: t('par', 'Paraguay', 'py'),
    irq: t('irq', 'Iraq', 'iq'),
    fra: t('fra', 'France', 'fr'),
    urs: t('urs', 'Soviet Union', 'ru'),
    hun: t('hun', 'Hungary', 'hu'),
    can: t('can', 'Canada', 'ca'),
    bra: t('bra', 'Brazil', 'br'),
    esp: t('esp', 'Spain', 'es'),
    nir: t('nir', 'Northern Ireland', 'gb-nir'),
    alg: t('alg', 'Algeria', 'dz'),
    frg: t('frg', 'West Germany', 'de'),
    uru: t('uru', 'Uruguay', 'uy'),
    den: t('den', 'Denmark', 'dk'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    eng: t('eng', 'England', 'gb-eng'),
    pol: t('pol', 'Poland', 'pl'),
    por: t('por', 'Portugal', 'pt'),
    mar: t('mar', 'Morocco', 'ma'),
  },
  groups: [
    group('A', ['arg', 'ita', 'bul', 'kor'], {
      arg: s('arg', 3, 2, 1, 0, 6, 2),
      ita: s('ita', 3, 1, 2, 0, 5, 4),
      bul: s('bul', 3, 0, 2, 1, 2, 4),
      kor: s('kor', 3, 0, 1, 2, 4, 7),
    }),
    group('B', ['mex', 'bel', 'par', 'irq'], {
      mex: s('mex', 3, 2, 1, 0, 4, 2),
      bel: s('bel', 3, 1, 1, 1, 5, 5),
      par: s('par', 3, 1, 2, 0, 4, 3),
      irq: s('irq', 3, 0, 0, 3, 1, 4),
    }),
    group('C', ['fra', 'urs', 'hun', 'can'], {
      fra: s('fra', 3, 2, 1, 0, 5, 1),
      urs: s('urs', 3, 2, 1, 0, 9, 1),
      hun: s('hun', 3, 1, 0, 2, 2, 9),
      can: s('can', 3, 0, 0, 3, 0, 5),
    }),
    group('D', ['bra', 'esp', 'nir', 'alg'], {
      bra: s('bra', 3, 3, 0, 0, 5, 0),
      esp: s('esp', 3, 2, 0, 1, 5, 2),
      nir: s('nir', 3, 0, 1, 2, 2, 6),
      alg: s('alg', 3, 0, 1, 2, 1, 5),
    }),
    group('E', ['frg', 'uru', 'den', 'sco'], {
      frg: s('frg', 3, 1, 1, 1, 3, 4),
      uru: s('uru', 3, 0, 2, 1, 2, 7),
      den: s('den', 3, 3, 0, 0, 9, 1),
      sco: s('sco', 3, 0, 1, 2, 1, 3),
    }),
    group('F', ['eng', 'pol', 'por', 'mar'], {
      eng: s('eng', 3, 1, 1, 1, 3, 1),
      pol: s('pol', 3, 1, 1, 1, 1, 3),
      por: s('por', 3, 1, 0, 2, 2, 4),
      mar: s('mar', 3, 1, 2, 0, 3, 1),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = [
  [
    ['bel', 'esp'],
    ['arg', 'eng'],
  ],
  [
    ['fra', 'bra'],
    ['mex', 'frg'],
  ],
];

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  arg_eng: 'arg',
  bel_esp: 'bel',
  bra_fra: 'fra',
  frg_mex: 'frg',
  // Semi Final
  arg_bel: 'arg',
  fra_frg: 'frg',
  // Final
  arg_frg: 'arg',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
