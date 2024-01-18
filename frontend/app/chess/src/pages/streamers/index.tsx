import { constants } from 'node:http2';
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
import { apolloClient } from '@chess/common/graphql';
import { logger } from '@chess/common/libs/logger';
import { resolveQuery } from '@chess/common/utils/resolve-query';
import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import { ChessPlayer, ChessTitle } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { FaTwitch } from 'react-icons/fa';

type StreamersPageProperties = {
  total: number;
  title: ChessTitle;
  country: string;
  players: ChessPlayer[];
  countries: { countryCode: string; country: string }[];
};

const StreamersPage: NextPage<StreamersPageProperties> = ({
  total = 0,
  title: initialTitle,
  country: initialCountry,
  players = [],
  countries = [],
}) => {
  const router = useRouter();
  const [title, setTitle] = useState<ChessTitle>(initialTitle);
  const [country, setCountry] = useState<string>(initialCountry);

  return (
    <Layout>
      <Container>
        <div className='py-4 md:py-8'>
          <Card className='border border-gray-200 shadow'>
            <CardHeader>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                className='gap-x-4 md:gap-x-8'>
                <Heading as='h1' className='text-xl'>
                  Streamers ({total})
                </Heading>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  className='gap-x-2 md:gap-x-4'>
                  <Select
                    id='title'
                    name='title'
                    placeholder='Title'
                    value={title}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                      const newTitle: ChessTitle = event.target
                        .value as ChessTitle;
                      setTitle(newTitle);
                      router.push({
                        pathname: router.pathname,
                        query: { ...router.query, title: newTitle },
                      });
                    }}>
                    <option value='GM'>GM</option>
                    <option value='IM'>IM</option>
                    <option value='FM'>FM</option>
                    <option value='CM'>CM</option>
                    <option value='NM'>NM</option>
                    <option value='WGM'>WGM</option>
                    <option value='WIM'>WIM</option>
                    <option value='WFM'>WFM</option>
                    <option value='WCM'>WCM</option>
                    <option value='WNM'>WNM</option>
                  </Select>
                  <Select
                    id='country'
                    name='country'
                    placeholder={`Country (${countries.length})`}
                    value={country}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                      const newCountry = event.target.value;
                      setCountry(newCountry);
                      router.push({
                        pathname: router.pathname,
                        query: { ...router.query, country: newCountry },
                      });
                    }}>
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
                    <Th className='w-4'>Title</Th>
                    <Th>Username</Th>
                    <Th isNumeric className='w-4'>
                      Country
                    </Th>
                    <Th isNumeric className='w-4'>
                      Followers
                    </Th>
                    <Th isNumeric className='w-4'>
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
                                <Badge colorScheme='red'>{title}</Badge>
                              </Link>
                            ) : (
                              <></>
                            )}
                          </Td>
                          <Td>
                            <Link href={`/${username}`}>
                              <div className='inline-flex items-center gap-x-2'>
                                {avatar.length > 0 ? (
                                  <div
                                    className='aspect-square w-8 rounded bg-contain bg-center'
                                    style={{
                                      backgroundImage: `url(${avatar})`,
                                    }}
                                  />
                                ) : (
                                  <div className='aspect-square w-8 rounded border' />
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
                            <Link href={twitchUrl} target='_blank'>
                              <Button
                                size='sm'
                                type='button'
                                colorScheme='teal'>
                                <Icon as={FaTwitch} />
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

const query: DocumentNode = gql`
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

export const getServerSideProps: GetServerSideProps<StreamersPageProperties> =
  async (context: GetServerSidePropsContext) => {
    const title = resolveQuery(context.query, 'title', 'GM') as ChessTitle;
    const country = resolveQuery(context.query, 'country');
    try {
      const response = await apolloClient.query<{
        chess: { streamers: StreamersPageProperties };
      }>({
        query,
        variables: { title, country },
      });
      logger.info(`getServerSideProps response=${response}`);
      const {
        data: {
          chess: {
            streamers: { total = 0, countries = [], players = [] },
          },
        },
      } = response;
      return { props: { title, country, total, countries, players } };
    } catch (error) {
      logger.error(
        `getServerSideProps title=${title} country=${country} error=${error}`
      );
      return {
        props: { title, country, total: 0, players: [], countries: [] },
      };
    }
  };

export default StreamersPage;
