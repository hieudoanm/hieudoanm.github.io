import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_1995: ChampionsLeagueYearData = {
  year: 1995,
  host: 'Europe',
  champion: 'Juventus',
  runnerUp: 'Ajax',
  available: true,
  teams: {
    juv: t('juv', 'Juventus', 'it'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    ste: t('ste', 'Steaua București', 'ro'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    spa: t('spa', 'Spartak Moscow', 'ru'),
    leg: t('leg', 'Legia Warsaw', 'pl'),
    ros: t('ros', 'Rosenborg', 'no'),
    bla: t('bla', 'Blackburn Rovers', 'gb-eng'),
    bar: t('bar', 'Barcelona', 'es'),
    pan: t('pan', 'Panathinaikos', 'gr'),
    aab: t('aab', 'AaB', 'dk'),
    fer: t('fer', 'Ferencváros', 'hu'),
    ajax: t('ajax', 'Ajax', 'nl'),
    rma: t('rma', 'Real Madrid', 'es'),
    gra: t('gra', 'Grasshoppers', 'ch'),
    nte: t('nte', 'Nantes', 'fr'),
  },
  groups: [
    group('A', ['juv', 'bvb', 'ste', 'ran'], {
      juv: s('juv', 6, 4, 1, 1, 11, 5),
      bvb: s('bvb', 6, 2, 3, 1, 8, 6),
      ste: s('ste', 6, 1, 3, 2, 7, 9),
      ran: s('ran', 6, 0, 3, 3, 5, 11),
    }),
    group('B', ['spa', 'leg', 'ros', 'bla'], {
      spa: s('spa', 6, 4, 0, 2, 13, 8),
      leg: s('leg', 6, 3, 0, 3, 9, 9),
      ros: s('ros', 6, 3, 0, 3, 10, 11),
      bla: s('bla', 6, 2, 0, 4, 7, 11),
    }),
    group('C', ['bar', 'pan', 'aab', 'fer'], {
      bar: s('bar', 6, 4, 0, 2, 14, 6),
      pan: s('pan', 6, 3, 1, 2, 7, 6),
      aab: s('aab', 6, 2, 1, 3, 8, 11),
      fer: s('fer', 6, 2, 0, 4, 7, 13),
    }),
    group('D', ['ajax', 'rma', 'gra', 'nte'], {
      ajax: s('ajax', 6, 5, 1, 0, 15, 2),
      rma: s('rma', 6, 3, 1, 2, 11, 7),
      gra: s('gra', 6, 1, 2, 3, 4, 12),
      nte: s('nte', 6, 0, 2, 4, 3, 12),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_1995.teams);

const PREDETERMINED: Record<string, string> = {
  juv_pan: 'juv',
  bar_bvb: 'bvb',
  nte_spa: 'spa',
  ajax_leg: 'ajax',
  ajax_spa: 'ajax',
  bvb_juv: 'juv',
  ajax_juv: 'juv',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['ajax', 'leg'],
    ['spa', 'nte'],
  ],
  [
    ['juv', 'pan'],
    ['bvb', 'bar'],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
