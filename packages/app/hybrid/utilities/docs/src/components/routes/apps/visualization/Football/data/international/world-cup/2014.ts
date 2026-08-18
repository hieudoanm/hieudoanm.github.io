import type { BracketRaw } from '../../../pages/knock-out/types';
import type { KnockoutYearData, WorldCupYearData } from './types';
import { group, s, t, toKnockoutTeams } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 2014,
  host: 'Brazil',
  champion: 'Germany',
  runnerUp: 'Argentina',
  available: false,
  teams: {
    bra: t('bra', 'Brazil', 'br'),
    cro: t('cro', 'Croatia', 'hr'),
    mex: t('mex', 'Mexico', 'mx'),
    cam: t('cam', 'Cameroon', 'cm'),
    esp: t('esp', 'Spain', 'es'),
    ned: t('ned', 'Netherlands', 'nl'),
    chi: t('chi', 'Chile', 'cl'),
    aus: t('aus', 'Australia', 'au'),
    col: t('col', 'Colombia', 'co'),
    gre: t('gre', 'Greece', 'gr'),
    civ: t('civ', "Côte d'Ivoire", 'ci'),
    jpn: t('jpn', 'Japan', 'jp'),
    uru: t('uru', 'Uruguay', 'uy'),
    cri: t('cri', 'Costa Rica', 'cr'),
    eng: t('eng', 'England', 'gb-eng'),
    ita: t('ita', 'Italy', 'it'),
    sui: t('sui', 'Switzerland', 'ch'),
    ecu: t('ecu', 'Ecuador', 'ec'),
    fra: t('fra', 'France', 'fr'),
    hon: t('hon', 'Honduras', 'hn'),
    arg: t('arg', 'Argentina', 'ar'),
    irn: t('irn', 'Iran', 'ir'),
    nig: t('nig', 'Nigeria', 'ng'),
    bih: t('bih', 'Bosnia & H.', 'ba'),
    ger: t('ger', 'Germany', 'de'),
    por: t('por', 'Portugal', 'pt'),
    gha: t('gha', 'Ghana', 'gh'),
    usa: t('usa', 'United States', 'us'),
    bel: t('bel', 'Belgium', 'be'),
    alg: t('alg', 'Algeria', 'dz'),
    rus: t('rus', 'Russia', 'ru'),
    kor: t('kor', 'South Korea', 'kr'),
  },
  groups: [
    group('A', ['bra', 'cro', 'mex', 'cam'], {
      bra: s('bra', 3, 2, 1, 0, 7, 2),
      cro: s('cro', 3, 1, 0, 2, 6, 6),
      mex: s('mex', 3, 2, 1, 0, 4, 1),
      cam: s('cam', 3, 0, 0, 3, 1, 9),
    }),
    group('B', ['esp', 'ned', 'chi', 'aus'], {
      esp: s('esp', 3, 1, 0, 2, 4, 7),
      ned: s('ned', 3, 3, 0, 0, 10, 3),
      chi: s('chi', 3, 2, 0, 1, 5, 3),
      aus: s('aus', 3, 0, 0, 3, 3, 9),
    }),
    group('C', ['col', 'gre', 'civ', 'jpn'], {
      col: s('col', 3, 3, 0, 0, 9, 2),
      gre: s('gre', 3, 1, 1, 1, 2, 4),
      civ: s('civ', 3, 1, 0, 2, 4, 5),
      jpn: s('jpn', 3, 0, 1, 2, 2, 6),
    }),
    group('D', ['uru', 'cri', 'eng', 'ita'], {
      uru: s('uru', 3, 2, 0, 1, 4, 4),
      cri: s('cri', 3, 2, 1, 0, 4, 1),
      eng: s('eng', 3, 0, 1, 2, 2, 4),
      ita: s('ita', 3, 1, 0, 2, 2, 3),
    }),
    group('E', ['sui', 'ecu', 'fra', 'hon'], {
      sui: s('sui', 3, 2, 0, 1, 7, 6),
      ecu: s('ecu', 3, 1, 1, 1, 3, 3),
      fra: s('fra', 3, 2, 1, 0, 8, 2),
      hon: s('hon', 3, 0, 0, 3, 1, 8),
    }),
    group('F', ['arg', 'irn', 'nig', 'bih'], {
      arg: s('arg', 3, 3, 0, 0, 6, 3),
      irn: s('irn', 3, 0, 1, 2, 1, 4),
      nig: s('nig', 3, 1, 1, 1, 3, 3),
      bih: s('bih', 3, 1, 0, 2, 4, 4),
    }),
    group('G', ['ger', 'por', 'gha', 'usa'], {
      ger: s('ger', 3, 2, 1, 0, 7, 2),
      por: s('por', 3, 1, 1, 1, 4, 7),
      gha: s('gha', 3, 0, 1, 2, 4, 6),
      usa: s('usa', 3, 1, 1, 1, 4, 4),
    }),
    group('H', ['bel', 'alg', 'rus', 'kor'], {
      bel: s('bel', 3, 3, 0, 0, 4, 1),
      alg: s('alg', 3, 1, 1, 1, 6, 5),
      rus: s('rus', 3, 0, 2, 1, 2, 3),
      kor: s('kor', 3, 0, 1, 2, 3, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(WORLD_CUP.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  bra_chi: 'bra',
  col_uru: 'col',
  fra_nig: 'fra',
  alg_ger: 'ger',
  mex_ned: 'ned',
  cri_gre: 'cri',
  arg_sui: 'arg',
  bel_usa: 'bel',
  // Quarter Final
  bra_col: 'bra',
  fra_ger: 'ger',
  cri_ned: 'ned',
  arg_bel: 'arg',
  // Semi Final
  bra_ger: 'ger',
  arg_ned: 'arg',
  // Final
  arg_ger: 'ger',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['bra', 'chi'],
      ['col', 'uru'],
    ],
    [
      ['fra', 'nig'],
      ['ger', 'alg'],
    ],
  ],
  [
    [
      ['ned', 'mex'],
      ['cri', 'gre'],
    ],
    [
      ['arg', 'sui'],
      ['bel', 'usa'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
