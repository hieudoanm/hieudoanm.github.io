import { t, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../pages/knock-out/types';
import type { KnockoutYearData, WorldCupYearData } from './types';

export const WORLD_CUP: WorldCupYearData = {
  year: 1934,
  host: 'Italy',
  champion: 'Italy',
  runnerUp: 'Czechoslovakia',
  available: false,
  teams: {
    ita: t('ita', 'Italy', 'it'),
    esp: t('esp', 'Spain', 'es'),
    aut: t('aut', 'Austria', 'at'),
    hun: t('hun', 'Hungary', 'hu'),
    ger: t('ger', 'Germany', 'de'),
    swe: t('swe', 'Sweden', 'se'),
    tch: t('tch', 'Czechoslovakia', 'cz'),
    sui: t('sui', 'Switzerland', 'ch'),
    fra: t('fra', 'France', 'fr'),
    ned: t('ned', 'Netherlands', 'nl'),
    bel: t('bel', 'Belgium', 'be'),
    rom: t('rom', 'Romania', 'ro'),
    bra: t('bra', 'Brazil', 'br'),
    arg: t('arg', 'Argentina', 'ar'),
    usa: t('usa', 'United States', 'us'),
    egy: t('egy', 'Egypt', 'eg'),
  },
  groups: [],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(WORLD_CUP.teams);

const BRACKET_RAW: BracketRaw = [
  [
    [
      ['ita', 'usa'],
      ['esp', 'bra'],
    ],
    [
      ['aut', 'fra'],
      ['hun', 'egy'],
    ],
  ],
  [
    [
      ['ger', 'bel'],
      ['swe', 'arg'],
    ],
    [
      ['tch', 'rom'],
      ['sui', 'ned'],
    ],
  ],
];

const PREDETERMINED: Record<string, string> = {
  // Round of 16
  ita_usa: 'ita',
  bra_esp: 'esp',
  aut_fra: 'aut',
  egy_hun: 'hun',
  bel_ger: 'ger',
  arg_swe: 'swe',
  rom_tch: 'tch',
  ned_sui: 'sui',
  // Quarter Final
  esp_ita: 'ita',
  aut_hun: 'aut',
  ger_swe: 'ger',
  sui_tch: 'tch',
  // Semi Final
  aut_ita: 'ita',
  ger_tch: 'tch',
  // Final
  ita_tch: 'ita',
  // Third Place
  aut_ger: 'ger',
};

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
