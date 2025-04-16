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

export const getTimeZone = (): number => {
  const date: Date = new Date();
  const timezoneOffset: number = date.getTimezoneOffset();
  return timezoneOffset / -60;
};

export const ONE_SECOND: number = 1000;
export const ONE_MINUTE: number = ONE_SECOND * 60;
export const ONE_HOUR: number = ONE_MINUTE * 60;
export const ONE_DAY: number = ONE_HOUR * 24;
export const ONE_WEEK: number = ONE_DAY * 7;

const citiesByTimezone = [
  {
    city: 'Pago Pago',
    country: 'American Samoa',
    timezone: 'Pacific/Pago_Pago',
    utcOffset: -11,
  },
  {
    city: 'Honolulu',
    country: 'United States',
    timezone: 'Pacific/Honolulu',
    utcOffset: -10,
  },
  {
    city: 'Anchorage',
    country: 'United States',
    timezone: 'America/Anchorage',
    utcOffset: -9,
  },
  {
    city: 'Los Angeles',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    utcOffset: -8,
  },
  {
    city: 'Denver',
    country: 'United States',
    timezone: 'America/Denver',
    utcOffset: -7,
  },
  {
    city: 'Chicago',
    country: 'United States',
    timezone: 'America/Chicago',
    utcOffset: -6,
  },
  {
    city: 'New York',
    country: 'United States',
    timezone: 'America/New_York',
    utcOffset: -5,
  },
  {
    city: 'Caracas',
    country: 'Venezuela',
    timezone: 'America/Caracas',
    utcOffset: -4,
  },
  {
    city: 'Buenos Aires',
    country: 'Argentina',
    timezone: 'America/Argentina/Buenos_Aires',
    utcOffset: -3,
  },
  {
    city: 'South Georgia',
    country: 'South Georgia and the South Sandwich Islands',
    timezone: 'Atlantic/South_Georgia',
    utcOffset: -2,
  },
  {
    city: 'Azores',
    country: 'Portugal',
    timezone: 'Atlantic/Azores',
    utcOffset: -1,
  },
  {
    city: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    utcOffset: 0,
  },
  {
    city: 'Frankfurt am Main',
    country: 'German',
    timezone: 'Central European Time',
    utcOffset: 1,
  },
  {
    city: 'Helsinki',
    country: 'Finland',
    timezone: 'Eastern European Time',
    utcOffset: 2,
  },
  {
    city: 'Moscow',
    country: 'Russia',
    timezone: 'Europe/Moscow',
    utcOffset: 3,
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    timezone: 'Asia/Dubai',
    utcOffset: 4,
  },
  {
    city: 'Karachi',
    country: 'Pakistan',
    timezone: 'Asia/Karachi',
    utcOffset: 5,
  },
  {
    city: 'Dhaka',
    country: 'Bangladesh',
    timezone: 'Asia/Dhaka',
    utcOffset: 6,
  },
  {
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    timezone: 'Asia/Ho_Chi_Minh_City',
    utcOffset: 7,
  },
  {
    city: 'Beijing',
    country: 'China',
    timezone: 'Asia/Shanghai',
    utcOffset: 8,
  },
  { city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', utcOffset: 9 },
  {
    city: 'Melbourne',
    country: 'Australia',
    timezone: 'Australia/Melbourne',
    utcOffset: 10,
  },
  {
    city: 'Nouméa',
    country: 'New Caledonia',
    timezone: 'Pacific/Noumea',
    utcOffset: 11,
  },
  {
    city: 'Auckland',
    country: 'New Zealand',
    timezone: 'Pacific/Auckland',
    utcOffset: 12,
  },
];

const buildEpochStringByTimestamp = async (
  timestamp: number,
  unit: 'seconds' | 'milliseconds'
) => {
  const machineTimeZone: number = getTimeZone();
  const date: Date = new Date(timestamp);
  const isoString: string = date.toISOString();
  const readableString: string = buildReadableString(date);

  return `Assuming that this timestamp is in ${unit}:\n
Your Time (ISO) : ${isoString}
Your Time Zone  : ${readableString} GMT+${addZero(machineTimeZone)}

${citiesByTimezone
  .map(({ utcOffset, city, country }) => {
    const timeZoneDate: Date = new Date(
      timestamp - (machineTimeZone - utcOffset) * ONE_HOUR
    );
    const timeZoneHour: number = timeZoneDate.getHours();
    const timeZoneString: string = buildReadableString(timeZoneDate);
    return `${timeZoneHour >= 6 && timeZoneHour < 18 ? '🌕' : '🌑'} GMT${utcOffset >= 0 ? '+' : '-'}${addZero(Math.abs(utcOffset))} : ${timeZoneString} (${city}, ${country})`;
  })
  .join('\n')}`;
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
