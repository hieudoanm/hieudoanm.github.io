import { s, t, group } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2026: AfconYearData = {
  year: 2026,
  host: 'Morocco',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    BEN: t('BEN', 'Benin', 'be'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    EGY: t('EGY', 'Egypt', 'eg'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    MOZ: t('MOZ', 'Mozambique', 'mz'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    RSA: t('RSA', 'South Africa', 'za'),
    SDN: t('SDN', 'Sudan', 'sd'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TAN: t('TAN', 'Tanzania', 'tz'),
    TUN: t('TUN', 'Tunisia', 'tn'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
