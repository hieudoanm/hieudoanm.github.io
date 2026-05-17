import type { BracketRaw } from '../../pages/knock-out/types';
import type { KnockoutYearData, WorldCupYearData } from './types';
import { group, s, t, toKnockoutTeams } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1998,
  host: 'France',
  champion: 'France',
  runnerUp: 'Brazil',
  available: false,
  teams: {
    bra: t('bra', 'Brazil', 'br'),
    sco: t('sco', 'Scotland', 'gb-sct'),
    mar: t('mar', 'Morocco', 'ma'),
    nor: t('nor', 'Norway', 'no'),
    ita: t('ita', 'Italy', 'it'),
    chi: t('chi', 'Chile', 'cl'),
    aut: t('aut', 'Austria', 'at'),
    cam: t('cam', 'Cameroon', 'cm'),
    fra: t('fra', 'France', 'fr'),
    den: t('den', 'Denmark', 'dk'),
    rsa: t('rsa', 'South Africa', 'za'),
    sau: t('sau', 'Saudi Arabia', 'sa'),
    nig: t('nig', 'Nigeria', 'ng'),
    par: t('par', 'Paraguay', 'py'),
    esp: t('esp', 'Spain', 'es'),
    bul: t('bul', 'Bulgaria', 'bg'),
    ned: t('ned', 'Netherlands', 'nl'),
    bel: t('bel', 'Belgium', 'be'),
    kor: t('kor', 'South Korea', 'kr'),
    mex: t('mex', 'Mexico', 'mx'),
    ger: t('ger', 'Germany', 'de'),
    usa: t('usa', 'United States', 'us'),
    yug: t('yug', 'Yugoslavia', 'rs'),
    irn: t('irn', 'Iran', 'ir'),
    rom: t('rom', 'Romania', 'ro'),
    eng: t('eng', 'England', 'gb-eng'),
    col: t('col', 'Colombia', 'co'),
    tun: t('tun', 'Tunisia', 'tn'),
    arg: t('arg', 'Argentina', 'ar'),
    cro: t('cro', 'Croatia', 'hr'),
    jam: t('jam', 'Jamaica', 'jm'),
    jpn: t('jpn', 'Japan', 'jp'),
  },
  groups: [
    group('A', ['bra', 'sco', 'mar', 'nor'], {
      bra: s('bra', 3, 2, 0, 1, 6, 3),
      sco: s('sco', 3, 0, 1, 2, 2, 6),
      mar: s('mar', 3, 1, 1, 1, 5, 5),
      nor: s('nor', 3, 1, 2, 0, 5, 4),
    }),
    group('B', ['ita', 'chi', 'aut', 'cam'], {
      ita: s('ita', 3, 2, 1, 0, 7, 3),
      chi: s('chi', 3, 0, 3, 0, 4, 4),
      aut: s('aut', 3, 0, 2, 1, 3, 4),
      cam: s('cam', 3, 0, 2, 1, 2, 5),
    }),
    group('C', ['fra', 'den', 'rsa', 'sau'], {
      fra: s('fra', 3, 3, 0, 0, 9, 1),
      den: s('den', 3, 1, 1, 1, 3, 3),
      rsa: s('rsa', 3, 0, 2, 1, 3, 6),
      sau: s('sau', 3, 0, 1, 2, 2, 7),
    }),
    group('D', ['nig', 'par', 'esp', 'bul'], {
      nig: s('nig', 3, 2, 0, 1, 5, 5),
      par: s('par', 3, 1, 2, 0, 3, 1),
      esp: s('esp', 3, 1, 1, 1, 8, 5),
      bul: s('bul', 3, 0, 1, 2, 1, 7),
    }),
    group('E', ['ned', 'bel', 'kor', 'mex'], {
      ned: s('ned', 3, 1, 2, 0, 7, 2),
      bel: s('bel', 3, 0, 3, 0, 3, 3),
      kor: s('kor', 3, 0, 1, 2, 2, 9),
      mex: s('mex', 3, 1, 2, 0, 7, 5),
    }),
    group('F', ['ger', 'usa', 'yug', 'irn'], {
      ger: s('ger', 3, 2, 1, 0, 6, 2),
      usa: s('usa', 3, 0, 0, 3, 1, 5),
      yug: s('yug', 3, 2, 1, 0, 4, 2),
      irn: s('irn', 3, 1, 0, 2, 2, 4),
    }),
    group('G', ['rom', 'eng', 'col', 'tun'], {
      rom: s('rom', 3, 2, 1, 0, 4, 2),
      eng: s('eng', 3, 2, 0, 1, 5, 2),
      col: s('col', 3, 1, 0, 2, 1, 3),
      tun: s('tun', 3, 0, 1, 2, 1, 4),
    }),
    group('H', ['arg', 'cro', 'jam', 'jpn'], {
      arg: s('arg', 3, 3, 0, 0, 7, 0),
      cro: s('cro', 3, 2, 0, 1, 4, 2),
      jam: s('jam', 3, 1, 0, 2, 3, 9),
      jpn: s('jpn', 3, 0, 0, 3, 1, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(WORLD_CUP.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  ita_nor: 'ita',
  fra_par: 'fra',
  den_nig: 'den',
  bra_chi: 'bra',
  ger_mex: 'ger',
  ned_yug: 'ned',
  arg_eng: 'arg',
  cro_rom: 'cro',
  // Quarter Final
  fra_ita: 'fra',
  bra_den: 'bra',
  arg_ned: 'ned',
  cro_ger: 'cro',
  // Semi Final
  bra_ned: 'bra',
  cro_fra: 'fra',
  // Final
  bra_fra: 'fra',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['bra', 'chi'],
      ['den', 'nig'],
    ],
    [
      ['ned', 'yug'],
      ['arg', 'eng'],
    ],
  ],
  [
    [
      ['ita', 'nor'],
      ['fra', 'par'],
    ],
    [
      ['ger', 'mex'],
      ['cro', 'rom'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
