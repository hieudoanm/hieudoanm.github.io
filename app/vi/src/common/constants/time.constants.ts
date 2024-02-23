export type TimeRange = '1W' | '2W' | '1M' | '2M' | '3M' | '6M' | '1Y';

const ONE_DAY: number = 1000 * 60 * 60 * 24;
const ONE_WEEK: number = ONE_DAY * 7;
const TWO_WEEKS: number = ONE_DAY * 14;
const ONE_MONTH: number = ONE_DAY * 30;
const TWO_MONTHS: number = ONE_DAY * 60;
const THREE_MONTHS: number = ONE_DAY * 90;
const SIX_MONTHS: number = ONE_DAY * 180;
const ONE_YEAR: number = ONE_DAY * 365;
export const TIME_RANGES: Record<TimeRange, number> = {
  '1W': ONE_WEEK,
  '2W': TWO_WEEKS,
  '1M': ONE_MONTH,
  '2M': TWO_MONTHS,
  '3M': THREE_MONTHS,
  '6M': SIX_MONTHS,
  '1Y': ONE_YEAR,
};
