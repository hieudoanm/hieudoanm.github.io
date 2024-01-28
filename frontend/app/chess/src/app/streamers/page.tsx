import {
  DocumentNode,
  OperationVariables,
  QueryOptions,
  gql,
} from '@apollo/client';
import {
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Heading,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import {
  ChessCountry,
  ChessPlayer,
  ChessStats,
  ChessTitle,
} from '@prisma/client';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const streamersQuery: DocumentNode = gql`
  query StreamersQuery($title: String, $country: String) {
    chess {
      streamers(title: $title, country: $country) {
        total
        countries {
          countryCode
          country
        }
        players {
          id
          username
          name
          followers
          avatar
          location
          countryCode
          twitchUrl
          isStreamer
          verified
          lastOnline
          joined
          status
          title
          league
          archives
          country {
            cca2
            cca3
            name
            flag
          }
          stats {
            best
            last
            deviation
            win
            draw
            loss
          }
        }
      }
    }
  }
`;

type StreamersData = {
  chess: {
    streamers: {
      total: number;
      title: ChessTitle;
      players: (ChessPlayer & { country: ChessCountry; stats: ChessStats[] })[];
      countries: { countryCode: string; country: string }[];
    };
  };
};

type StreamersPageProperties = {
  searchParams: { title: string; country: string };
};

const StreamersPage: NextPage<StreamersPageProperties> = async ({
  searchParams,
}: StreamersPageProperties) => {
  const title = searchParams?.title ?? '';
  const country = searchParams?.country ?? '';
  logger.info(`StreamersPage country=${country} title=${title}`);

  const queryOptions: QueryOptions<OperationVariables, StreamersData> = {
    query: streamersQuery,
    variables: { title, country },
  };
  const data: StreamersData = await query<StreamersData>(
    'streamersQuery',
    queryOptions
  );
  const total: number = data?.chess?.streamers?.total ?? 0;
  const countries = data?.chess?.streamers?.countries ?? [];
  const players = data?.chess?.streamers?.players ?? [];

  return (
    <Container>
      <div className="py-4 md:py-8">
        <Card className="border border-gray-200 shadow">
          <CardHeader>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              className="gap-x-4 md:gap-x-8">
              <Heading className="text-xl">Streamers ({total})</Heading>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className="gap-x-2 md:gap-x-4">
                {/* <Select
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={title}>
                    <option value="GM">GM</option>
                    <option value="IM">IM</option>
                    <option value="FM">FM</option>
                    <option value="CM">CM</option>
                    <option value="NM">NM</option>
                    <option value="WGM">WGM</option>
                    <option value="WIM">WIM</option>
                    <option value="WFM">WFM</option>
                    <option value="WCM">WCM</option>
                    <option value="WNM">WNM</option>
                  </Select>
                  <Select
                    id="country"
                    name="country"
                    placeholder={`Country (${countries.length})`}
                    value={country}>
                    {countries.map(({ countryCode, country }) => {
                      return (
                        <option key={countryCode} value={countryCode}>
                          {country}
                        </option>
                      );
                    })}
                  </Select> */}
              </Box>
            </Box>
          </CardHeader>
          <Divider />
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th className="w-4">Title</Th>
                  <Th>Username</Th>
                  <Th isNumeric className="w-4">
                    Country
                  </Th>
                  <Th isNumeric className="w-4">
                    Followers
                  </Th>
                  <Th isNumeric className="w-4">
                    Twitch
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {players.map(
                  ({
                    title = '',
                    username = '',
                    avatar = '',
                    followers = 0,
                    country,
                    countryCode = '',
                    twitchUrl = '',
                  }) => {
                    return (
                      <Tr key={username}>
                        <Td>
                          {(title ?? '').length > 0 ? (
                            <Link href={`/titled/${title}`}>
                              <Badge color="white" backgroundColor="red.500">
                                {title}
                              </Badge>
                            </Link>
                          ) : (
                            <></>
                          )}
                        </Td>
                        <Td>
                          <Link
                            href={`/players/${encodeURIComponent(username)}`}>
                            <div className="inline-flex items-center gap-x-2">
                              <div className="h-12 w-12 overflow-hidden rounded border">
                                {avatar.length > 0 ? (
                                  <Image
                                    src={avatar}
                                    alt={username}
                                    title={username}
                                    width={48}
                                    height={48}
                                  />
                                ) : (
                                  <></>
                                )}
                              </div>
                              <Text>{username}</Text>
                            </div>
                          </Link>
                        </Td>
                        <Td isNumeric>
                          <Link href={`/countries/${countryCode}`}>
                            {country.name}
                          </Link>
                        </Td>
                        <Td isNumeric>{followers.toLocaleString()}</Td>
                        <Td isNumeric>
                          <Link href={twitchUrl} target="_blank">
                            <Button size="sm" type="button" colorScheme="teal">
                              {/* <Icon as={FaTwitch} /> */}
                              Twitch
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    );
                  }
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </Container>
  );
};

export default StreamersPage;
