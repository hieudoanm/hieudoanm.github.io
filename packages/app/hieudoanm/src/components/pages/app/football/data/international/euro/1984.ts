import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type { EuroYearData, KnockoutYearData } from './types';

export const EURO_1984: EuroYearData = {
  year: 1984,
  host: 'France',
  champion: 'France',
  runnerUp: 'Spain',
  available: false,
  teams: {
    bel: t('bel', 'Belgium', 'be'),
    den: t('den', 'Denmark', 'dk'),
    esp: t('esp', 'Spain', 'es'),
    fra: t('fra', 'France', 'fr'),
    ger: t('ger', 'Germany', 'de'),
    por: t('por', 'Portugal', 'pt'),
    rou: t('rou', 'Romania', 'ro'),
    yug: t('yug', 'Yugoslavia', 'rs'),
  },
  groups: [
    group('1', ['fra', 'bel', 'den', 'yug'], {
      fra: s('fra', 3, 3, 0, 0, 9, 2),
      den: s('den', 3, 2, 0, 1, 8, 3),
      bel: s('bel', 3, 1, 0, 2, 4, 8),
      yug: s('yug', 3, 0, 0, 3, 2, 10),
    }),
    group('2', ['ger', 'rou', 'por', 'esp'], {
      esp: s('esp', 3, 1, 2, 0, 3, 2),
      por: s('por', 3, 1, 2, 0, 2, 1),
      ger: s('ger', 3, 1, 1, 1, 2, 2),
      rou: s('rou', 3, 0, 1, 2, 2, 4),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(EURO_1984.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi-finals
  fra_por: 'fra',
  den_esp: 'esp',
  // Final
  esp_fra: 'fra',
};

const BRACKET_RAW: BracketRaw = [
  ['fra', 'por'],
  ['den', 'esp'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
