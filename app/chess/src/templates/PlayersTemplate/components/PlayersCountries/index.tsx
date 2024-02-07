'use client';

import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { CountryTotal, PlayersCountriesList } from '../PlayersCountriesList';
import { PlayersCountriesMaps } from '../PlayersCountriesMaps';

export type PlayersCountriesProperties = {
  countries: CountryTotal[];
};

export const PlayersCountries: React.FC<PlayersCountriesProperties> = ({
  countries = [],
}) => {
  const [view, setView] = useSearchParameter('view');

  const total: number = countries.reduce(
    (previousValue: number, { total }) => previousValue + total,
    0
  );

  if (countries.length === 0) return <></>;

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-center text-lg md:text-left md:text-2xl">
          Countries ({countries.length})
        </p>
        <div className="join inline-flex">
          <button
            type="button"
            className={`btn-accent btn join-item ${
              view === 'maps' ? 'btn-outline' : 'btn-solid'
            }`}
            onClick={() => setView(view === 'maps' ? 'list' : 'maps')}>
            List
          </button>
          <button
            type="button"
            className={`btn-accent btn join-item ${
              view === 'maps' ? 'btn-solid' : 'btn-outline'
            }`}
            onClick={() => setView(view === 'maps' ? 'list' : 'maps')}>
            Maps
          </button>
        </div>
      </div>
      <div className="rounded border collapse collapse-arrow">
        <div className="border-0">
          <div className="border-b collapse-title">
            <div className="flex w-full items-center justify-between">
              <div className="flex-grow text-left">Countries ({total}) </div>
            </div>
          </div>
          <div className="collapse-content p-0">
            {view === 'maps' ? (
              <PlayersCountriesMaps countries={countries} />
            ) : (
              <PlayersCountriesList countries={countries} />
            )}
          </div>
        </div>
      </div>
      <div className="divider m-0" />
    </>
  );
};

PlayersCountriesMaps.displayName = 'PlayersCountriesMaps';
