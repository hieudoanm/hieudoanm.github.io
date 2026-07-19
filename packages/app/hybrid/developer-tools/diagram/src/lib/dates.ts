const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAY_MS = 86_400_000;

export const isValidDate = (value: string): boolean => parseDay(value) !== null;

export const parseDay = (value: string): number | null => {
  const match = DATE_PATTERN.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return Math.round(date.getTime() / DAY_MS);
};

export const dayToDate = (day: number): Date => new Date(day * DAY_MS);

export const formatDay = (day: number): string => {
  const date = dayToDate(day);
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`;
};

export const formatDayFull = (day: number): string => {
  const date = dayToDate(day);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dayPart = String(date.getUTCDate()).padStart(2, '0');
  return `${date.getUTCFullYear()}-${month}-${dayPart}`;
};
