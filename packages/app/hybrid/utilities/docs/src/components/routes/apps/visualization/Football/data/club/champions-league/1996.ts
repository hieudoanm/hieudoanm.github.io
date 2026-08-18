import { s, t, group, toKnockoutTeams } from './types';
import type { BracketRaw } from '../../../pages/knock-out/types';
import type {
  ChampionsLeagueYearData,
  ChampionsLeagueKnockoutYearData,
} from './types';

export const CHAMPIONS_LEAGUE_1996: ChampionsLeagueYearData = {
  year: 1996,
  host: 'Europe',
  champion: 'Borussia Dortmund',
  runnerUp: 'Juventus',
  available: true,
  teams: {
    aux: t('aux', 'Auxerre', 'fr'),
    ajax: t('ajax', 'Ajax', 'nl'),
    gra: t('gra', 'Grasshoppers', 'ch'),
    ran: t('ran', 'Rangers', 'gb-sct'),
    juv: t('juv', 'Juventus', 'it'),
    mun: t('mun', 'Manchester United', 'gb-eng'),
    fen: t('fen', 'Fenerbahçe', 'tr'),
    rap: t('rap', 'Rapid Vienna', 'at'),
    bvb: t('bvb', 'Borussia Dortmund', 'de'),
    atm: t('atm', 'Atlético Madrid', 'es'),
    wid: t('wid', 'Widzew Łódź', 'pl'),
    ste: t('ste', 'Steaua București', 'ro'),
    por: t('por', 'Porto', 'pt'),
    acm: t('acm', 'Milan', 'it'),
    ros: t('ros', 'Rosenborg', 'no'),
    got: t('got', 'IFK Göteborg', 'se'),
  },
  groups: [
    group('A', ['aux', 'ajax', 'gra', 'ran'], {
      aux: s('aux', 6, 4, 1, 1, 9, 5),
      ajax: s('ajax', 6, 4, 0, 2, 12, 5),
      gra: s('gra', 6, 3, 0, 3, 8, 10),
      ran: s('ran', 6, 0, 1, 5, 5, 14),
    }),
    group('B', ['juv', 'mun', 'fen', 'rap'], {
      juv: s('juv', 6, 5, 1, 0, 11, 1),
      mun: s('mun', 6, 3, 1, 2, 7, 5),
      fen: s('fen', 6, 1, 2, 3, 3, 8),
      rap: s('rap', 6, 0, 2, 4, 2, 9),
    }),
    group('C', ['bvb', 'atm', 'wid', 'ste'], {
      bvb: s('bvb', 6, 5, 0, 1, 16, 4),
      atm: s('atm', 6, 4, 0, 2, 11, 6),
      wid: s('wid', 6, 1, 0, 5, 6, 13),
      ste: s('ste', 6, 2, 0, 4, 5, 15),
    }),
    group('D', ['por', 'acm', 'ros', 'got'], {
      por: s('por', 6, 4, 1, 1, 10, 4),
      acm: s('acm', 6, 3, 1, 2, 8, 5),
      ros: s('ros', 6, 1, 1, 4, 6, 12),
      got: s('got', 6, 0, 3, 3, 4, 9),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(CHAMPIONS_LEAGUE_1996.teams);

const PREDETERMINED: Record<string, string> = {
  ajax_bvb: 'bvb',
  juv_ros: 'juv',
  acm_aux: 'aux',
  atm_por: 'por',
  aux_bvb: 'bvb',
  juv_por: 'juv',
  bvb_juv: 'bvb',
};

const BRACKET_RAW: BracketRaw = [
  [
    ['bvb', 'ajax'],
    ['aux', 'acm'],
  ],
  [
    ['juv', 'ros'],
    ['por', 'atm'],
  ],
];

export const KNOCKOUT: ChampionsLeagueKnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
