import { ChessTitle } from '@prisma/client';
import { CountriesHeader } from './components/CountriesHeader';
import { CountriesView } from './components/CountriesView';

export type Country = { countryCode: string; count: number };

export type CountriesTemplateProperties = {
  titles: ChessTitle[];
  countries: Country[];
};

export const CountriesTemplate: React.FC<CountriesTemplateProperties> = ({
  titles = [],
  countries = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <CountriesHeader total={countries.length} titles={titles} />
      <CountriesView countries={countries} />
    </div>
  );
};
