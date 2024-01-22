import { DocumentNode, gql } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Heading,
  Icon,
  List,
  ListItem,
  useToast,
} from '@chakra-ui/react';
import {
  DRAW_RESULTS,
  LOSS_RESULTS,
  WIN_RESULTS,
} from '@chess/common/constants';
import { apolloClient } from '@chess/common/graphql';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import { ChessGame } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import {
  FaBolt,
  FaClock,
  FaRocket,
  FaSearchengin,
  FaSync,
} from 'react-icons/fa';

const TimeClassIcon: React.FC<{ timeClass: string }> = ({ timeClass = '' }) => {
  if (timeClass === 'bullet') {
    return <Icon as={FaRocket} boxSize={6} />;
  }
  if (timeClass === 'rapid') {
    return <Icon as={FaClock} boxSize={6} />;
  }
  if (timeClass === 'blitz') {
    return <Icon as={FaBolt} boxSize={6} />;
  }
  return <></>;
};

const getPoint = (result: string): number => {
  if (WIN_RESULTS.includes(result)) {
    return 1;
  }
  if (DRAW_RESULTS.includes(result)) {
    return 0.5;
  }
  if (LOSS_RESULTS.includes(result)) {
    return 0;
  }
  return -1;
};

const FONT_SEMIBOLD = 'font-semibold';

const mutation = gql`
  mutation SyncGames($username: String!) {
    chess {
      games(username: $username) {
        existed
        synced
        total
      }
    }
  }
`;

const GamesPage: NextPage<{ username: string; games: ChessGame[] }> = ({
  username = '',
  games = [],
}) => {
  const toast = useToast();

  const syncGames = async () => {
    await apolloClient.mutate({ mutation, variables: { username } });
    toast({
      title: 'Games Synced',
      description: 'Games are Synced Successfully',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Layout>
      <Container>
        <div className="py-8">
          <Card className="border border-gray-200 shadow">
            <CardHeader>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Heading className="text-xl">Games ({games.length})</Heading>
                <Button colorScheme="teal" onClick={syncGames}>
                  <Icon as={FaSync} />
                </Button>
              </Box>
            </CardHeader>
            <List className="flex flex-col gap-y-2">
              {games.map(
                ({
                  id,
                  timeClass,
                  whiteUsername,
                  blackUsername,
                  whiteResult,
                  whiteRating,
                  blackResult,
                  blackRating,
                  endTime,
                }: ChessGame) => {
                  return (
                    <ListItem key={id} className="border-t p-2 md:p-4">
                      <div className="flex items-center justify-between gap-2 md:gap-4">
                        <div className="flex items-center gap-x-2 md:gap-x-4">
                          <div>
                            <TimeClassIcon timeClass={timeClass} />
                          </div>
                          <div>
                            <Link
                              href={`/${whiteUsername}`}
                              className={`block ${
                                whiteUsername === username ? FONT_SEMIBOLD : ''
                              }`}>
                              {whiteUsername} ({whiteRating})
                            </Link>
                            <Link
                              href={`/${blackUsername}`}
                              className={`block ${
                                blackUsername === username ? FONT_SEMIBOLD : ''
                              }`}>
                              {blackUsername} ({blackRating})
                            </Link>
                          </div>
                        </div>
                        <div className="flex items-center gap-x-2 md:gap-x-4">
                          <div className="text-right">
                            <p
                              className={
                                whiteUsername === username ? FONT_SEMIBOLD : ''
                              }>
                              {getPoint(whiteResult)}
                            </p>
                            <p
                              className={
                                blackUsername === username ? FONT_SEMIBOLD : ''
                              }>
                              {getPoint(blackResult)}
                            </p>
                          </div>
                          <div>
                            <p>{endTime.toString().split('T')[0]}</p>
                          </div>
                          <div>
                            <Button colorScheme="teal">
                              <Icon as={FaSearchengin} boxSize={6} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ListItem>
                  );
                }
              )}
            </List>
          </Card>
        </div>
      </Container>
    </Layout>
  );
};

const query: DocumentNode = gql`
  query Player($username: String!) {
    chess {
      player(username: $username) {
        games {
          id
          url
          pgn
          timeControl
          timeClass
          endTime
          rated
          tcn
          initialSetup
          rules
          whiteUsername
          blackUsername
          whiteAccuracy
          blackAccuracy
          whiteResult
          blackResult
          whiteRating
          blackRating
          fen
        }
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const username: string = context.query.username?.toString() ?? '';
  try {
    const {
      data: {
        chess: {
          player: { games = [] },
        },
      },
    } = await apolloClient.query<{
      chess: { player: { games: ChessGame[] } };
    }>({ query, variables: { username } });
    return { props: { username, games } };
  } catch (error) {
    logger.error(`getServerSideProps error=${error}`);
    return { props: { username, games: [] } };
  }
};

export default GamesPage;
