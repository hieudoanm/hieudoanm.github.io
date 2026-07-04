export const isLeapYear = (year: number): boolean =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

export const daysOfMonths: number[] = [
  31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

export const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const START_YEAR = 1970;
export const END_YEAR = 2100;
export const years = new Array(END_YEAR - START_YEAR + 1)
  .fill(0)
  .map((_, i) => START_YEAR + i);

export enum View {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  HALF = 'half',
}
