import { DocumentNode, gql } from '@apollo/client';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import maps from '@chess/common/json/world.json';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { SVGMaps } from '@chess/components/atoms/Maps';
import { query } from '@chess/graphql/apollo/client';
import { Layout } from '@chess/layout';
import chroma from 'chroma-js';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Country = { countryCode: string; country: string; total: number };

const CountriesTable: React.FC<{ countries: Country[] }> = ({
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
              <Th isNumeric>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {countries.map(
              (
                { countryCode = '', country = '', total = 0 },
                index: number
              ) => {
                return (
                  <Tr key={countryCode}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Link href={`/countries/${countryCode}`}>{country}</Link>
                    </Td>
                    <Td isNumeric>{total}</Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

const CountriesMaps: React.FC<{ countries: Country[] }> = ({
  countries = [],
}) => {
  // const router = useRouter();

  const gap = 50;
  const numberOfTitlePlayers: number[] = countries
    .map(({ total }) => total)
    .filter((total: number) => total < 1000);
  const min: number = Math.round(Math.min(...numberOfTitlePlayers) / gap) * gap;
  const max: number = Math.ceil(Math.max(...numberOfTitlePlayers) / gap) * gap;
  const range: number[] = Array.from({ length: (max - min) / gap }).map(
    (_value: unknown, index: number) => min + index * gap
  );
  const minColor: string = '#319795';
  const maxColor: string = '#234E52';
  const overColor: string = '#1D4044';
  const colors: string[] = chroma
    .scale([minColor, maxColor])
    .mode('rgb')
    .colors(range.length);
  const data = countries.map(({ countryCode, country, total }) => {
    if (total > max) {
      return {
        id: countryCode,
        label: country,
        value: total,
        color: overColor,
      };
    }
    const colorIndex: number = range.findIndex(
      (start: number) => start <= total && total < start + 100
    );
    const color = colors[colorIndex];
    return { id: countryCode, label: country, value: total, color };
  });
  return (
    <Card className="border border-gray-200 shadow">
      <CardHeader>
        <Heading className="text-xl">Countries ({countries.length})</Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex items-center gap-x-4 md:gap-x-8">
          <div className="grow">
            <SVGMaps
              id="world"
              maps={maps}
              data={data}
              // onClick={(id: string) => {
              //   router.push(`/countries/${id}`);
              // }}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            {colors.map((color: string, index: number) => {
              const start = range[index];
              const end = start + gap;
              const label: string = `${start} - ${end}`;
              return (
                <Tooltip label={label} key={color} placement="left">
                  <Box
                    bgColor={color}
                    className="aspect-square w-4 cursor-pointer overflow-hidden rounded text-white">
                    <Text color={color}>{color}</Text>
                  </Box>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const countriesQuery: DocumentNode = gql`
  query CountriesQuery {
    chess {
      countries {
        countryCode
        country
        total
      }
    }
  }
`;

type CountriesResponse = { chess: { countries: Country[] } };

const CountriesPage: NextPage = async () => {
  logger.info('CountriesPage');
  const data = await query<CountriesResponse>({ query: countriesQuery });
  const countries = data?.chess?.countries ?? [];

  return (
    <Layout>
      <Container>
        <div className="py-4 md:py-8">
          <Tabs isFitted variant="soft-rounded" colorScheme="teal">
            <TabList>
              <Tab>Maps</Tab>
              <Tab>List</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CountriesMaps countries={countries} />
              </TabPanel>
              <TabPanel>
                <CountriesTable countries={countries} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </Container>
    </Layout>
  );
};

export default CountriesPage;
