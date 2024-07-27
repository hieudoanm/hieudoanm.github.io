import { Layout } from '@web/layout';
import { NextPage } from 'next';
import cities from '@web/json/cities.json';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { addZero } from '@web/utils/number/number';

const Clock: FC<{ city: string; timezone: number }> = ({
  city = '',
  timezone = 0,
}) => {
  // Timezone
  const timezoneOffset: number = new Date().getTimezoneOffset() / -60;
  const delta: number = timezoneOffset - timezone;
  // Now
  const nowDate: number = new Date().getDate();
  const nowTime: number = Date.now();
  // Clock
  const oneHour: number = 1000 * 60 * 60;
  const [clock, setClock] = useState<Date>(new Date(nowTime - delta * oneHour));
  const beforeAfter: string = delta >= 0 ? 'Yesterday' : 'Tomorrow';
  const deltaDate: string = nowDate === clock.getDate() ? 'Today' : beforeAfter;
  const clockDisplay: string = `${addZero(clock.getHours())}:${addZero(clock.getMinutes())}:${addZero(clock.getSeconds())}`;
  const dateDisplay: string = `${addZero(clock.getFullYear())}-${addZero(clock.getMonth() + 1)}-${addZero(clock.getDate())}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date(nowTime - delta * oneHour));
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className='rounded-lg border border-base-content'>
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-1 text-left'>
            <div className='text-xs md:text-sm'>
              {deltaDate}, {delta * -1}HRS
            </div>
            <div className='truncate text-xl md:text-2xl'>{city}</div>
          </div>
          <div className='flex flex-col items-end gap-y-1'>
            <div className='text-xs md:text-sm'>{dateDisplay}</div>
            <div className='text-xl md:text-2xl'>{clockDisplay}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorldClockPage: NextPage = () => {
  const [query, setQuery] = useState('');

  const filterCities = cities.filter(({ city, state, country }) => {
    const countryFlag: boolean =
      query === '' ? true : country.toLowerCase().includes(query.toLowerCase());
    const stateFlag: boolean =
      query === '' ? true : state.toLowerCase().includes(query.toLowerCase());
    const cityFlag: boolean =
      query === '' ? true : city.toLowerCase().includes(query.toLowerCase());
    return countryFlag || stateFlag || cityFlag;
  });

  const citiesWithTimezones = filterCities.filter(
    ({ timezone }) => !isNaN(timezone)
  );
  const timezones: number[] = [
    ...new Set(citiesWithTimezones.map(({ timezone }) => timezone)),
  ];

  return (
    <Layout nav full>
      <div className='h-full overflow-y-auto'>
        <div className='container mx-auto'>
          <div className='p-4 md:p-8'>
            <div className='flex flex-col gap-y-4 md:gap-y-8'>
              <label className='input input-bordered flex w-full items-center gap-2'>
                <input
                  id='query'
                  name='query'
                  placeholder='Query'
                  className='grow'
                  value={query}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setQuery(event?.target.value)
                  }
                />
                <span>{filterCities.length}</span>
              </label>
              <div className='flex flex-col gap-y-4 md:gap-y-8'>
                {timezones.map((timezone) => {
                  const citiesByTimezones = citiesWithTimezones.filter(
                    ({ timezone: cityTimezone }) => cityTimezone === timezone
                  );
                  return (
                    <div
                      key={timezone}
                      className='flex flex-col gap-y-4 md:gap-y-8'>
                      <div>
                        Timezone: GMT{timezone < 0 ? timezone : `+${timezone}`}
                      </div>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
                        {citiesByTimezones.map(({ city, timezone }) => {
                          return (
                            <div key={city} className='col-span-1'>
                              <Clock city={city} timezone={timezone} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorldClockPage;
