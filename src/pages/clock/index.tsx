import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';

const addZero = (number: number) =>
  number > 9 ? number.toString() : `0${number}`;

const getOrdinalSuffix = (weekday: number): string => {
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

const months = [
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

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const TimeZoneClock: FC<{
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  timezone: number;
}> = ({
  year = 0,
  month = 0,
  date = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  timezone: currentTimeZone = 0,
}) => {
  const timeZones: { city: string; timeZone: number }[] = [
    { city: 'London', timeZone: 0 },
    { city: 'Hanoi', timeZone: 7 },
    { city: 'Melbourne', timeZone: 11 },
  ];
  return (
    <div className="shadow-3xl aspect-square w-72 rounded-3xl border border-white bg-black p-8">
      <div className="grid h-full w-full grid-rows-3">
        {timeZones.map(({ city, timeZone }, index: number, array) => {
          const last = array.length - 1 === index;
          const d = new Date(
            year,
            month,
            date,
            hours - (currentTimeZone - timeZone),
            minutes,
            seconds
          );
          const timeZoneHours: number = d.getHours();
          const timeZoneMinutes: number = d.getMinutes();
          return (
            <div
              key={city}
              className={`col-span-1 text-white ${!last ? 'border-b border-gray-500' : ''}`}>
              <div className="flex h-full w-full items-center justify-between">
                <div>
                  <p className="text-sm uppercase text-gray-500">
                    +{addZero(timeZone)}Hrs
                  </p>
                  <p className="truncate whitespace-nowrap text-base font-semibold">
                    {city}
                  </p>
                </div>
                <p className="text-3xl font-bold">
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

const DigitalClock: FC<{
  year: number;
  month: number;
  date: number;
  weekday: number;
  hours: number;
  minutes: number;
  seconds: number;
}> = ({
  year = 0,
  month = 0,
  date = 0,
  weekday = 0,
  seconds = 0,
  minutes = 0,
  hours = 0,
}) => {
  return (
    <div className="shadow-3xl aspect-square w-72 rounded-3xl border border-white bg-black p-8">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-2 text-white">
          <p className="text-sm">
            <span className="uppercase">{months[month]}</span> {date}
            <sup>{getOrdinalSuffix(date)}</sup>, {year}
          </p>
          <p className="text-5xl uppercase">
            {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
          </p>
          <p className="text-sm uppercase">{weekdays[weekday]}</p>
        </div>
      </div>
    </div>
  );
};

const AnalogClock: FC<{ seconds: number; minutes: number; hours: number }> = ({
  seconds = 0,
  minutes = 0,
  hours = 0,
}) => {
  const secondsAngle = (seconds < 60 ? (seconds / 60) * 360 : 0) + 90;
  const minutesAngle = (minutes < 60 ? (minutes / 60) * 360 : 0) + 90;
  const hoursAngle = (minutes < 24 ? (hours / 24) * 360 : 0) + 90;

  return (
    <div className="shadow-3xl aspect-square w-72 rounded-full border border-white bg-black">
      <div className="relative h-full w-full rounded-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto aspect-square w-4 rounded-full bg-white">
          <div className="relative h-full w-full">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (index) => {
                const angle = 22.5 * index;
                const mainPoint =
                  angle % 90 === 0 ? (
                    <div className="aspect-square w-4 rounded-full bg-white" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                  );
                return (
                  <div
                    key={angle}
                    className="absolute h-full w-full"
                    style={{ rotate: `${angle}deg` }}>
                    <div className="absolute bottom-0 right-2 top-0 my-auto flex h-4 w-28 items-center justify-start bg-transparent">
                      {mainPoint}
                    </div>
                  </div>
                );
              }
            )}
            <div
              className="absolute z-10 h-full w-full transition-all ease-linear"
              style={{ rotate: `${secondsAngle}deg` }}>
              <div className="absolute bottom-0 right-2 top-0 my-auto h-1 w-24 rounded-full bg-red-700"></div>
            </div>
            <div
              className="absolute h-full w-full transition-all"
              style={{ rotate: `${minutesAngle}deg` }}>
              <div className="absolute bottom-0 right-2 top-0 my-auto h-2 w-20 rounded-full bg-white"></div>
            </div>
            <div
              className="absolute h-full w-full transition-all"
              style={{ rotate: `${hoursAngle}deg` }}>
              <div className="absolute bottom-0 right-2 top-0 my-auto h-2 w-16 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClockPage: NextPage = () => {
  const d = new Date();
  const [clock, setClock] = useState<{
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

  useEffect(() => {
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
    <div className="h-triple-screen w-screen overflow-hidden bg-gray-300 md:h-screen">
      <div className="grid h-full grid-cols-none grid-rows-3 gap-8 p-8 md:grid-cols-3 md:grid-rows-none">
        <div className="col-span-1 h-full">
          <div className="flex h-full items-center justify-center">
            <AnalogClock
              hours={clock.hours}
              minutes={clock.minutes}
              seconds={clock.seconds}
            />
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="flex h-full items-center justify-center">
            <DigitalClock
              year={clock.year}
              month={clock.month}
              date={clock.date}
              weekday={clock.weekday}
              hours={clock.hours}
              minutes={clock.minutes}
              seconds={clock.seconds}
            />
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="flex h-full items-center justify-center">
            <TimeZoneClock
              year={clock.year}
              month={clock.month}
              date={clock.date}
              hours={clock.hours}
              minutes={clock.minutes}
              seconds={clock.seconds}
              timezone={clock.timezone}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockPage;
