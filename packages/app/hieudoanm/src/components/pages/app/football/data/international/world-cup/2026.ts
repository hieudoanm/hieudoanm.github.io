import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group } from './types';
import type { WorldCupYearData, KnockoutYearData } from './types';

const TEAMS_2026 = {
  alg: t('alg', 'Algeria', 'dz'),
  arg: t('arg', 'Argentina', 'ar'),
  aus: t('aus', 'Australia', 'au'),
  aut: t('aut', 'Austria', 'at'),
  bel: t('bel', 'Belgium', 'be'),
  bih: t('bih', 'Bosnia & H.', 'ba'),
  bra: t('bra', 'Brazil', 'br'),
  can: t('can', 'Canada', 'ca'),
  civ: t('civ', "Côte d'Ivoire", 'ci'),
  cod: t('cod', 'DR Congo', 'cd'),
  col: t('col', 'Colombia', 'co'),
  cpv: t('cpv', 'Cape Verde', 'cv'),
  cro: t('cro', 'Croatia', 'hr'),
  ecu: t('ecu', 'Ecuador', 'ec'),
  egy: t('egy', 'Egypt', 'eg'),
  eng: t('eng', 'England', 'gb-eng'),
  esp: t('esp', 'Spain', 'es'),
  fra: t('fra', 'France', 'fr'),
  ger: t('ger', 'Germany', 'de'),
  gha: t('gha', 'Ghana', 'gh'),
  jpn: t('jpn', 'Japan', 'jp'),
  mar: t('mar', 'Morocco', 'ma'),
  mex: t('mex', 'Mexico', 'mx'),
  ned: t('ned', 'Netherlands', 'nl'),
  nor: t('nor', 'Norway', 'no'),
  par: t('par', 'Paraguay', 'py'),
  por: t('por', 'Portugal', 'pt'),
  rsa: t('rsa', 'South Africa', 'za'),
  sen: t('sen', 'Senegal', 'sn'),
  sui: t('sui', 'Switzerland', 'ch'),
  swe: t('swe', 'Sweden', 'se'),
  usa: t('usa', 'United States', 'us'),
};

const GROUPS_2026 = [
  group('A', ['arg', 'cro', 'nor', 'cpv'], {
    arg: s('arg', 3, 3, 0, 0, 7, 1),
    cro: s('cro', 3, 2, 0, 1, 4, 3),
    nor: s('nor', 3, 1, 0, 2, 3, 5),
    cpv: s('cpv', 3, 0, 0, 3, 1, 6),
  }),
  group('B', ['bra', 'sui', 'gha', 'aus'], {
    bra: s('bra', 3, 2, 1, 0, 5, 2),
    sui: s('sui', 3, 1, 2, 0, 3, 2),
    gha: s('gha', 3, 0, 2, 1, 2, 3),
    aus: s('aus', 3, 0, 1, 2, 1, 4),
  }),
  group('C', ['eng', 'col', 'egy', 'cod'], {
    eng: s('eng', 3, 2, 1, 0, 6, 2),
    col: s('col', 3, 2, 0, 1, 4, 3),
    egy: s('egy', 3, 1, 1, 1, 3, 3),
    cod: s('cod', 3, 0, 0, 3, 1, 6),
  }),
  group('D', ['fra', 'sen', 'aut', 'bih'], {
    fra: s('fra', 3, 3, 0, 0, 8, 1),
    sen: s('sen', 3, 1, 1, 1, 3, 4),
    aut: s('aut', 3, 1, 0, 2, 2, 5),
    bih: s('bih', 3, 0, 1, 2, 1, 4),
  }),
  group('E', ['ger', 'esp', 'par', 'jpn'], {
    ger: s('ger', 3, 2, 1, 0, 5, 2),
    esp: s('esp', 3, 2, 0, 1, 6, 3),
    jpn: s('jpn', 3, 1, 1, 1, 3, 4),
    par: s('par', 3, 0, 0, 3, 1, 6),
  }),
  group('F', ['ned', 'bel', 'ecu', 'mar'], {
    ned: s('ned', 3, 2, 1, 0, 4, 1),
    bel: s('bel', 3, 2, 0, 1, 5, 3),
    ecu: s('ecu', 3, 0, 1, 2, 2, 4),
    mar: s('mar', 3, 0, 2, 1, 1, 4),
  }),
  group('G', ['por', 'swe', 'rsa', 'alg'], {
    por: s('por', 3, 2, 1, 0, 5, 2),
    swe: s('swe', 3, 1, 1, 1, 3, 3),
    rsa: s('rsa', 3, 1, 0, 2, 2, 4),
    alg: s('alg', 3, 0, 2, 1, 1, 2),
  }),
  group('H', ['usa', 'mex', 'can', 'civ'], {
    usa: s('usa', 3, 2, 1, 0, 4, 1),
    mex: s('mex', 3, 1, 1, 1, 3, 3),
    can: s('can', 3, 1, 0, 2, 2, 4),
    civ: s('civ', 3, 0, 2, 1, 2, 3),
  }),
];

export const WORLD_CUP: WorldCupYearData = {
  year: 2026,
  host: 'USA/Mexico/Canada',
  champion: null,
  runnerUp: null,
  available: true,
  teams: TEAMS_2026,
  groups: GROUPS_2026,
};

