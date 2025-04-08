import { createSignal, onMount } from 'solid-js';
import { addZero } from '~/utils/number';

export const WidgetClockTimeZone = () => {
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
        timezone: d.getTimezoneOffset() / -60,
      });
    }, 1);

    return () => clearInterval(interval);
  });

  const timeZones: { city: string; timeZone: number }[] = [
    { city: 'London', timeZone: 0 },
    { city: 'Hanoi', timeZone: 7 },
    { city: 'Melbourne', timeZone: 11 },
  ];

  return (
    <div class="shadow-3xl aspect-square w-full max-w-60 rounded-3xl border border-white bg-gray-900 p-8">
      <div class="grid h-full w-full grid-rows-3">
        {timeZones.map(({ city, timeZone }, index: number, array) => {
          const last = array.length - 1 === index;
          const d = new Date(
            clock().year,
            clock().month,
            clock().date,
            clock().hours - (clock().timezone - timeZone),
            clock().minutes,
            clock().seconds
          );
          const timeZoneHours: number = d.getHours();
          const timeZoneMinutes: number = d.getMinutes();
          return (
            <div
              title={city}
              class={`col-span-1 text-gray-100 ${!last ? 'border-b border-gray-500' : ''}`}>
              <div class="flex h-full w-full items-center justify-between">
                <div>
                  <p class="text-xs text-gray-500 uppercase">
                    +{addZero(timeZone)}Hrs
                  </p>
                  <p class="truncate text-sm font-semibold whitespace-nowrap">
                    {city}
                  </p>
                </div>
                <p class="text-2xl font-bold">
                  {addZero(timeZoneHours)}:{addZero(timeZoneMinutes)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
