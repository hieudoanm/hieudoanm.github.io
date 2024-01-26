import { DocumentNode, gql } from '@apollo/client';
import {
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Heading,
  Icon,
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
import { ChessPlayer, ChessTitle } from '@chess/common/types/chess';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { Layout } from '@chess/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent } from 'react';
import { FaTwitch } from 'react-icons/fa';

const streamersQuery: DocumentNode = gql`
  query StreamersQuery($title: Title, $country: String) {
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
          country
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

type StreamersResponse = {
  chess: {
    streamers: {
      total: number;
      title: ChessTitle;
      country: string;
      players: ChessPlayer[];
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

  const data = await query<StreamersResponse>({
    query: streamersQuery,
    variables: { title, country },
  });
  const total = data?.chess?.streamers?.total ?? 0;
  const countries = data?.chess?.streamers?.countries ?? [];
  const players = data?.chess?.streamers?.players ?? [];

  return (
    <Layout>
      <Container>
        <div className="py-4 md:py-8">
          <Card className="border border-gray-200 shadow">
            <CardHeader>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className="gap-x-4 md:gap-x-8"
              >
                <Heading className="text-xl">Streamers ({total})</Heading>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  className="gap-x-2 md:gap-x-4"
                >
                  <Select
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={title}
                    // onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    //   const newTitle: ChessTitle = event.target
                    //     .value as ChessTitle;
                    //   const updatedSearchParameters = {
                    //     ...searchParams,
                    //     title: newTitle,
                    //   };
                    // const newSearchParameters = new URLSearchParams([
                    //   ...updatedSearchParameters.entries(),
                    // ]);
                    // router.push(
                    //   `${pathname}${newSearchParameters.toString()}`
                    // );
                    // }}
                  >
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
                    value={country}
                    // onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    //   const newCountry: string = event.target.value;
                    // const updatedSearchParameters = {
                    //   ...searchParams,
                    //   country: newCountry,
                    // };
                    // const newSearchParameters = new URLSearchParams([
                    //   ...updatedSearchParameters.entries(),
                    // ]);
                    // router.push(
                    //   `${pathname}${newSearchParameters.toString()}`
                    // );
                    // }}
                  >
                    {countries.map(({ countryCode, country }) => {
                      return (
                        <option key={countryCode} value={countryCode}>
                          {country}
                        </option>
                      );
                    })}
                  </Select>
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
                      country = '',
                      countryCode = '',
                      twitchUrl = '',
                    }) => {
                      return (
                        <Tr key={username}>
                          <Td>
                            {(title ?? '').length > 0 ? (
                              <Link href={`/titled/${title}`}>
                                <Badge colorScheme="red">{title}</Badge>
                              </Link>
                            ) : (
                              <></>
                            )}
                          </Td>
                          <Td>
                            <Link href={`/${username}`}>
                              <div className="inline-flex items-center gap-x-2">
                                {avatar.length > 0 ? (
                                  <div
                                    className="aspect-square w-8 rounded bg-contain bg-center"
                                    style={{
                                      backgroundImage: `url(${avatar})`,
                                    }}
                                  />
                                ) : (
                                  <div className="aspect-square w-8 rounded border" />
                                )}
                                <Text>{username}</Text>
                              </div>
                            </Link>
                          </Td>
                          <Td isNumeric>
                            <Link href={`/countries/${countryCode}`}>
                              {country}
                            </Link>
                          </Td>
                          <Td isNumeric>{followers.toLocaleString()}</Td>
                          <Td isNumeric>
                            <Link href={twitchUrl} target="_blank">
                              <Button
                                size="sm"
                                type="button"
                                colorScheme="teal"
                              >
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
    </Layout>
  );
};

export default StreamersPage;
