import { createSignal, onMount } from 'solid-js';
import { months, weekdays } from '~/constants';
import { addZero } from '~/utils/number';
import { getOrdinalSuffix } from '~/utils/time';

export const WidgetClockDigital = () => {
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

  return (
    <div class="shadow-3xl aspect-square w-full max-w-60 rounded-3xl border border-white bg-gray-900 p-8">
      <div class="flex h-full w-full items-center justify-center">
        <div class="flex flex-col items-center justify-center gap-y-2 text-gray-100">
          <p class="text-sm">
            <span class="uppercase">{months[clock().month]}</span>{' '}
            {clock().date}
            <sup>{getOrdinalSuffix(clock().date)}</sup>, {clock().year}
          </p>
          <p class="text-5xl uppercase">
            {addZero(clock().hours)}:{addZero(clock().minutes)}:
            {addZero(clock().seconds)}
          </p>
          <p class="text-sm uppercase">{weekdays[clock().weekday]}</p>
        </div>
      </div>
    </div>
  );
};
