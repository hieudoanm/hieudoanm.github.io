import { t, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { KnockoutYearData, WorldCupYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1938,
  host: 'France',
  champion: 'Italy',
  runnerUp: 'Hungary',
  available: false,
  teams: {
    ita: t('ita', 'Italy', 'it'),
    nor: t('nor', 'Norway', 'no'),
    fra: t('fra', 'France', 'fr'),
    bel: t('bel', 'Belgium', 'be'),
    bra: t('bra', 'Brazil', 'br'),
    pol: t('pol', 'Poland', 'pl'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
    ned: t('ned', 'Netherlands', 'nl'),
    hun: t('hun', 'Hungary', 'hu'),
    hdo: t('hdo', 'Dutch East Indies', 'id'),
    swe: t('swe', 'Sweden', 'se'),
    cub: t('cub', 'Cuba', 'cu'),
    rom: t('rom', 'Romania', 'ro'),
    sui: t('sui', 'Switzerland', 'ch'),
    ger: t('ger', 'Germany', 'de'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(WORLD_CUP.teams);

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['ita', 'nor'],
      ['fra', 'bel'],
    ],
    [
      ['bra', 'pol'],
      ['tch', 'ned'],
    ],
  ],
  [
    [
      ['hun', 'hdo'],
      ['sui', 'ger'],
    ],
    ['swe', ['cub', 'rom']],
  ],
];

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  ita_nor: 'ita',
  bel_fra: 'fra',
  bra_pol: 'bra',
  ned_tch: 'tch',
  hdo_hun: 'hun',
  ger_sui: 'sui',
  cub_rom: 'cub',
  // Quarter Final
  fra_ita: 'ita',
  bra_tch: 'bra',
  hun_sui: 'hun',
  cub_swe: 'swe',
  // Semi Final
  bra_ita: 'ita',
  hun_swe: 'hun',
  // Final
  hun_ita: 'ita',
  // Third Place
  bra_swe: 'bra',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
