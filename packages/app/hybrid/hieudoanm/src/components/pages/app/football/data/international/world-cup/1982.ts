import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1982,
  host: 'Spain',
  champion: 'Italy',
  runnerUp: 'West Germany',
  available: false,
  teams: {
    ita: t('ita', 'Italy', 'it'),
    pol: t('pol', 'Poland', 'pl'),
    cam: t('cam', 'Cameroon', 'cm'),
    per: t('per', 'Peru', 'pe'),
    frg: t('frg', 'West Germany', 'de'),
    aut: t('aut', 'Austria', 'at'),
    chi: t('chi', 'Chile', 'cl'),
    alg: t('alg', 'Algeria', 'dz'),
    bel: t('bel', 'Belgium', 'be'),
    arg: t('arg', 'Argentina', 'ar'),
    hun: t('hun', 'Hungary', 'hu'),
    slv: t('slv', 'El Salvador', 'sv'),
    eng: t('eng', 'England', 'gb-eng'),
    fra: t('fra', 'France', 'fr'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
    kuw: t('kuw', 'Kuwait', 'kw'),
    bra: t('bra', 'Brazil', 'br'),
    urs: t('urs', 'Soviet Union', 'ru'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    nzl: t('nzl', 'New Zealand', 'nz'),
    esp: t('esp', 'Spain', 'es'),
    yug: t('yug', 'Yugoslavia', 'rs'),
    nir: t('nir', 'Northern Ireland', 'gb-nir'),
    hon: t('hon', 'Honduras', 'hn'),
  },
  groups: [
    group('1', ['ita', 'pol', 'cam', 'per'], {
      ita: s('ita', 3, 0, 3, 0, 2, 2),
      pol: s('pol', 3, 1, 2, 0, 5, 1),
      cam: s('cam', 3, 0, 3, 0, 1, 1),
      per: s('per', 3, 0, 2, 1, 2, 6),
    }),
    group('2', ['frg', 'aut', 'chi', 'alg'], {
      frg: s('frg', 3, 2, 0, 1, 6, 3),
      aut: s('aut', 3, 2, 0, 1, 3, 1),
      chi: s('chi', 3, 0, 0, 3, 3, 8),
      alg: s('alg', 3, 2, 0, 1, 5, 5),
    }),
    group('3', ['bel', 'arg', 'hun', 'slv'], {
      bel: s('bel', 3, 2, 1, 0, 3, 1),
      arg: s('arg', 3, 2, 0, 1, 6, 2),
      hun: s('hun', 3, 1, 1, 1, 12, 6),
      slv: s('slv', 3, 0, 0, 3, 1, 13),
    }),
    group('4', ['eng', 'fra', 'tch', 'kuw'], {
      eng: s('eng', 3, 3, 0, 0, 6, 1),
      fra: s('fra', 3, 1, 1, 1, 6, 5),
      tch: s('tch', 3, 0, 2, 1, 2, 4),
      kuw: s('kuw', 3, 0, 1, 2, 2, 6),
    }),
    group('5', ['bra', 'urs', 'sco', 'nzl'], {
      bra: s('bra', 3, 3, 0, 0, 10, 2),
      urs: s('urs', 3, 1, 1, 1, 6, 4),
      sco: s('sco', 3, 1, 1, 1, 8, 8),
      nzl: s('nzl', 3, 0, 0, 3, 2, 12),
    }),
    group('6', ['esp', 'yug', 'nir', 'hon'], {
      esp: s('esp', 3, 1, 1, 1, 3, 3),
      yug: s('yug', 3, 1, 1, 1, 2, 2),
      nir: s('nir', 3, 1, 2, 0, 2, 1),
      hon: s('hon', 3, 0, 2, 1, 2, 3),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = [
  ['pol', 'ita'],
  ['frg', 'fra'],
];

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  ita_pol: 'ita',
  fra_frg: 'frg',
  // Final
  frg_ita: 'ita',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
