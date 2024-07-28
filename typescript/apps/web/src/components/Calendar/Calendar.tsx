import React, { ChangeEvent, useState } from 'react';
import {
  DAYS,
  END_DATES,
  FIRST_YEAR,
  LAST_YEAR,
  MEDIUM_DAYS,
  MONTHS,
  SMALL_DAYS,
  SUFFIX_DATE,
} from './Calendar.constants';

type YearMonthDate = {
  year: number;
  month: number;
  date: number;
  current: string;
};

const chunk = <T,>(array: T[], length: number) => {
  const n = array.length;
  const chunks = [];
  let i = 0;

  while (i < n) {
    const newValue = i + length;
    chunks.push(array.slice(i, newValue));
    i = newValue;
  }

  return chunks;
};

const isLeapYear = (year: number): boolean =>
  (0 === year % 4 && 0 !== year % 100) || 0 === year % 400;

const getDates = (year: number, month: number): YearMonthDate[] => {
  const startD: Date = new Date(year, month, 1);
  const startDay: number = startD.getDay();
  const endDate: number =
    month === 1 && isLeapYear(year) ? 29 : END_DATES[`${month}`];
  const endD: Date = new Date(year, month, endDate);
  const endDay: number = endD.getDay();
  const dates: YearMonthDate[] = [
    ...Array.from<number>({ length: endDate }).keys(),
  ]
    .map((date: number) => date + 1)
    .map((date: number) => ({ year, month, date, current: 'current' }));
  const previousMonth: number = month - 1 < 0 ? 11 : month - 1;
  const previousEndDate: number = END_DATES[`${previousMonth}`];
  for (let index = 0; index < startDay; index++) {
    dates.unshift({
      year: -1,
      month: previousMonth,
      date: previousEndDate - index,
      current: 'previous',
    });
  }
  const nextMonth: number = month + 1 > 11 ? 0 : month + 1;
  for (let index = 1; index <= 6 - endDay; index++) {
    dates.push({ year: -1, month: nextMonth, date: index, current: 'next' });
  }
  return dates;
};

export type CalendarProps = { date?: number; month?: number; year?: number };

export const Calendar: React.FC<CalendarProps> = ({
  date: currentDate = new Date().getDate(),
  month: currentMonth = new Date().getMonth(),
  year: currentYear = new Date().getFullYear(),
}) => {
  const years = [...Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }).keys()]
    .map((year: number) => year + FIRST_YEAR)
    .reverse();
  const [dateMonthYear, setDateMonthYear] = useState<{
    date: number;
    month: number;
    year: number;
  }>({
    date: currentDate,
    month: currentMonth,
    year: currentYear,
  });
  const dates: YearMonthDate[] = getDates(
    dateMonthYear.year,
    dateMonthYear.month
  );

  return (
    <div className='overflow-hidden'>
      <div className='flex flex-col gap-y-4 md:gap-y-8'>
        <div className='flex flex-col items-center justify-between gap-2 md:flex-row md:gap-4'>
          <p className='text-lg font-bold'>Calendar</p>
          <div className='join'>
            <select
              id='month'
              name='month'
              value={dateMonthYear.month}
              className='join-item select select-bordered select-sm border-base-content md:select-md'
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setDateMonthYear({
                  ...dateMonthYear,
                  month: Number.parseInt(event.target.value, 10),
                })
              }
              required>
              {MONTHS.map((monthString: string, index: number) => {
                return (
                  <option key={monthString} value={index}>
                    {monthString}
                  </option>
                );
              })}
            </select>
            <select
              id='year'
              name='year'
              className='join-item select select-bordered select-sm border-base-content md:select-md'
              value={dateMonthYear.year}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setDateMonthYear({
                  ...dateMonthYear,
                  year: Number.parseInt(event.target.value, 10),
                })
              }
              required>
              {years.map((yearValue: number) => {
                return (
                  <option key={yearValue} value={yearValue}>
                    {yearValue}
                  </option>
                );
              })}
            </select>
            <button
              type='button'
              className='btn btn-outline join-item btn-sm md:btn-md'
              onClick={() => {
                setDateMonthYear({
                  date: new Date().getDate(),
                  month: new Date().getMonth(),
                  year: new Date().getFullYear(),
                });
              }}>
              Today
            </button>
          </div>
        </div>
        <div className='overflow-x-auto rounded-lg border border-base-content'>
          <table className='table'>
            <thead>
              <tr>
                {[0, 1, 2, 3, 4, 5, 6].map((day: number) => {
                  return (
                    <th key={day} className='border-b border-base-content'>
                      <div className='truncate text-center'>
                        <span className='block md:hidden'>
                          {SMALL_DAYS[`${day}`]}
                        </span>
                        <span className='hidden md:block lg:hidden'>
                          {MEDIUM_DAYS[`${day}`]}
                        </span>
                        <span className='hidden lg:block'>
                          {DAYS[`${day}`]}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {chunk(dates, 7).map((rowDates: YearMonthDate[]) => {
                return (
                  <tr key={`row-${rowDates[0].date}`}>
                    {rowDates.map(
                      ({ year: dateYear, month: dateMonth, date, current }) => {
                        const todayFlag: boolean =
                          dateYear === currentYear &&
                          dateMonth === currentMonth &&
                          date === currentDate;
                        const todayClass = todayFlag
                          ? 'font-black bg-base-content rounded-full text-primary text-sm md:text-base'
                          : '';
                        const currentClass: string =
                          current === 'current' && !todayFlag
                            ? 'text-base-content text-base'
                            : 'text-primary text-xs md:text-sm';
                        const currentText =
                          current === 'current'
                            ? date
                            : `${date}/${dateMonth + 1}`;
                        return (
                          <td
                            key={`${dateYear}-${dateMonth}-${date}`}
                            className='border-b border-base-content text-center'>
                            <div className={todayClass}>
                              <span className={`truncate ${currentClass}`}>
                                {currentText}
                              </span>
                            </div>
                          </td>
                        );
                      }
                    )}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <div className='w-full text-center'>
                    {MONTHS[`${dateMonthYear.month}`]} {dateMonthYear.date}
                    <sup>{SUFFIX_DATE[dateMonthYear.date]}</sup>,{' '}
                    {dateMonthYear.year}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

Calendar.displayName = 'Calendar';
