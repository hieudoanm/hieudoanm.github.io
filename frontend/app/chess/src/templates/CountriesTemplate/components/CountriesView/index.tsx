'use client';

import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { Country } from '../..';
import { CountriesMaps } from '../CountriesMaps';
import { CountriesTable } from '../CountriesTable';

export type CountriesViewProperties = {
  countries: Country[];
};

export const CountriesView: React.FC<CountriesViewProperties> = ({
  countries = [],
}) => {
  const [view] = useSearchParameter('view');

  return (
    <>
      {view === 'maps' ? (
        <CountriesMaps countries={countries} />
      ) : (
        <CountriesTable countries={countries} />
      )}
    </>
  );
};

CountriesView.displayName = 'CountriesView';
