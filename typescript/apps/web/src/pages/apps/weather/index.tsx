import { useIsOnline } from '@web/hooks/use-is-online';
import { usePosition } from '@web/hooks/use-position';
import cities from '@web/json/cities.json';
import { Layout } from '@web/layout';
import { trpc } from '@web/utils/trpc';
import { NextPage } from 'next';
import { ChangeEvent, FC, useState } from 'react';

const Weather: FC<{
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}> = ({ city = '', state = '', country = '', latitude = 0, longitude = 0 }) => {
  const { data, isPending, error } = trpc.weather.useQuery({
    latitude,
    longitude,
  });

  if (isPending) {
    return (
      <div className='rounded-lg border border-base-content'>
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <div className='text-sm md:text-base'>
              {city}, {country}
            </div>
            <span className='loading loading-infinity loading-lg'></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-lg border border-base-content'>
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <div className='text-sm md:text-base'>
              {city}, {country}
            </div>
            <div>{error.message ?? 'Error'}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='rounded-lg border border-base-content'>
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <div className='truncate text-sm md:text-base'>
              {city}, {country}
            </div>
            <div>No Data</div>
          </div>
        </div>
      </div>
    );
  }

  const { main = '', temperature = 0 } = data;

  return (
    <div className='rounded-lg border border-base-content'>
      <div className='p-4'>
        <div className='flex items-center justify-between gap-1'>
          <div className='text-left'>
            <div className='truncate text-xl'>{city}</div>
            <div className='truncate text-sm'>{state}</div>
          </div>
          <div className='text-right'>
            <div className='text-xl'>{temperature.toFixed(1)}°C</div>
            <div className='text-sm'>{main}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export type City = {
  city: string;
  state: string;
  country: string;
  continent: string;
  latitude: number;
  longitude: number;
};

const WeatherPage: NextPage = () => {
  const isOnline: boolean = useIsOnline();
  const { latitude, longitude } = usePosition();
  const [query, setQuery] = useState('');

  if (!isOnline) {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl uppercase'>
            Service is Offline
          </div>
        </div>
      </Layout>
    );
  }

  const filterCities = cities.filter(({ city, state, country }) => {
    const countryFlag: boolean =
      query === '' ? true : country.toLowerCase().includes(query.toLowerCase());
    const stateFlag: boolean =
      query === '' ? true : state.toLowerCase().includes(query.toLowerCase());
    const cityFlag: boolean =
      query === '' ? true : city.toLowerCase().includes(query.toLowerCase());
    return countryFlag || stateFlag || cityFlag;
  });

  // Continents
  const continents: string[] = [
    ...new Set(filterCities.map(({ continent }) => continent)),
  ];
  continents.sort((a, b) => (a > b ? 1 : -1));

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
              <Weather
                city='Current'
                state={`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`}
                country='Location'
                latitude={latitude}
                longitude={longitude}
              />
              <div className='flex flex-col gap-y-4 md:gap-y-8'>
                {continents.map((continent: string) => {
                  const citiesByContinent = filterCities.filter(
                    ({ continent: cityContinent }) =>
                      continent === cityContinent
                  ); // Countries
                  const countries: string[] = [
                    ...new Set(citiesByContinent.map(({ country }) => country)),
                  ];
                  countries.sort((a, b) => (a > b ? 1 : -1));
                  return (
                    <>
                      {countries.map((country: string) => {
                        const citiesByCountry = citiesByContinent.filter(
                          ({ country: cityCountry }) => country === cityCountry
                        ); // Countries
                        return (
                          <div
                            key={country}
                            className='flex flex-col gap-y-4 md:gap-y-8'>
                            <p>
                              {continent} - {country}
                            </p>
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
                              {citiesByCountry.map(
                                ({
                                  city = '',
                                  state = '',
                                  country = '',
                                  latitude = 0,
                                  longitude = 0,
                                }) => {
                                  return (
                                    <div key={city} className='col-span-1'>
                                      <Weather
                                        city={city}
                                        state={state}
                                        country={country}
                                        latitude={latitude}
                                        longitude={longitude}
                                      />
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
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

export default WeatherPage;
