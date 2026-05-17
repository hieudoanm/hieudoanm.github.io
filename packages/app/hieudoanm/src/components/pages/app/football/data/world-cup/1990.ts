import type { BracketRaw } from '../../pages/knock-out/types';
import type { KnockoutYearData, WorldCupYearData } from './types';
import { group, s, t, toKnockoutTeams } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1990,
  host: 'Italy',
  champion: 'West Germany',
  runnerUp: 'Argentina',
  available: false,
  teams: {
    ita: t('ita', 'Italy', 'it'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
    aut: t('aut', 'Austria', 'at'),
    usa: t('usa', 'United States', 'us'),
    arg: t('arg', 'Argentina', 'ar'),
    cam: t('cam', 'Cameroon', 'cm'),
    rom: t('rom', 'Romania', 'ro'),
    urs: t('urs', 'Soviet Union', 'ru'),
    bra: t('bra', 'Brazil', 'br'),
    cri: t('cri', 'Costa Rica', 'cr'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    swe: t('swe', 'Sweden', 'se'),
    frg: t('frg', 'West Germany', 'de'),
    yug: t('yug', 'Yugoslavia', 'rs'),
    col: t('col', 'Colombia', 'co'),
    uae: t('uae', 'UAE', 'ae'),
    eng: t('eng', 'England', 'gb-eng'),
    irl: t('irl', 'Ireland', 'ie'),
    ned: t('ned', 'Netherlands', 'nl'),
    egy: t('egy', 'Egypt', 'eg'),
    esp: t('esp', 'Spain', 'es'),
    bel: t('bel', 'Belgium', 'be'),
    uru: t('uru', 'Uruguay', 'uy'),
    kor: t('kor', 'South Korea', 'kr'),
  },
  groups: [
    group('A', ['ita', 'tch', 'aut', 'usa'], {
      ita: s('ita', 3, 3, 0, 0, 4, 0),
      tch: s('tch', 3, 2, 0, 1, 6, 3),
      aut: s('aut', 3, 1, 0, 2, 2, 3),
      usa: s('usa', 3, 0, 0, 3, 2, 8),
    }),
    group('B', ['arg', 'cam', 'rom', 'urs'], {
      arg: s('arg', 3, 1, 1, 1, 3, 2),
      cam: s('cam', 3, 2, 0, 1, 3, 5),
      rom: s('rom', 3, 1, 1, 1, 4, 3),
      urs: s('urs', 3, 1, 0, 2, 4, 4),
    }),
    group('C', ['bra', 'cri', 'sco', 'swe'], {
      bra: s('bra', 3, 3, 0, 0, 4, 1),
      cri: s('cri', 3, 2, 0, 1, 3, 2),
      sco: s('sco', 3, 1, 0, 2, 2, 3),
      swe: s('swe', 3, 0, 0, 3, 3, 6),
    }),
    group('D', ['frg', 'yug', 'col', 'uae'], {
      frg: s('frg', 3, 2, 1, 0, 10, 3),
      yug: s('yug', 3, 2, 0, 1, 6, 5),
      col: s('col', 3, 1, 1, 1, 3, 2),
      uae: s('uae', 3, 0, 0, 3, 2, 11),
    }),
    group('E', ['eng', 'irl', 'ned', 'egy'], {
      eng: s('eng', 3, 1, 2, 0, 2, 1),
      irl: s('irl', 3, 0, 3, 0, 2, 2),
      ned: s('ned', 3, 0, 3, 0, 2, 2),
      egy: s('egy', 3, 0, 2, 1, 1, 2),
    }),
    group('F', ['esp', 'bel', 'uru', 'kor'], {
      esp: s('esp', 3, 2, 1, 0, 5, 2),
      bel: s('bel', 3, 2, 0, 1, 6, 3),
      uru: s('uru', 3, 1, 1, 1, 2, 3),
      kor: s('kor', 3, 0, 0, 3, 1, 6),
    }),
  ],
};

const BRACKET_RAW: BracketRaw = [
  [
    ['arg', 'yug'],
    ['ita', 'irl'],
  ],
  [
    ['frg', 'tch'],
    ['eng', 'cam'],
  ],
];

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  arg_yug: 'arg',
  irl_ita: 'ita',
  frg_tch: 'frg',
  cam_eng: 'eng',
  // Semi Final
  arg_ita: 'arg',
  eng_frg: 'frg',
  // Final
  arg_frg: 'frg',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: toKnockoutTeams(WORLD_CUP.teams),
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
