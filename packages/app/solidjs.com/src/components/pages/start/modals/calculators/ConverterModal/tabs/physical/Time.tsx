import { createSignal } from 'solid-js';

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

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const MS_PER_WEEK = 7 * MS_PER_DAY;
const MS_PER_MONTH_AVG = (365.25 / 12) * MS_PER_DAY;
const MS_PER_YEAR_AVG = 365.25 * MS_PER_DAY;

const convertTime = (
  fromAmount: number,
  fromUnit: TimeUnit,
  toUnit: TimeUnit
): number | string => {
  let millisecondsValue: number;

  if (fromUnit === 'milliseconds') millisecondsValue = fromAmount;
  else if (fromUnit === 'seconds')
    millisecondsValue = fromAmount * MS_PER_SECOND;
  else if (fromUnit === 'minutes')
    millisecondsValue = fromAmount * MS_PER_MINUTE;
  else if (fromUnit === 'hours') millisecondsValue = fromAmount * MS_PER_HOUR;
  else if (fromUnit === 'days') millisecondsValue = fromAmount * MS_PER_DAY;
  else if (fromUnit === 'weeks') millisecondsValue = fromAmount * MS_PER_WEEK;
  else if (fromUnit === 'months')
    millisecondsValue = fromAmount * MS_PER_MONTH_AVG;
  else if (fromUnit === 'years')
    millisecondsValue = fromAmount * MS_PER_YEAR_AVG;
  else if (fromUnit === 'date') millisecondsValue = fromAmount;
  else millisecondsValue = fromAmount;

  if (toUnit === 'milliseconds')
    return parseFloat(millisecondsValue.toFixed(0));
  else if (toUnit === 'seconds')
    return parseFloat((millisecondsValue / MS_PER_SECOND).toFixed(3));
  else if (toUnit === 'minutes')
    return parseFloat((millisecondsValue / MS_PER_MINUTE).toFixed(5));
  else if (toUnit === 'hours')
    return parseFloat((millisecondsValue / MS_PER_HOUR).toFixed(5));
  else if (toUnit === 'days')
    return parseFloat((millisecondsValue / MS_PER_DAY).toFixed(5));
  else if (toUnit === 'weeks')
    return parseFloat((millisecondsValue / MS_PER_WEEK).toFixed(5));
  else if (toUnit === 'months')
    return parseFloat((millisecondsValue / MS_PER_MONTH_AVG).toFixed(5));
  else if (toUnit === 'years')
    return parseFloat((millisecondsValue / MS_PER_YEAR_AVG).toFixed(5));
  else if (toUnit === 'date') {
    const date = new Date(millisecondsValue);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleString();
  }
  return parseFloat(millisecondsValue.toFixed(0));
};

export const Time = () => {
  const [milliseconds, setMilliseconds] = createSignal(0);
  const [seconds, setSeconds] = createSignal(0);
  const [minutes, setMinutes] = createSignal(0);
  const [hours, setHours] = createSignal(0);
  const [days, setDays] = createSignal(0);
  const [weeks, setWeeks] = createSignal(0);
  const [months, setMonths] = createSignal(0);
  const [years, setYears] = createSignal(0);
  const [date, setDate] = createSignal<string | number>(
    new Date().toLocaleString()
  );

  const handleChange = (value: string, type: TimeUnit) => {
    let newAmount: number;

    if (type === 'date') {
      const parsedDate = new Date(value);
      newAmount = !isNaN(parsedDate.getTime()) ? parsedDate.getTime() : 0;
    } else {
      newAmount = parseFloat(value);
    }

    if (isNaN(newAmount) && type !== 'date') {
      setMilliseconds(0);
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setDays(0);
      setWeeks(0);
      setMonths(0);
      setYears(0);
      setDate(new Date(0).toLocaleString());
      return;
    }

    const baseMilliseconds =
      type === 'date'
        ? newAmount
        : (convertTime(newAmount, type, 'milliseconds') as number);

    setMilliseconds(
      convertTime(baseMilliseconds, 'milliseconds', 'milliseconds') as number
    );
    setSeconds(
      convertTime(baseMilliseconds, 'milliseconds', 'seconds') as number
    );
    setMinutes(
      convertTime(baseMilliseconds, 'milliseconds', 'minutes') as number
    );
    setHours(convertTime(baseMilliseconds, 'milliseconds', 'hours') as number);
    setDays(convertTime(baseMilliseconds, 'milliseconds', 'days') as number);
    setWeeks(convertTime(baseMilliseconds, 'milliseconds', 'weeks') as number);
    setMonths(
      convertTime(baseMilliseconds, 'milliseconds', 'months') as number
    );
    setYears(convertTime(baseMilliseconds, 'milliseconds', 'years') as number);
    setDate(convertTime(baseMilliseconds, 'milliseconds', 'date'));
  };

  return (
    <div class="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
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
            class="flex items-center justify-center gap-x-2 px-4 py-2">
            <span class="capitalize">{type}</span>
            <input
              type="text"
              id={type}
              placeholder={type}
              value={value()}
              onChange={(event: Event) =>
                handleChange((event.target as HTMLInputElement).value, type)
              }
              class="grow text-right focus:outline-none"
            />
          </div>
        );
      })}
    </div>
  );
};
