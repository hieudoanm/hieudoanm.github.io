import type { WorldCupYearData, KnockoutYearData } from './types';
import { WORLD_CUP as WC_1930, KNOCKOUT as KO_1930 } from './1930';
import { WORLD_CUP as WC_1934, KNOCKOUT as KO_1934 } from './1934';
import { WORLD_CUP as WC_1938, KNOCKOUT as KO_1938 } from './1938';
import { WORLD_CUP as WC_1950, KNOCKOUT as KO_1950 } from './1950';
import { WORLD_CUP as WC_1954, KNOCKOUT as KO_1954 } from './1954';
import { WORLD_CUP as WC_1958, KNOCKOUT as KO_1958 } from './1958';
import { WORLD_CUP as WC_1962, KNOCKOUT as KO_1962 } from './1962';
import { WORLD_CUP as WC_1966, KNOCKOUT as KO_1966 } from './1966';
import { WORLD_CUP as WC_1970, KNOCKOUT as KO_1970 } from './1970';
import { WORLD_CUP as WC_1974, KNOCKOUT as KO_1974 } from './1974';
import { WORLD_CUP as WC_1978, KNOCKOUT as KO_1978 } from './1978';
import { WORLD_CUP as WC_1982, KNOCKOUT as KO_1982 } from './1982';
import { WORLD_CUP as WC_1986, KNOCKOUT as KO_1986 } from './1986';
import { WORLD_CUP as WC_1990, KNOCKOUT as KO_1990 } from './1990';
import { WORLD_CUP as WC_1994, KNOCKOUT as KO_1994 } from './1994';
import { WORLD_CUP as WC_1998, KNOCKOUT as KO_1998 } from './1998';
import { WORLD_CUP as WC_2002, KNOCKOUT as KO_2002 } from './2002';
import { WORLD_CUP as WC_2006, KNOCKOUT as KO_2006 } from './2006';
import { WORLD_CUP as WC_2010, KNOCKOUT as KO_2010 } from './2010';
import { WORLD_CUP as WC_2014, KNOCKOUT as KO_2014 } from './2014';
import { WORLD_CUP as WC_2018, KNOCKOUT as KO_2018 } from './2018';
import { WORLD_CUP as WC_2022, KNOCKOUT as KO_2022 } from './2022';
import { WORLD_CUP as WC_2026, KNOCKOUT as KO_2026 } from './2026';

export type {
  WorldCupTeams,
  WorldCupYearData,
  KnockoutYearData,
} from './types';
export { s, t, group } from './types';

export const ALL_WORLD_CUPS: WorldCupYearData[] = [
  WC_1930,
  WC_1934,
  WC_1938,
  WC_1950,
  WC_1954,
  WC_1958,
  WC_1962,
  WC_1966,
  WC_1970,
  WC_1974,
  WC_1978,
  WC_1982,
  WC_1986,
  WC_1990,
  WC_1994,
  WC_1998,
  WC_2002,
  WC_2006,
  WC_2010,
  WC_2014,
  WC_2018,
  WC_2022,
  WC_2026,
];

export const KNOCKOUT_DATA: Record<number, KnockoutYearData> = {
  1930: KO_1930,
  1934: KO_1934,
  1938: KO_1938,
  1954: KO_1954,
  1958: KO_1958,
  1962: KO_1962,
  1966: KO_1966,
  1970: KO_1970,
  1974: KO_1974,
  1978: KO_1978,
  1982: KO_1982,
  1986: KO_1986,
  1990: KO_1990,
  1994: KO_1994,
  1998: KO_1998,
  2002: KO_2002,
  2006: KO_2006,
  2010: KO_2010,
  2014: KO_2014,
  2018: KO_2018,
  2022: KO_2022,
  2026: KO_2026,
};
