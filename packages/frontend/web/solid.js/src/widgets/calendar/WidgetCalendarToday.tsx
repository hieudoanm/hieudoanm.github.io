import { months, weekdays } from '~/constants';
import { createSignal, onMount } from 'solid-js';

export const WidgetCalendarToday = () => {
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

  const month: string = months[clock().month];
  const weekday: string = weekdays[clock().weekday];

  return (
    <div class="shadow-3xl aspect-square w-full max-w-60 rounded-3xl bg-gray-900 p-4 text-gray-100">
      <div class="flex h-full flex-col items-center justify-center">
        <p class="w-full text-left">{month}</p>
        <div class="flex grow items-center justify-center">
          <p class="text-9xl text-red-500">{clock().date}</p>
        </div>
        <p class="text-xl">{weekday}</p>
      </div>
    </div>
  );
};
