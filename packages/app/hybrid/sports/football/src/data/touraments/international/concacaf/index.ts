import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';
import { GOLD_CUP_1991, KNOCKOUT as KO_1991 } from './1991';
import { GOLD_CUP_1993, KNOCKOUT as KO_1993 } from './1993';
import { GOLD_CUP_1996, KNOCKOUT as KO_1996 } from './1996';
import { GOLD_CUP_1998, KNOCKOUT as KO_1998 } from './1998';
import { GOLD_CUP_2000, KNOCKOUT as KO_2000 } from './2000';
import { GOLD_CUP_2002, KNOCKOUT as KO_2002 } from './2002';
import { GOLD_CUP_2003, KNOCKOUT as KO_2003 } from './2003';
import { GOLD_CUP_2005, KNOCKOUT as KO_2005 } from './2005';
import { GOLD_CUP_2007, KNOCKOUT as KO_2007 } from './2007';
import { GOLD_CUP_2009, KNOCKOUT as KO_2009 } from './2009';
import { GOLD_CUP_2011, KNOCKOUT as KO_2011 } from './2011';
import { GOLD_CUP_2013, KNOCKOUT as KO_2013 } from './2013';
import { GOLD_CUP_2015, KNOCKOUT as KO_2015 } from './2015';
import { GOLD_CUP_2017, KNOCKOUT as KO_2017 } from './2017';
import { GOLD_CUP_2019, KNOCKOUT as KO_2019 } from './2019';
import { GOLD_CUP_2021, KNOCKOUT as KO_2021 } from './2021';
import { GOLD_CUP_2023, KNOCKOUT as KO_2023 } from './2023';
import { GOLD_CUP_2025, KNOCKOUT as KO_2025 } from './2025';

export type { ConcacafYearData, ConcacafKnockoutYearData } from './types';
export { s, t, group } from './types';

export const ALL_CONCACAF: ConcacafYearData[] = [
  GOLD_CUP_1991,
  GOLD_CUP_1993,
  GOLD_CUP_1996,
  GOLD_CUP_1998,
  GOLD_CUP_2000,
  GOLD_CUP_2002,
  GOLD_CUP_2003,
  GOLD_CUP_2005,
  GOLD_CUP_2007,
  GOLD_CUP_2009,
  GOLD_CUP_2011,
  GOLD_CUP_2013,
  GOLD_CUP_2015,
  GOLD_CUP_2017,
  GOLD_CUP_2019,
  GOLD_CUP_2021,
  GOLD_CUP_2023,
  GOLD_CUP_2025,
];

export const KNOCKOUT_DATA: Record<number, ConcacafKnockoutYearData> = {
  1991: KO_1991,
  1993: KO_1993,
  1996: KO_1996,
  1998: KO_1998,
  2000: KO_2000,
  2002: KO_2002,
  2003: KO_2003,
  2005: KO_2005,
  2007: KO_2007,
  2009: KO_2009,
  2011: KO_2011,
  2013: KO_2013,
  2015: KO_2015,
  2017: KO_2017,
  2019: KO_2019,
  2021: KO_2021,
  2023: KO_2023,
  2025: KO_2025,
};