const KNOCKOUT_TEAMS: Record<
  string,
  { id: string; name: string; iso: string; flag: string }
> = {
  alg: { id: 'alg', name: 'Algeria', iso: 'dz', flag: '🇩🇿' },
  arg: { id: 'arg', name: 'Argentina', iso: 'ar', flag: '🇦🇷' },
  aus: { id: 'aus', name: 'Australia', iso: 'au', flag: '🇦🇺' },
  aut: { id: 'aut', name: 'Austria', iso: 'at', flag: '🇦🇹' },
  bel: { id: 'bel', name: 'Belgium', iso: 'be', flag: '🇧🇪' },
  bih: { id: 'bih', name: 'Bosnia & H.', iso: 'ba', flag: '🇧🇦' },
  bra: { id: 'bra', name: 'Brazil', iso: 'br', flag: '🇧🇷' },
  can: { id: 'can', name: 'Canada', iso: 'ca', flag: '🇨🇦' },
  civ: { id: 'civ', name: "Côte d'Ivoire", iso: 'ci', flag: '🇨🇮' },
  cod: { id: 'cod', name: 'DR Congo', iso: 'cd', flag: '🇨🇩' },
  col: { id: 'col', name: 'Colombia', iso: 'co', flag: '🇨🇴' },
  cpv: { id: 'cpv', name: 'Cape Verde', iso: 'cv', flag: '🇨🇻' },
  cro: { id: 'cro', name: 'Croatia', iso: 'hr', flag: '🇭🇷' },
  ecu: { id: 'ecu', name: 'Ecuador', iso: 'ec', flag: '🇪🇨' },
  egy: { id: 'egy', name: 'Egypt', iso: 'eg', flag: '🇪🇬' },
  eng: { id: 'eng', name: 'England', iso: 'gb-eng', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  esp: { id: 'esp', name: 'Spain', iso: 'es', flag: '🇪🇸' },
  fra: { id: 'fra', name: 'France', iso: 'fr', flag: '🇫🇷' },
  ger: { id: 'ger', name: 'Germany', iso: 'de', flag: '🇩🇪' },
  gha: { id: 'gha', name: 'Ghana', iso: 'gh', flag: '🇬🇭' },
  jpn: { id: 'jpn', name: 'Japan', iso: 'jp', flag: '🇯🇵' },
  mar: { id: 'mar', name: 'Morocco', iso: 'ma', flag: '🇲🇦' },
  mex: { id: 'mex', name: 'Mexico', iso: 'mx', flag: '🇲🇽' },
  ned: { id: 'ned', name: 'Netherlands', iso: 'nl', flag: '🇳🇱' },
  nor: { id: 'nor', name: 'Norway', iso: 'no', flag: '🇳🇴' },
  par: { id: 'par', name: 'Paraguay', iso: 'py', flag: '🇵🇾' },
  por: { id: 'por', name: 'Portugal', iso: 'pt', flag: '🇵🇹' },
  rsa: { id: 'rsa', name: 'South Africa', iso: 'za', flag: '🇿🇦' },
  sen: { id: 'sen', name: 'Senegal', iso: 'sn', flag: '🇸🇳' },
  sui: { id: 'sui', name: 'Switzerland', iso: 'ch', flag: '🇨🇭' },
  swe: { id: 'swe', name: 'Sweden', iso: 'se', flag: '🇸🇪' },
  usa: { id: 'usa', name: 'USA', iso: 'us', flag: '🇺🇸' },
};

const PREDETERMINED: Record<string, string> = {
  // Round of 32
  cro_por: 'por',
  ger_par: 'par',
  fra_swe: 'fra',
  can_rsa: 'can',
  mar_ned: 'mar',
  aut_esp: 'esp',
  bih_usa: 'usa',
  bel_sen: 'bel',
  bra_jpn: 'bra',
  civ_nor: 'nor',
  ecu_mex: 'mex',
  cod_eng: 'eng',
  alg_sui: 'sui',
  aus_egy: 'egy',
  arg_cpv: 'arg',
  col_gha: 'col',
  // Round of 16
  fra_par: 'fra',
  can_mar: 'mar',
  bra_nor: 'nor',
  eng_mex: 'eng',
  esp_por: 'esp',
  bel_usa: 'bel',
  arg_egy: '',
  col_sui: '',
  // Quarter Final
  fra_mar: '',
  eng_nor: '',
  bel_esp: '',
  // Semi Final
  // Final
};

const BRACKET_RAW: BracketRaw = [
  [
    [
      [
        ['ger', 'par'],
        ['fra', 'swe'],
      ],
      [
        ['rsa', 'can'],
        ['ned', 'mar'],
      ],
    ],
    [
      [
        ['por', 'cro'],
        ['esp', 'aut'],
      ],
      [
        ['usa', 'bih'],
        ['bel', 'sen'],
      ],
    ],
  ],
  [
    [
      [
        ['bra', 'jpn'],
        ['civ', 'nor'],
      ],
      [
        ['mex', 'ecu'],
        ['eng', 'cod'],
      ],
    ],
    [
      [
        ['arg', 'cpv'],
        ['aus', 'egy'],
      ],
      [
        ['sui', 'alg'],
        ['col', 'gha'],
      ],
    ],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
