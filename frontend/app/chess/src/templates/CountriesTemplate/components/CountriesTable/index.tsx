import {
  Card,
  CardHeader,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Country } from '../..';

export type CountriesTableProperties = {
  countries: Country[];
};

export const CountriesTable: React.FC<CountriesTableProperties> = ({
  countries = [],
}) => {
  return (
    <Card className="border border-gray-200 shadow">
      <CardHeader>
        <Heading className="text-xl">Countries ({countries.length})</Heading>
      </CardHeader>
      <Divider />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th className="w-4">No</Th>
              <Th>Country</Th>
              <Th isNumeric>Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {countries.map(({ countryCode = '', count = 0 }, index: number) => {
              return (
                <Tr key={countryCode}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Link href={`/countries/${countryCode}`}>
                      {countryCode}
                    </Link>
                  </Td>
                  <Td isNumeric>{count}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};
