import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
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
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th className="w-4">No</Th>
            <Th>Country</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {countries.map(({ countryCode = '', total = 0 }, index: number) => {
            const flag = (flags as Record<string, string>)[countryCode] ?? '';
            const name = (names as Record<string, string>)[countryCode] ?? '';
            return (
              <Tr key={countryCode}>
                <Td>{index + 1}</Td>
                <Td>
                  <Link href={`/countries/${countryCode}`}>
                    {flag} {name}
                  </Link>
                </Td>
                <Td isNumeric>{total}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

PlayersCountriesList.displayName = 'PlayersCountriesList';
