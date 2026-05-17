import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { WorldCupYearData, KnockoutYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 2022,
  host: 'Qatar',
  champion: 'Argentina',
  runnerUp: 'France',
  available: false,
  teams: {
    qat: t('qat', 'Qatar', 'qa'),
    ecu: t('ecu', 'Ecuador', 'ec'),
    sen: t('sen', 'Senegal', 'sn'),
    ned: t('ned', 'Netherlands', 'nl'),
    eng: t('eng', 'England', 'gb-eng'),
    irn: t('irn', 'Iran', 'ir'),
    usa: t('usa', 'United States', 'us'),
    wal: t('wal', 'Wales', 'gb-wls'),
    arg: t('arg', 'Argentina', 'ar'),
    sau: t('sau', 'Saudi Arabia', 'sa'),
    mex: t('mex', 'Mexico', 'mx'),
    pol: t('pol', 'Poland', 'pl'),
    fra: t('fra', 'France', 'fr'),
    aus: t('aus', 'Australia', 'au'),
    den: t('den', 'Denmark', 'dk'),
    tun: t('tun', 'Tunisia', 'tn'),
    esp: t('esp', 'Spain', 'es'),
    cri: t('cri', 'Costa Rica', 'cr'),
    ger: t('ger', 'Germany', 'de'),
    jpn: t('jpn', 'Japan', 'jp'),
    bel: t('bel', 'Belgium', 'be'),
    can: t('can', 'Canada', 'ca'),
    mar: t('mar', 'Morocco', 'ma'),
    cro: t('cro', 'Croatia', 'hr'),
    bra: t('bra', 'Brazil', 'br'),
    ser: t('ser', 'Serbia', 'rs'),
    sui: t('sui', 'Switzerland', 'ch'),
    cam: t('cam', 'Cameroon', 'cm'),
    por: t('por', 'Portugal', 'pt'),
    gha: t('gha', 'Ghana', 'gh'),
    uru: t('uru', 'Uruguay', 'uy'),
    kor: t('kor', 'South Korea', 'kr'),
  },
  groups: [
    group('A', ['qat', 'ecu', 'sen', 'ned'], {
      qat: s('qat', 3, 0, 0, 3, 1, 7),
      ecu: s('ecu', 3, 1, 1, 1, 4, 3),
      sen: s('sen', 3, 2, 0, 1, 5, 4),
      ned: s('ned', 3, 2, 1, 0, 5, 1),
    }),
    group('B', ['eng', 'irn', 'usa', 'wal'], {
      eng: s('eng', 3, 2, 1, 0, 9, 2),
      irn: s('irn', 3, 1, 0, 2, 4, 7),
      usa: s('usa', 3, 1, 2, 0, 2, 1),
      wal: s('wal', 3, 0, 1, 2, 1, 6),
    }),
    group('C', ['arg', 'sau', 'mex', 'pol'], {
      arg: s('arg', 3, 2, 0, 1, 5, 2),
      sau: s('sau', 3, 1, 0, 2, 3, 5),
      mex: s('mex', 3, 1, 1, 1, 2, 3),
      pol: s('pol', 3, 1, 1, 1, 2, 2),
    }),
    group('D', ['fra', 'aus', 'den', 'tun'], {
      fra: s('fra', 3, 2, 0, 1, 6, 3),
      aus: s('aus', 3, 2, 0, 1, 3, 4),
      den: s('den', 3, 0, 1, 2, 1, 3),
      tun: s('tun', 3, 1, 1, 1, 1, 1),
    }),
    group('E', ['esp', 'cri', 'ger', 'jpn'], {
      esp: s('esp', 3, 1, 1, 1, 9, 3),
      cri: s('cri', 3, 1, 0, 2, 3, 11),
      ger: s('ger', 3, 1, 1, 1, 6, 5),
      jpn: s('jpn', 3, 2, 0, 1, 4, 3),
    }),
    group('F', ['bel', 'can', 'mar', 'cro'], {
      bel: s('bel', 3, 1, 1, 1, 1, 2),
      can: s('can', 3, 0, 0, 3, 2, 7),
      mar: s('mar', 3, 2, 1, 0, 4, 1),
      cro: s('cro', 3, 1, 2, 0, 4, 1),
    }),
    group('G', ['bra', 'ser', 'sui', 'cam'], {
      bra: s('bra', 3, 2, 0, 1, 3, 1),
      ser: s('ser', 3, 0, 1, 2, 5, 8),
      sui: s('sui', 3, 2, 0, 1, 4, 3),
      cam: s('cam', 3, 1, 1, 1, 4, 4),
    }),
    group('H', ['por', 'gha', 'uru', 'kor'], {
      por: s('por', 3, 2, 0, 1, 6, 4),
      gha: s('gha', 3, 1, 0, 2, 5, 7),
      uru: s('uru', 3, 1, 1, 1, 2, 2),
      kor: s('kor', 3, 1, 1, 1, 4, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(WORLD_CUP.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  ned_usa: 'ned',
  arg_aus: 'arg',
  fra_pol: 'fra',
  eng_sen: 'eng',
  cro_jpn: 'cro',
  bra_kor: 'bra',
  esp_mar: 'mar',
  por_sui: 'por',
  // Quarter Final
  bra_cro: 'cro',
  arg_ned: 'arg',
  mar_por: 'mar',
  eng_fra: 'fra',
  // Semi Final
  arg_cro: 'arg',
  fra_mar: 'fra',
  // Final
  arg_fra: 'arg',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['ned', 'usa'],
      ['arg', 'aus'],
    ],
    [
      ['jpn', 'cro'],
      ['bra', 'kor'],
    ],
  ],
  [
    [
      ['eng', 'sen'],
      ['fra', 'pol'],
    ],
    [
      ['mar', 'esp'],
      ['por', 'sui'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
