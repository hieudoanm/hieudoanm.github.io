import { addZero } from '~/utils/number';
import { createSignal, onMount } from 'solid-js';

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

const ClockPage = () => {
  const d = new Date();
  const [clock, setClock] = createSignal<{
    year: number;
    month: number;
    date: number;
    weekday: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    timezoneOffset: number;
    timezone: number;
  }>({
    year: d.getFullYear(),
    month: d.getMonth(),
    date: d.getDate(),
    weekday: d.getDay(),
    hours: d.getHours(),
    minutes: d.getMinutes(),
    seconds: d.getSeconds(),
    milliseconds: d.getMilliseconds(),
    timezoneOffset: d.getTimezoneOffset(),
    timezone: d.getTimezoneOffset() / -60,
  });

  onMount(() => {
    const interval = setInterval(() => {
      const d: Date = new Date();
      setClock({
        year: d.getFullYear(),
        month: d.getMonth(),
        date: d.getDate(),
        weekday: d.getDay(),
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds(),
        milliseconds: d.getMilliseconds(),
        timezoneOffset: d.getTimezoneOffset(),
        timezone: d.getTimezoneOffset() / -60,
      });
    }, 1);

    return () => clearInterval(interval);
  });

  return (
    <div class="">
      {citiesByTimezone
        .toSorted((a, b) => {
          const aUtcOffset = a.utcOffset - clock().hours;
          const bUtcOffset = b.utcOffset - clock().hours;
          return aUtcOffset > bUtcOffset ? 1 : -1;
        })
        .map(({ city = '', country = '', utcOffset = 0 }) => {
          const d = new Date(
            clock().year,
            clock().month,
            clock().date,
            clock().hours - (clock().timezone - utcOffset),
            clock().minutes,
            clock().seconds
          );
          const timeZoneHours: number = d.getHours();
          const timeZoneMinutes: number = d.getMinutes();
          const timeZoneSeconds: number = d.getSeconds();
          const timeOfDay: string =
            timeZoneHours >= 6 && timeZoneHours < 18
              ? 'bg-gray-100 text-gray-900 border-b border-gray-900'
              : 'bg-gray-900 text-gray-100 border-b border-gray-100';
          return (
            <div title={city} class={`${timeOfDay}`}>
              <div class="mx-auto w-full max-w-xl p-4 md:p-8">
                <div class="flex w-full items-center justify-between">
                  <div class="text-sm md:text-base">
                    <p class="font-light">
                      {utcOffset >= 0 ? '+' : ''}
                      {addZero(utcOffset)}HRS
                    </p>
                    <p class="font-bold">
                      <b>{city}</b>
                    </p>
                    <p class="font-medium">{country}</p>
                  </div>
                  <p class="text-2xl font-black md:text-4xl">
                    {addZero(timeZoneHours)}:{addZero(timeZoneMinutes)}:
                    {addZero(timeZoneSeconds)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ClockPage;
