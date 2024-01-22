import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Select,
  Text,
} from '@chakra-ui/react';
import {
  DAYS,
  END_DATES,
  FIRST_YEAR,
  LAST_YEAR,
  MEDIUM_DAYS,
  MONTHS,
  SMALL_DAYS,
} from '@hieudoanm/constants/time.constants';
import React, { ChangeEvent, useState } from 'react';

type YearMonthDate = {
  year: number;
  month: number;
  date: number;
  current: string;
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
  const [monthYear, setMonthYear] = useState({
    month: currentMonth,
    year: currentYear,
  });
  const dates: YearMonthDate[] = getDates(monthYear.year, monthYear.month);

  return (
    <Card className="border border-gray-200 shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Heading className="text-xl">Calendar</Heading>
          <div className="flex items-center gap-x-4">
            <Select
              id="month"
              name="month"
              placeholder="Month"
              value={monthYear.month}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setMonthYear({
                  ...monthYear,
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
            </Select>
            <Select
              id="year"
              name="year"
              placeholder="Year"
              value={monthYear.year}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setMonthYear({
                  ...monthYear,
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
            </Select>
            <div>
              <Button
                type="button"
                colorScheme="teal"
                onClick={() => {
                  setMonthYear({
                    month: new Date().getMonth(),
                    year: new Date().getFullYear(),
                  });
                }}>
                Today
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <div className="grid grid-cols-7">
        {[0, 1, 2, 3, 4, 5, 6].map((day: number) => {
          return (
            <div key={day} className="col-span-1">
              <div className="border-b px-2 py-1 text-center text-xs md:px-4 md:py-2 md:text-base lg:px-8 lg:py-4">
                <Text className="truncate">
                  <span className="block md:hidden">
                    {SMALL_DAYS[`${day}`]}
                  </span>
                  <span className="hidden md:block lg:hidden">
                    {MEDIUM_DAYS[`${day}`]}
                  </span>
                  <span className="hidden lg:block">{DAYS[`${day}`]}</span>
                </Text>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7">
        {dates.map(({ year: dateYear, month: dateMonth, date, current }) => {
          const todayClass =
            dateYear === currentYear &&
            dateMonth === currentMonth &&
            date === currentDate
              ? 'font-bold'
              : '';
          const currentClass: string =
            current === 'current' ? 'text-black' : 'text-gray-500';
          const currentText =
            current === 'current' ? date : `${date}/${dateMonth + 1}`;
          return (
            <div
              key={`${dateYear}-${dateMonth}-${date}`}
              className="col-span-1">
              <div className="border-b px-2 py-1 text-center text-xs md:px-4 md:py-2 md:text-base lg:px-8 lg:py-4">
                <div className={todayClass}>
                  <Text className={`truncate ${currentClass}`}>
                    {currentText}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CardFooter>
        <Text className="w-full text-center">
          {monthYear.year} - {MONTHS[`${monthYear.year}`]}
        </Text>
      </CardFooter>
    </Card>
  );
};

Calendar.displayName = 'Calendar';

export default Calendar;
