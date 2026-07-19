import { t, group, toKnockoutTeams, s } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1974,
  host: 'West Germany',
  champion: 'West Germany',
  runnerUp: 'Netherlands',
  available: false,
  teams: {
    frg: t('frg', 'West Germany', 'de'),
    gdr: t('gdr', 'East Germany', 'de'),
    chi: t('chi', 'Chile', 'cl'),
    aus: t('aus', 'Australia', 'au'),
    bra: t('bra', 'Brazil', 'br'),
    yug: t('yug', 'Yugoslavia', 'rs'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    zar: t('zar', 'Zaire', 'cd'),
    ned: t('ned', 'Netherlands', 'nl'),
    swe: t('swe', 'Sweden', 'se'),
    bul: t('bul', 'Bulgaria', 'bg'),
    uru: t('uru', 'Uruguay', 'uy'),
    ita: t('ita', 'Italy', 'it'),
    pol: t('pol', 'Poland', 'pl'),
    arg: t('arg', 'Argentina', 'ar'),
    hai: t('hai', 'Haiti', 'ht'),
  },
  groups: [
    group('1', ['frg', 'gdr', 'chi', 'aus'], {
      frg: s('frg', 3, 2, 0, 1, 4, 1),
      gdr: s('gdr', 3, 2, 1, 0, 4, 1),
      chi: s('chi', 3, 0, 2, 1, 1, 2),
      aus: s('aus', 3, 0, 1, 2, 0, 5),
    }),
    group('2', ['bra', 'yug', 'sco', 'zar'], {
      bra: s('bra', 3, 1, 2, 0, 3, 0),
      yug: s('yug', 3, 1, 2, 0, 10, 1),
      sco: s('sco', 3, 1, 2, 0, 3, 1),
      zar: s('zar', 3, 0, 0, 3, 0, 14),
    }),
    group('3', ['ned', 'swe', 'bul', 'uru'], {
      ned: s('ned', 3, 2, 1, 0, 6, 1),
      swe: s('swe', 3, 1, 2, 0, 3, 0),
      bul: s('bul', 3, 0, 2, 1, 2, 5),
      uru: s('uru', 3, 0, 1, 2, 1, 6),
    }),
    group('4', ['ita', 'pol', 'arg', 'hai'], {
      ita: s('ita', 3, 1, 1, 1, 5, 4),
      pol: s('pol', 3, 3, 0, 0, 12, 3),
      arg: s('arg', 3, 1, 1, 1, 7, 5),
      hai: s('hai', 3, 0, 0, 3, 2, 14),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = ['ned', 'frg'];

const PREDETERMINED: Record<string, string> = {
  // Final
  frg_ned: 'frg',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
