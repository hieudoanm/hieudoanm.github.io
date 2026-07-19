import type { EuroYearData, KnockoutYearData } from './types';
import { EURO_1960, KNOCKOUT as KO_1960 } from './1960';
import { EURO_1964, KNOCKOUT as KO_1964 } from './1964';
import { EURO_1968, KNOCKOUT as KO_1968 } from './1968';
import { EURO_1972, KNOCKOUT as KO_1972 } from './1972';
import { EURO_1976, KNOCKOUT as KO_1976 } from './1976';
import { EURO_1980, KNOCKOUT as KO_1980 } from './1980';
import { EURO_1984, KNOCKOUT as KO_1984 } from './1984';
import { EURO_1988, KNOCKOUT as KO_1988 } from './1988';
import { EURO_1992, KNOCKOUT as KO_1992 } from './1992';
import { EURO_1996, KNOCKOUT as KO_1996 } from './1996';
import { EURO_2000, KNOCKOUT as KO_2000 } from './2000';
import { EURO_2004, KNOCKOUT as KO_2004 } from './2004';
import { EURO_2008, KNOCKOUT as KO_2008 } from './2008';
import { EURO_2012, KNOCKOUT as KO_2012 } from './2012';
import { EURO_2016, KNOCKOUT as KO_2016 } from './2016';
import { EURO_2021, KNOCKOUT as KO_2021 } from './2021';
import { EURO_2024, KNOCKOUT as KO_2024 } from './2024';

export type { EuroTeams, EuroYearData, KnockoutYearData } from './types';
export { s, t, group } from './types';

export const ALL_EUROS: EuroYearData[] = [
  EURO_1960,
  EURO_1964,
  EURO_1968,
  EURO_1972,
  EURO_1976,
  EURO_1980,
  EURO_1984,
  EURO_1988,
  EURO_1992,
  EURO_1996,
  EURO_2000,
  EURO_2004,
  EURO_2008,
  EURO_2012,
  EURO_2016,
  EURO_2021,
  EURO_2024,
];

export const KNOCKOUT_DATA: Record<number, KnockoutYearData> = {
  1960: KO_1960,
  1964: KO_1964,
  1968: KO_1968,
  1972: KO_1972,
  1976: KO_1976,
  1980: KO_1980,
  1984: KO_1984,
  1988: KO_1988,
  1992: KO_1992,
  1996: KO_1996,
  2000: KO_2000,
  2004: KO_2004,
  2008: KO_2008,
  2012: KO_2012,
  2016: KO_2016,
  2021: KO_2021,
  2024: KO_2024,
};
