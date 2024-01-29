import { CountriesHeader } from './components/CountriesHeader';
import { CountriesView } from './components/CountriesView';

export type Country = { countryCode: string; count: number };

export type CountriesTemplateProperties = {
  countries: Country[];
};

export const CountriesTemplate: React.FC<CountriesTemplateProperties> = ({
  countries = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <CountriesHeader total={countries.length} />
      <CountriesView countries={countries} />
    </div>
  );
};
