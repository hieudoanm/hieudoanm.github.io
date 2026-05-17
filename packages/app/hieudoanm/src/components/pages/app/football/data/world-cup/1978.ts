import { t, group, toKnockoutTeams, s } from './types';
import type { BracketRaw } from '../../pages/knock-out/types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1978,
  host: 'Argentina',
  champion: 'Argentina',
  runnerUp: 'Netherlands',
  available: false,
  teams: {
    arg: t('arg', 'Argentina', 'ar'),
    ita: t('ita', 'Italy', 'it'),
    fra: t('fra', 'France', 'fr'),
    hun: t('hun', 'Hungary', 'hu'),
    pol: t('pol', 'Poland', 'pl'),
    frg: t('frg', 'West Germany', 'de'),
    tun: t('tun', 'Tunisia', 'tn'),
    mex: t('mex', 'Mexico', 'mx'),
    aut: t('aut', 'Austria', 'at'),
    bra: t('bra', 'Brazil', 'br'),
    esp: t('esp', 'Spain', 'es'),
    swe: t('swe', 'Sweden', 'se'),
    per: t('per', 'Peru', 'pe'),
    ned: t('ned', 'Netherlands', 'nl'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    irn: t('irn', 'Iran', 'ir'),
  },
  groups: [
    group('1', ['arg', 'ita', 'fra', 'hun'], {
      arg: s('arg', 3, 2, 0, 1, 4, 3),
      ita: s('ita', 3, 3, 0, 0, 6, 2),
      fra: s('fra', 3, 1, 0, 2, 5, 5),
      hun: s('hun', 3, 0, 0, 3, 3, 8),
    }),
    group('2', ['pol', 'frg', 'tun', 'mex'], {
      pol: s('pol', 3, 2, 1, 0, 4, 1),
      frg: s('frg', 3, 1, 2, 0, 6, 0),
      tun: s('tun', 3, 1, 1, 1, 3, 2),
      mex: s('mex', 3, 0, 0, 3, 2, 12),
    }),
    group('3', ['aut', 'bra', 'esp', 'swe'], {
      aut: s('aut', 3, 2, 0, 1, 3, 2),
      bra: s('bra', 3, 1, 2, 0, 2, 1),
      esp: s('esp', 3, 1, 1, 1, 2, 2),
      swe: s('swe', 3, 0, 1, 2, 1, 3),
    }),
    group('4', ['per', 'ned', 'sco', 'irn'], {
      per: s('per', 3, 2, 1, 0, 7, 2),
      ned: s('ned', 3, 1, 1, 1, 5, 3),
      sco: s('sco', 3, 1, 1, 1, 5, 6),
      irn: s('irn', 3, 0, 1, 2, 2, 8),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = ['arg', 'ned'];

const PREDETERMINED: Record<string, string> = {
  // Final
  arg_ned: 'arg',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
