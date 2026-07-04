import type { BracketRaw } from '../../../pages/knock-out/types';
import { s, t, group, toKnockoutTeams } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2010: AfconYearData = {
  year: 2010,
  host: 'Angola',
  champion: 'Egypt',
  runnerUp: 'Ghana',
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    ANG: t('ANG', 'Angola', 'ao'),
    BEN: t('BEN', 'Benin', 'be'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    EGY: t('EGY', 'Egypt', 'eg'),
    GAB: t('GAB', 'Gabon', 'ga'),
    GHA: t('GHA', 'Ghana', 'gh'),
    MLI: t('MLI', 'Mali', 'ml'),
    MOZ: t('MOZ', 'Mozambique', 'mz'),
    MWI: t('MWI', 'Malawi', 'mw'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
  },
  groups: [
    group('A', ['ANG', 'MLI', 'ALG', 'MWI'], {
      ANG: s('ANG', 3, 1, 2, 0, 6, 4),
      MLI: s('MLI', 3, 1, 1, 1, 7, 6),
      ALG: s('ALG', 3, 1, 1, 1, 1, 3),
      MWI: s('MWI', 3, 1, 0, 2, 4, 5),
    }),
    group('B', ['CIV', 'GHA', 'BFA'], {
      CIV: s('CIV', 2, 1, 1, 0, 3, 1),
      GHA: s('GHA', 2, 1, 0, 1, 2, 3),
      BFA: s('BFA', 2, 0, 1, 1, 0, 1),
    }),
    group('C', ['EGY', 'NGA', 'MOZ', 'BEN'], {
      EGY: s('EGY', 3, 3, 0, 0, 7, 1),
      NGA: s('NGA', 3, 2, 0, 1, 5, 3),
      MOZ: s('MOZ', 3, 0, 1, 2, 2, 7),
      BEN: s('BEN', 3, 0, 1, 2, 2, 5),
    }),
    group('D', ['CMR', 'GAB', 'ZAM', 'TUN'], {
      CMR: s('CMR', 3, 1, 1, 1, 5, 5),
      GAB: s('GAB', 3, 1, 1, 1, 2, 2),
      ZAM: s('ZAM', 3, 1, 1, 1, 5, 5),
      TUN: s('TUN', 3, 0, 3, 0, 3, 3),
    }),
  ],
};

const KNOCKOUT_TEAMS = toKnockoutTeams(AFCON_2010.teams);

const PREDETERMINED: Record<string, string> = {
  // Quarter Final
  ALG_CIV: 'ALG',
  ANG_GHA: 'GHA',
  CMR_EGY: 'EGY',
  NGA_ZAM: 'NGA',
  // Final
  ALG_EGY: 'EGY',
  ALG_NGA: 'NGA',
  EGY_GHA: 'EGY',
  GHA_NGA: 'GHA',
};

const THIRD_PLACE: [string, string] = ['NGA', 'ALG'];

const BRACKET_RAW: BracketRaw = [
  [
    ['ANG', 'GHA'],
    ['CIV', 'ALG'],
  ],
  [
    ['EGY', 'CMR'],
    ['ZAM', 'NGA'],
  ],
];

export const KNOCKOUT: KnockoutYearData = {
  teams: KNOCKOUT_TEAMS,
  predetermined: PREDETERMINED,
  bracket: BRACKET_RAW,
};
