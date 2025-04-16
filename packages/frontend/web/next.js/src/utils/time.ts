import { addZero } from './number';
import { capitalise } from './string';
import { tryCatch } from './try-catch';

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

export const shortMonths: string[] = [
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

export const weekdays: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getOrdinalSuffix = (weekday: number): string => {
  const j = weekday % 10;
  const k = weekday % 100;

  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
};

export const getNumberOfDaysPerMonth = (year: number): number[] => {
  return [
    31, // January
    new Date(year, 1, 29).getMonth() === 1 ? 29 : 28, // February
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31, // December
  ];
};

export const buildReadableString = (date: Date): string => {
  const dateString: string = `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const time: string = `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
  return `${dateString} ${time}`;
};

export const getTimezone = (): number => {
  const date: Date = new Date();
  const timezoneOffset: number = date.getTimezoneOffset();
  return timezoneOffset / -60;
};

export const ONE_SECOND: number = 1000;
export const ONE_MINUTE: number = ONE_SECOND * 60;
export const ONE_HOUR: number = ONE_MINUTE * 60;
export const ONE_DAY: number = ONE_HOUR * 24;
export const ONE_WEEK: number = ONE_DAY * 7;

const buildEpochStringByTimestamp = async (
  timestamp: number,
  unit: 'seconds' | 'milliseconds'
) => {
  const timezone: number = getTimezone();
  const date: Date = new Date(timestamp);
  const isoString: string = date.toISOString();
  const readableString: string = buildReadableString(date);
  const gmtDate: Date = new Date(timestamp - timezone * ONE_HOUR);
  const gmtString: string = buildReadableString(gmtDate);
  return `Assuming that this timestamp is in ${unit}:\n
ISO String     : ${isoString}
GMT            : ${gmtString} GMT
Your Time Zone : ${readableString} GMT+${addZero(timezone)}`;
};

export const buildEpochString = async (unixTimestamp: number) => {
  const timestamp: number = unixTimestamp * 1000;
  const { data, error } = await tryCatch(
    Promise.resolve(buildEpochStringByTimestamp(timestamp, 'seconds'))
  );
  if (error) {
    const { data, error } = await tryCatch(
      buildEpochStringByTimestamp(unixTimestamp, 'milliseconds')
    );
    if (error) {
      return `Error: ${capitalise(error.message)}`;
    }
    return data;
  }
  return data;
};
