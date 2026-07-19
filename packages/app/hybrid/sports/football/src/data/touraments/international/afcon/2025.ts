import { s, t, group } from './types';
import type { AfconYearData, KnockoutYearData } from './types';

export const AFCON_2025: AfconYearData = {
  year: 2025,
  host: 'Morocco',
  champion: null,
  runnerUp: null,
  available: false,
  teams: {
    ALG: t('ALG', 'Algeria', 'dz'),
    ANG: t('ANG', 'Angola', 'ao'),
    BEN: t('BEN', 'Benin', 'be'),
    BFA: t('BFA', 'Burkina Faso', 'bf'),
    BOT: t('BOT', 'Botswana', 'bo'),
    CIV: t('CIV', 'Ivory Coast', 'ci'),
    CMR: t('CMR', 'Cameroon', 'cm'),
    COD: t('COD', 'DR Congo', 'cd'),
    COM: t('COM', 'Comoros', 'km'),
    EGY: t('EGY', 'Egypt', 'eg'),
    EQG: t('EQG', 'Equatorial Guinea', 'gq'),
    GAB: t('GAB', 'Gabon', 'ga'),
    MAR: t('MAR', 'Morocco', 'ma'),
    MLI: t('MLI', 'Mali', 'ml'),
    MOZ: t('MOZ', 'Mozambique', 'mz'),
    NGA: t('NGA', 'Nigeria', 'ng'),
    RSA: t('RSA', 'South Africa', 'za'),
    SDN: t('SDN', 'Sudan', 'sd'),
    SEN: t('SEN', 'Senegal', 'sn'),
    TAN: t('TAN', 'Tanzania', 'tz'),
    TUN: t('TUN', 'Tunisia', 'tn'),
    UGA: t('UGA', 'Uganda', 'ug'),
    ZAM: t('ZAM', 'Zambia', 'zm'),
    ZIM: t('ZIM', 'Zimbabwe', 'zw'),
  },
  groups: [],
};

export const KNOCKOUT: KnockoutYearData | null = null;
