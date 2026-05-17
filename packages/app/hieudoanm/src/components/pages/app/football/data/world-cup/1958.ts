import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../pages/knock-out/types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1958,
  host: 'Sweden',
  champion: 'Brazil',
  runnerUp: 'Sweden',
  available: false,
  teams: {
    frg: t('frg', 'West Germany', 'de'),
    arg: t('arg', 'Argentina', 'ar'),
    irl: t('irl', 'Ireland', 'ie'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
    fra: t('fra', 'France', 'fr'),
    yug: t('yug', 'Yugoslavia', 'rs'),
    par: t('par', 'Paraguay', 'py'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    swe: t('swe', 'Sweden', 'se'),
    mex: t('mex', 'Mexico', 'mx'),
    hun: t('hun', 'Hungary', 'hu'),
    wal: t('wal', 'Wales', 'gb-wls'),
    bra: t('bra', 'Brazil', 'br'),
    eng: t('eng', 'England', 'gb-eng'),
    urs: t('urs', 'Soviet Union', 'ru'),
    aut: t('aut', 'Austria', 'at'),
  },
  groups: [
    group('1', ['frg', 'arg', 'irl', 'tch'], {
      frg: s('frg', 3, 1, 2, 0, 7, 5),
      arg: s('arg', 3, 1, 0, 2, 5, 10),
      irl: s('irl', 3, 1, 1, 1, 4, 5),
      tch: s('tch', 3, 1, 1, 1, 8, 4),
    }),
    group('2', ['fra', 'yug', 'par', 'sco'], {
      fra: s('fra', 3, 2, 0, 1, 11, 7),
      yug: s('yug', 3, 1, 2, 0, 7, 6),
      par: s('par', 3, 1, 1, 1, 9, 12),
      sco: s('sco', 3, 0, 1, 2, 4, 6),
    }),
    group('3', ['swe', 'mex', 'hun', 'wal'], {
      swe: s('swe', 3, 2, 1, 0, 5, 1),
      mex: s('mex', 3, 0, 1, 2, 1, 8),
      hun: s('hun', 3, 1, 1, 1, 6, 3),
      wal: s('wal', 3, 0, 3, 0, 2, 2),
    }),
    group('4', ['bra', 'eng', 'urs', 'aut'], {
      bra: s('bra', 3, 2, 1, 0, 5, 0),
      eng: s('eng', 3, 0, 3, 0, 4, 4),
      urs: s('urs', 3, 1, 1, 1, 4, 4),
      aut: s('aut', 3, 0, 1, 2, 2, 7),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = [
  [
    ['frg', 'yug'],
    ['swe', 'urs'],
  ],
  [
    ['fra', 'irl'],
    ['bra', 'wal'],
  ],
];

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  bra_wal: 'bra',
  fra_irl: 'fra',
  frg_yug: 'frg',
  swe_urs: 'swe',
  // Semi Final
  bra_fra: 'bra',
  frg_swe: 'swe',
  // Final
  bra_swe: 'bra',
  // Third Place
  fra_frg: 'fra',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
