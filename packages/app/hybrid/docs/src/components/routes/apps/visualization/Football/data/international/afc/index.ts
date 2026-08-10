import type { AfcYearData, KnockoutYearData } from './types';
import { AFC_1956, KNOCKOUT as KO_1956 } from './1956';
import { AFC_1960, KNOCKOUT as KO_1960 } from './1960';
import { AFC_1964, KNOCKOUT as KO_1964 } from './1964';
import { AFC_1968, KNOCKOUT as KO_1968 } from './1968';
import { AFC_1972, KNOCKOUT as KO_1972 } from './1972';
import { AFC_1976, KNOCKOUT as KO_1976 } from './1976';
import { AFC_1980, KNOCKOUT as KO_1980 } from './1980';
import { AFC_1984, KNOCKOUT as KO_1984 } from './1984';
import { AFC_1988, KNOCKOUT as KO_1988 } from './1988';
import { AFC_1992, KNOCKOUT as KO_1992 } from './1992';
import { AFC_1996, KNOCKOUT as KO_1996 } from './1996';
import { AFC_2000, KNOCKOUT as KO_2000 } from './2000';
import { AFC_2004, KNOCKOUT as KO_2004 } from './2004';
import { AFC_2007, KNOCKOUT as KO_2007 } from './2007';
import { AFC_2011, KNOCKOUT as KO_2011 } from './2011';
import { AFC_2015, KNOCKOUT as KO_2015 } from './2015';
import { AFC_2019, KNOCKOUT as KO_2019 } from './2019';
import { AFC_2024, KNOCKOUT as KO_2024 } from './2024';

export type { AfcTeams, AfcYearData, KnockoutYearData } from './types';
export { s, t, group } from './types';

export const ALL_AFC: AfcYearData[] = [
  AFC_1956,
  AFC_1960,
  AFC_1964,
  AFC_1968,
  AFC_1972,
  AFC_1976,
  AFC_1980,
  AFC_1984,
  AFC_1988,
  AFC_1992,
  AFC_1996,
  AFC_2000,
  AFC_2004,
  AFC_2007,
  AFC_2011,
  AFC_2015,
  AFC_2019,
  AFC_2024,
];

export const KNOCKOUT_DATA: Record<number, KnockoutYearData> = {
  1972: KO_1972,
  1976: KO_1976,
  1980: KO_1980,
  1984: KO_1984,
  1988: KO_1988,
  1992: KO_1992,
  1996: KO_1996,
  2000: KO_2000,
  2004: KO_2004,
  2007: KO_2007,
  2011: KO_2011,
  2015: KO_2015,
  2019: KO_2019,
  2024: KO_2024,
};
