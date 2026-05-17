import type { BracketRaw } from '../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfcYearData, KnockoutYearData } from './types';

export const AFC_1976: AfcYearData = {
  year: 1976,
  host: 'Iran',
  champion: 'Iran',
  runnerUp: 'Kuwait',
  available: false,
  teams: {
    CHP: t('CHP', 'China PR', 'ch'),
    IRN: t('IRN', 'Iran', 'ir'),
    IRQ: t('IRQ', 'Iraq', 'iq'),
    KUW: t('KUW', 'Kuwait', 'kw'),
    MAS: t('MAS', 'Malaysia', 'my'),
    YED: t('YED', 'Yemen DPR', 'ye'),
  },
  groups: [
    group('A', ['KUW', 'MAS', 'CHP'], {
      KUW: s('KUW', 2, 2, 0, 0, 3, 0),
      MAS: s('MAS', 2, 0, 1, 1, 1, 3),
      CHP: s('CHP', 2, 0, 1, 1, 1, 2),
    }),
    group('B', ['IRN', 'IRQ', 'YED'], {
      IRN: s('IRN', 2, 2, 0, 0, 10, 0),
      IRQ: s('IRQ', 2, 1, 0, 1, 1, 2),
      YED: s('YED', 2, 0, 0, 2, 0, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFC_1976.teams);

const PREDETERMINED: Record<string, string> = {
  // Semi Final
  CHP_IRN: 'IRN',
  IRQ_KUW: 'KUW',
  // Final
  CHP_IRQ: 'CHP',
  IRN_KUW: 'IRN',
};

const THIRD_PLACE: [string, string] = ['CHP', 'IRQ'];

const BRACKET_RAW: BracketRaw = [
  ['IRN', 'CHP'],
  ['IRQ', 'KUW'],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
