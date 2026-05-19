import { FC, useState } from 'react';

type TimeUnit =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'
  | 'date';

// Constants for conversion to milliseconds (base unit)
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const MS_PER_WEEK = 7 * MS_PER_DAY;
// Using average days for month and year for simpler calculation
const MS_PER_MONTH_AVG = (365.25 / 12) * MS_PER_DAY; // Average days in a month over 4 years
const MS_PER_YEAR_AVG = 365.25 * MS_PER_DAY; // Average days in a year (including leap years)

const convertTime = (
  fromAmount: number, // For 'date', this will be a timestamp or a representative number
  fromUnit: TimeUnit,
  toUnit: TimeUnit
): number | string => {
  let millisecondsValue: number;

  // Convert the 'from' amount to milliseconds as the base
  if (fromUnit === 'milliseconds') {
    millisecondsValue = fromAmount;
  } else if (fromUnit === 'seconds') {
    millisecondsValue = fromAmount * MS_PER_SECOND;
  } else if (fromUnit === 'minutes') {
    millisecondsValue = fromAmount * MS_PER_MINUTE;
  } else if (fromUnit === 'hours') {
    millisecondsValue = fromAmount * MS_PER_HOUR;
  } else if (fromUnit === 'days') {
    millisecondsValue = fromAmount * MS_PER_DAY;
  } else if (fromUnit === 'weeks') {
    millisecondsValue = fromAmount * MS_PER_WEEK;
  } else if (fromUnit === 'months') {
    millisecondsValue = fromAmount * MS_PER_MONTH_AVG;
  } else if (fromUnit === 'years') {
    millisecondsValue = fromAmount * MS_PER_YEAR_AVG;
  } else if (fromUnit === 'date') {
    // If 'fromUnit' is 'date', we assume fromAmount is a Unix timestamp in milliseconds
    millisecondsValue = fromAmount;
  } else {
    millisecondsValue = fromAmount; // Default or error case
  }

  // Convert from milliseconds to the 'to' unit
  if (toUnit === 'milliseconds') {
    return parseFloat(millisecondsValue.toFixed(0));
  } else if (toUnit === 'seconds') {
    return parseFloat((millisecondsValue / MS_PER_SECOND).toFixed(3));
  } else if (toUnit === 'minutes') {
    return parseFloat((millisecondsValue / MS_PER_MINUTE).toFixed(5));
  } else if (toUnit === 'hours') {
    return parseFloat((millisecondsValue / MS_PER_HOUR).toFixed(5));
  } else if (toUnit === 'days') {
    return parseFloat((millisecondsValue / MS_PER_DAY).toFixed(5));
  } else if (toUnit === 'weeks') {
    return parseFloat((millisecondsValue / MS_PER_WEEK).toFixed(5));
  } else if (toUnit === 'months') {
    return parseFloat((millisecondsValue / MS_PER_MONTH_AVG).toFixed(5));
  } else if (toUnit === 'years') {
    return parseFloat((millisecondsValue / MS_PER_YEAR_AVG).toFixed(5));
  } else if (toUnit === 'date') {
    const date = new Date(millisecondsValue);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleString(); // Adjust locale and options as needed
  } else {
    return parseFloat(millisecondsValue.toFixed(0)); // Default to milliseconds
  }
};

export const Time: FC = () => {
  const [
    { milliseconds, seconds, minutes, hours, days, weeks, months, years, date },
    setState,
  ] = useState<{
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    weeks: number;
    months: number;
    years: number;
    date: string | number; // 'date' can be string for display or number for internal timestamp
  }>({
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
    years: 0,
    date: new Date().toLocaleString(), // Initialize with current date/time
  });

  return (
    <div className="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'milliseconds' as TimeUnit, value: milliseconds },
        { type: 'seconds' as TimeUnit, value: seconds },
        { type: 'minutes' as TimeUnit, value: minutes },
        { type: 'hours' as TimeUnit, value: hours },
        { type: 'days' as TimeUnit, value: days },
        { type: 'weeks' as TimeUnit, value: weeks },
        { type: 'months' as TimeUnit, value: months },
        { type: 'years' as TimeUnit, value: years },
        { type: 'date' as TimeUnit, value: date },
      ].map(({ type, value }) => {
        return (
          <div
            key={type}
            className="flex items-center justify-center gap-x-2 px-4 py-2">
            <span className="capitalize">{type}</span>
            <input
              type="text"
              id={type}
              placeholder={type}
              value={value}
              onChange={(event) => {
                const newValue: string = event.target.value;
                let newAmount: number;

                if (type === 'date') {
                  const parsedDate = new Date(newValue);
                  if (!isNaN(parsedDate.getTime())) {
                    newAmount = parsedDate.getTime();
                  } else {
                    newAmount = 0; // Invalid date input, default to 0 milliseconds
                  }
                } else {
                  newAmount = parseFloat(newValue);
                }

                // If the input is empty or not a valid number (for numeric types), set all to 0
                if (isNaN(newAmount) && type !== 'date') {
                  setState({
                    milliseconds: 0,
                    seconds: 0,
                    minutes: 0,
                    hours: 0,
                    days: 0,
                    weeks: 0,
                    months: 0,
                    years: 0,
                    date: new Date(0).toLocaleString(), // Epoch
                  });
                  return;
                }

                let baseMilliseconds: number;
                if (type === 'date') {
                  baseMilliseconds = newAmount; // newAmount is already the timestamp for 'date'
                } else {
                  baseMilliseconds = convertTime(
                    newAmount,
                    type,
                    'milliseconds'
                  ) as number;
                }

                setState((previous) => ({
                  ...previous,
                  milliseconds: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'milliseconds'
                  ) as number,
                  seconds: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'seconds'
                  ) as number,
                  minutes: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'minutes'
                  ) as number,
                  hours: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'hours'
                  ) as number,
                  days: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'days'
                  ) as number,
                  weeks: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'weeks'
                  ) as number,
                  months: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'months'
                  ) as number,
                  years: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'years'
                  ) as number,
                  date: convertTime(baseMilliseconds, 'milliseconds', 'date'),
                }));
              }}
              className="grow text-right focus:outline-none"
            />
          </div>
        );
      })}
    </div>
  );
};
