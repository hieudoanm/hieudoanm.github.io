import flags from '@chess/common/json/flags.json';
import names from '@chess/common/json/names.json';
import Link from 'next/link';

export type CountryTotal = { countryCode: string; total: number };

export type PlayersCountriesListProperties = {
  countries: CountryTotal[];
};

export const PlayersCountriesList: React.FC<PlayersCountriesListProperties> = ({
  countries = [],
}) => {
  return (
    <div className="rounded border border-gray-200">
      <table>
        <thead>
          <tr>
            <th className="w-4">No</th>
            <th>Country</th>
            <th align="right">Total</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(({ countryCode = '', total = 0 }, index: number) => {
            const flag = (flags as Record<string, string>)[countryCode] ?? '';
            const name = (names as Record<string, string>)[countryCode] ?? '';
            return (
              <tr key={countryCode}>
                <td>{index + 1}</td>
                <td>
                  <Link href={`/countries/${countryCode}`}>
                    {flag} {name}
                  </Link>
                </td>
                <td align="right">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

PlayersCountriesList.displayName = 'PlayersCountriesList';
