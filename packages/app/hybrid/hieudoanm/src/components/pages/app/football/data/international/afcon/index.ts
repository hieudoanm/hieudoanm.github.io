import type { AfconYearData, KnockoutYearData } from './types';
import { AFCON_1957, KNOCKOUT as KO_1957 } from './1957';
import { AFCON_1959, KNOCKOUT as KO_1959 } from './1959';
import { AFCON_1962, KNOCKOUT as KO_1962 } from './1962';
import { AFCON_1963, KNOCKOUT as KO_1963 } from './1963';
import { AFCON_1965, KNOCKOUT as KO_1965 } from './1965';
import { AFCON_1968, KNOCKOUT as KO_1968 } from './1968';
import { AFCON_1970, KNOCKOUT as KO_1970 } from './1970';
import { AFCON_1972, KNOCKOUT as KO_1972 } from './1972';
import { AFCON_1974, KNOCKOUT as KO_1974 } from './1974';
import { AFCON_1976, KNOCKOUT as KO_1976 } from './1976';
import { AFCON_1978, KNOCKOUT as KO_1978 } from './1978';
import { AFCON_1980, KNOCKOUT as KO_1980 } from './1980';
import { AFCON_1982, KNOCKOUT as KO_1982 } from './1982';
import { AFCON_1984, KNOCKOUT as KO_1984 } from './1984';
import { AFCON_1986, KNOCKOUT as KO_1986 } from './1986';
import { AFCON_1988, KNOCKOUT as KO_1988 } from './1988';
import { AFCON_1990, KNOCKOUT as KO_1990 } from './1990';
import { AFCON_1992, KNOCKOUT as KO_1992 } from './1992';
import { AFCON_1994, KNOCKOUT as KO_1994 } from './1994';
import { AFCON_1996, KNOCKOUT as KO_1996 } from './1996';
import { AFCON_1998, KNOCKOUT as KO_1998 } from './1998';
import { AFCON_2000, KNOCKOUT as KO_2000 } from './2000';
import { AFCON_2002, KNOCKOUT as KO_2002 } from './2002';
import { AFCON_2004, KNOCKOUT as KO_2004 } from './2004';
import { AFCON_2006, KNOCKOUT as KO_2006 } from './2006';
import { AFCON_2008, KNOCKOUT as KO_2008 } from './2008';
import { AFCON_2010, KNOCKOUT as KO_2010 } from './2010';
import { AFCON_2012, KNOCKOUT as KO_2012 } from './2012';
import { AFCON_2013, KNOCKOUT as KO_2013 } from './2013';
import { AFCON_2015, KNOCKOUT as KO_2015 } from './2015';
import { AFCON_2017, KNOCKOUT as KO_2017 } from './2017';
import { AFCON_2019, KNOCKOUT as KO_2019 } from './2019';
import { AFCON_2022, KNOCKOUT as KO_2022 } from './2022';
import { AFCON_2024, KNOCKOUT as KO_2024 } from './2024';
import { AFCON_2025, KNOCKOUT as KO_2025 } from './2025';
import { AFCON_2026, KNOCKOUT as KO_2026 } from './2026';

export type { AfconTeams, AfconYearData, KnockoutYearData } from './types';
export { s, t, group } from './types';

export const ALL_AFCON: AfconYearData[] = [
  AFCON_1957,
  AFCON_1959,
  AFCON_1962,
  AFCON_1963,
  AFCON_1965,
  AFCON_1968,
  AFCON_1970,
  AFCON_1972,
  AFCON_1974,
  AFCON_1976,
  AFCON_1978,
  AFCON_1980,
  AFCON_1982,
  AFCON_1984,
  AFCON_1986,
  AFCON_1988,
  AFCON_1990,
  AFCON_1992,
  AFCON_1994,
  AFCON_1996,
  AFCON_1998,
  AFCON_2000,
  AFCON_2002,
  AFCON_2004,
  AFCON_2006,
  AFCON_2008,
  AFCON_2010,
  AFCON_2012,
  AFCON_2013,
  AFCON_2015,
  AFCON_2017,
  AFCON_2019,
  AFCON_2022,
  AFCON_2024,
  AFCON_2025,
  AFCON_2026,
];

export const KNOCKOUT_DATA: Record<number, KnockoutYearData> = {
  1957: KO_1957,
  1962: KO_1962,
  1963: KO_1963,
  1965: KO_1965,
  1968: KO_1968,
  1970: KO_1970,
  1972: KO_1972,
  1974: KO_1974,
  1978: KO_1978,
  1980: KO_1980,
  1982: KO_1982,
  1984: KO_1984,
  1986: KO_1986,
  1988: KO_1988,
  1990: KO_1990,
  1992: KO_1992,
  1994: KO_1994,
  1996: KO_1996,
  1998: KO_1998,
  2000: KO_2000,
  2002: KO_2002,
  2004: KO_2004,
  2006: KO_2006,
  2008: KO_2008,
  2010: KO_2010,
  2012: KO_2012,
  2013: KO_2013,
  2015: KO_2015,
  2017: KO_2017,
  2019: KO_2019,
  2022: KO_2022,
  2024: KO_2024,
};
