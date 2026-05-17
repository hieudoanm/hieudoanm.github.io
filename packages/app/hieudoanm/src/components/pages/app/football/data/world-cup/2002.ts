import type { BracketRaw } from '../../pages/knock-out/types';
import type { KnockoutYearData, WorldCupYearData } from './types';
import { group, s, t, toKnockoutTeams } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 2002,
  host: 'South Korea/Japan',
  champion: 'Brazil',
  runnerUp: 'Germany',
  available: false,
  teams: {
    den: t('den', 'Denmark', 'dk'),
    sen: t('sen', 'Senegal', 'sn'),
    uru: t('uru', 'Uruguay', 'uy'),
    fra: t('fra', 'France', 'fr'),
    esp: t('esp', 'Spain', 'es'),
    par: t('par', 'Paraguay', 'py'),
    rsa: t('rsa', 'South Africa', 'za'),
    slo: t('slo', 'Slovenia', 'si'),
    bra: t('bra', 'Brazil', 'br'),
    tur: t('tur', 'Turkey', 'tr'),
    chi: t('chi', 'China', 'cn'),
    cri: t('cri', 'Costa Rica', 'cr'),
    kor: t('kor', 'South Korea', 'kr'),
    pol: t('pol', 'Poland', 'pl'),
    usa: t('usa', 'United States', 'us'),
    por: t('por', 'Portugal', 'pt'),
    ger: t('ger', 'Germany', 'de'),
    irl: t('irl', 'Ireland', 'ie'),
    cam: t('cam', 'Cameroon', 'cm'),
    sau: t('sau', 'Saudi Arabia', 'sa'),
    eng: t('eng', 'England', 'gb-eng'),
    swe: t('swe', 'Sweden', 'se'),
    arg: t('arg', 'Argentina', 'ar'),
    nig: t('nig', 'Nigeria', 'ng'),
    ita: t('ita', 'Italy', 'it'),
    ecu: t('ecu', 'Ecuador', 'ec'),
    cro: t('cro', 'Croatia', 'hr'),
    mex: t('mex', 'Mexico', 'mx'),
    jpn: t('jpn', 'Japan', 'jp'),
    bel: t('bel', 'Belgium', 'be'),
    rus: t('rus', 'Russia', 'ru'),
    tun: t('tun', 'Tunisia', 'tn'),
  },
  groups: [
    group('A', ['den', 'sen', 'uru', 'fra'], {
      den: s('den', 3, 2, 1, 0, 5, 2),
      sen: s('sen', 3, 1, 2, 0, 5, 4),
      uru: s('uru', 3, 0, 2, 1, 4, 5),
      fra: s('fra', 3, 0, 1, 2, 0, 3),
    }),
    group('B', ['esp', 'par', 'rsa', 'slo'], {
      esp: s('esp', 3, 3, 0, 0, 9, 4),
      par: s('par', 3, 1, 1, 1, 6, 6),
      rsa: s('rsa', 3, 1, 1, 1, 5, 5),
      slo: s('slo', 3, 0, 0, 3, 2, 7),
    }),
    group('C', ['bra', 'tur', 'chi', 'cri'], {
      bra: s('bra', 3, 3, 0, 0, 11, 3),
      tur: s('tur', 3, 1, 1, 1, 5, 3),
      chi: s('chi', 3, 0, 0, 3, 0, 9),
      cri: s('cri', 3, 1, 1, 1, 5, 6),
    }),
    group('D', ['kor', 'pol', 'usa', 'por'], {
      kor: s('kor', 3, 2, 1, 0, 4, 1),
      pol: s('pol', 3, 1, 0, 2, 3, 7),
      usa: s('usa', 3, 1, 1, 1, 5, 6),
      por: s('por', 3, 1, 0, 2, 6, 4),
    }),
    group('E', ['ger', 'irl', 'cam', 'sau'], {
      ger: s('ger', 3, 2, 1, 0, 11, 1),
      irl: s('irl', 3, 2, 1, 0, 5, 2),
      cam: s('cam', 3, 1, 1, 1, 2, 3),
      sau: s('sau', 3, 0, 0, 3, 0, 12),
    }),
    group('F', ['eng', 'swe', 'arg', 'nig'], {
      eng: s('eng', 3, 1, 2, 0, 2, 1),
      swe: s('swe', 3, 1, 2, 0, 4, 3),
      arg: s('arg', 3, 1, 1, 1, 2, 2),
      nig: s('nig', 3, 0, 1, 2, 1, 3),
    }),
    group('G', ['ita', 'ecu', 'cro', 'mex'], {
      ita: s('ita', 3, 1, 1, 1, 4, 3),
      ecu: s('ecu', 3, 1, 0, 2, 2, 5),
      cro: s('cro', 3, 1, 0, 2, 2, 3),
      mex: s('mex', 3, 2, 1, 0, 4, 2),
    }),
    group('H', ['jpn', 'bel', 'rus', 'tun'], {
      jpn: s('jpn', 3, 2, 1, 0, 5, 2),
      bel: s('bel', 3, 1, 2, 0, 6, 5),
      rus: s('rus', 3, 1, 0, 2, 4, 4),
      tun: s('tun', 3, 0, 1, 2, 1, 6),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(WORLD_CUP.teams);

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  ger_par: 'ger',
  esp_irl: 'esp',
  sen_swe: 'sen',
  jpn_tur: 'tur',
  ita_kor: 'kor',
  mex_usa: 'usa',
  den_eng: 'eng',
  bel_bra: 'bra',
  // Quarter Final
  ger_usa: 'ger',
  esp_kor: 'kor',
  sen_tur: 'tur',
  bra_eng: 'bra',
  // Semi Final
  ger_kor: 'ger',
  bra_tur: 'bra',
  // Final
  bra_ger: 'bra',
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['ger', 'par'],
      ['mex', 'usa'],
    ],
    [
      ['esp', 'irl'],
      ['kor', 'ita'],
    ],
  ],
  [
    [
      ['den', 'eng'],
      ['bra', 'bel'],
    ],
    [
      ['swe', 'sen'],
      ['jpn', 'tur'],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
