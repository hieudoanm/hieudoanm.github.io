import type { CopaYearData, KnockoutYearData } from './types';
import { COPA_1916, KNOCKOUT as KO_1916 } from './1916';
import { COPA_1917, KNOCKOUT as KO_1917 } from './1917';
import { COPA_1919, KNOCKOUT as KO_1919 } from './1919';
import { COPA_1920, KNOCKOUT as KO_1920 } from './1920';
import { COPA_1921, KNOCKOUT as KO_1921 } from './1921';
import { COPA_1922, KNOCKOUT as KO_1922 } from './1922';
import { COPA_1923, KNOCKOUT as KO_1923 } from './1923';
import { COPA_1924, KNOCKOUT as KO_1924 } from './1924';
import { COPA_1925, KNOCKOUT as KO_1925 } from './1925';
import { COPA_1926, KNOCKOUT as KO_1926 } from './1926';
import { COPA_1927, KNOCKOUT as KO_1927 } from './1927';
import { COPA_1929, KNOCKOUT as KO_1929 } from './1929';
import { COPA_1935, KNOCKOUT as KO_1935 } from './1935';
import { COPA_1936, KNOCKOUT as KO_1936 } from './1936';
import { COPA_1937, KNOCKOUT as KO_1937 } from './1937';
import { COPA_1939, KNOCKOUT as KO_1939 } from './1939';
import { COPA_1941, KNOCKOUT as KO_1941 } from './1941';
import { COPA_1942, KNOCKOUT as KO_1942 } from './1942';
import { COPA_1945, KNOCKOUT as KO_1945 } from './1945';
import { COPA_1946, KNOCKOUT as KO_1946 } from './1946';
import { COPA_1947, KNOCKOUT as KO_1947 } from './1947';
import { COPA_1949, KNOCKOUT as KO_1949 } from './1949';
import { COPA_1953, KNOCKOUT as KO_1953 } from './1953';
import { COPA_1955, KNOCKOUT as KO_1955 } from './1955';
import { COPA_1956, KNOCKOUT as KO_1956 } from './1956';
import { COPA_1957, KNOCKOUT as KO_1957 } from './1957';
import { COPA_1959, KNOCKOUT as KO_1959 } from './1959';
import { COPA_1963, KNOCKOUT as KO_1963 } from './1963';
import { COPA_1967, KNOCKOUT as KO_1967 } from './1967';
import { COPA_1975, KNOCKOUT as KO_1975 } from './1975';
import { COPA_1979, KNOCKOUT as KO_1979 } from './1979';
import { COPA_1983, KNOCKOUT as KO_1983 } from './1983';
import { COPA_1987, KNOCKOUT as KO_1987 } from './1987';
import { COPA_1989, KNOCKOUT as KO_1989 } from './1989';
import { COPA_1991, KNOCKOUT as KO_1991 } from './1991';
import { COPA_1993, KNOCKOUT as KO_1993 } from './1993';
import { COPA_1995, KNOCKOUT as KO_1995 } from './1995';
import { COPA_1997, KNOCKOUT as KO_1997 } from './1997';
import { COPA_1999, KNOCKOUT as KO_1999 } from './1999';
import { COPA_2001, KNOCKOUT as KO_2001 } from './2001';
import { COPA_2004, KNOCKOUT as KO_2004 } from './2004';
import { COPA_2007, KNOCKOUT as KO_2007 } from './2007';
import { COPA_2011, KNOCKOUT as KO_2011 } from './2011';
import { COPA_2015, KNOCKOUT as KO_2015 } from './2015';
import { COPA_2016, KNOCKOUT as KO_2016 } from './2016';
import { COPA_2019, KNOCKOUT as KO_2019 } from './2019';
import { COPA_2021, KNOCKOUT as KO_2021 } from './2021';
import { COPA_2024, KNOCKOUT as KO_2024 } from './2024';

export type { CopaTeams, CopaYearData, KnockoutYearData } from './types';
export { s, t, group } from './types';

export const ALL_COPA: CopaYearData[] = [
  COPA_1916,
  COPA_1917,
  COPA_1919,
  COPA_1920,
  COPA_1921,
  COPA_1922,
  COPA_1923,
  COPA_1924,
  COPA_1925,
  COPA_1926,
  COPA_1927,
  COPA_1929,
  COPA_1935,
  COPA_1936,
  COPA_1937,
  COPA_1939,
  COPA_1941,
  COPA_1942,
  COPA_1945,
  COPA_1946,
  COPA_1947,
  COPA_1949,
  COPA_1953,
  COPA_1955,
  COPA_1956,
  COPA_1957,
  COPA_1959,
  COPA_1963,
  COPA_1967,
  COPA_1975,
  COPA_1979,
  COPA_1983,
  COPA_1987,
  COPA_1989,
  COPA_1991,
  COPA_1993,
  COPA_1995,
  COPA_1997,
  COPA_1999,
  COPA_2001,
  COPA_2004,
  COPA_2007,
  COPA_2011,
  COPA_2015,
  COPA_2016,
  COPA_2019,
  COPA_2021,
  COPA_2024,
];

export const KNOCKOUT_DATA: Record<number, KnockoutYearData> = {
  1975: KO_1975,
  1979: KO_1979,
  1983: KO_1983,
  1987: KO_1987,
  1993: KO_1993,
  1995: KO_1995,
  1997: KO_1997,
  1999: KO_1999,
  2001: KO_2001,
  2004: KO_2004,
  2007: KO_2007,
  2011: KO_2011,
  2015: KO_2015,
  2016: KO_2016,
  2019: KO_2019,
  2021: KO_2021,
  2024: KO_2024,
};
