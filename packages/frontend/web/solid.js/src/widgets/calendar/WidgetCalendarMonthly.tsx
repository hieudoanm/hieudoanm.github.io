import { months } from '~/constants';
import { chunkArray } from '~/utils/array';
import { getNumberOfDaysPerMonth, getOrdinalSuffix } from '~/utils/time';
import { createEffect, createSignal } from 'solid-js';

export const WidgetCalendarMonthly = () => {
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

  createEffect(() => {
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

  const firstDateOfMonth = new Date(clock().year, months.indexOf(month), 1);
  const firstWeekdayOfMonth = firstDateOfMonth.getDay();
  const numberOfDaysPerMonth = getNumberOfDaysPerMonth(clock().year)[
    months.indexOf(month)
  ];
  const array = Array.from(
    { length: 7 * 5 },
    (_, i) => i - firstWeekdayOfMonth + 1
  );
  const daysByWeek: number[][] = chunkArray(array, 7);

  return (
    <div class="shadow-3xl aspect-square w-full max-w-60 rounded-3xl bg-gray-900 p-6 text-gray-100">
      <div class="flex h-full flex-col items-center justify-center gap-y-2">
        <div class="flex w-full items-center justify-between">
          <p class="text-red-500">
            {month} {clock().year}
          </p>
          <p>
            {clock().date}
            <sup>{getOrdinalSuffix(clock().date)}</sup>
          </p>
        </div>
        <div class="w-full grow">
          <div class="flex w-full items-center justify-between">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          {daysByWeek.map((weekdays) => {
            return (
              <div
                title={`week-${weekdays}`}
                class="flex w-full items-center justify-between">
                {weekdays.map((date) => {
                  return (
                    <div
                      title={`date-${date}`}
                      class="flex items-center justify-center py-2">
                      <button
                        type="button"
                        onClick={() => {
                          console.log(
                            weekdays[clock().weekday],
                            month,
                            date,
                            clock().year
                          );
                        }}>
                        {date === clock().date ? (
                          <div class="aspect-square w-2 rounded-full bg-red-500" />
                        ) : (
                          <>
                            {date <= 0 || date > numberOfDaysPerMonth ? (
                              <div class="aspect-square w-2 rounded-full bg-gray-700" />
                            ) : (
                              <div class="aspect-square w-2 rounded-full bg-white" />
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div class="flex items-center justify-center">
          <p>Nothing to Do</p>
        </div>
      </div>
    </div>
  );
};
