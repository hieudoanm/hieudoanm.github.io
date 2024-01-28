import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import {
  Badge,
  Card,
  CardHeader,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { ChessPlayer, ChessStats } from '@prisma/client';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const playersQuery = gql`
  query PlayersQuery($limit: Int, $offset: Int) {
    chess {
      players(limit: $limit, offset: $offset) {
        timeClass
        best
        last
        deviation
        win
        draw
        loss
        player {
          id
          username
          name
          followers
          avatar
          location
          verified
          lastOnline
          joined
          status
          title
          league
          twitchUrl
          isStreamer
          countryCode
          archives
          country {
            cca2
            cca3
            name
            flag
          }
        }
      }
    }
  }
`;

type PlayersResponse = {
  chess: { players: (ChessStats & { player: ChessPlayer })[] };
};

type PlayersPageProperties = {
  searchParams: { limit: number; offset: number };
};

const PlayersPage: NextPage<PlayersPageProperties> = async ({
  searchParams,
}: PlayersPageProperties) => {
  const limit: number = searchParams.limit ?? 100;
  const offset: number = searchParams.offset ?? 0;
  logger.info(`PlayersPage limit=${limit} offset=${offset}`);

  const queryOptions: QueryOptions<OperationVariables, PlayersResponse> = {
    query: playersQuery,
    variables: { limit, offset },
  };
  const data: PlayersResponse = await query<PlayersResponse>(
    'playersQuery',
    queryOptions
  );
  const players = data?.chess?.players ?? '';
  logger.info(`PlayersPage players=${players.length}`);

  return (
    <Container>
      <div className="py-8">
        <div className="overflow-hidden rounded border">
          <Card>
            <CardHeader className="border-b">
              <div>Player</div>
            </CardHeader>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Avatar</Th>
                    <Th>ID</Th>
                    <Th>Username</Th>
                    <Th>Title</Th>
                    <Th isNumeric>Rating</Th>
                    <Th isNumeric>Best</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {players.map(
                    ({
                      last = 0,
                      best = 0,
                      player: {
                        id = '',
                        username = '',
                        avatar = '',
                        title = '',
                      },
                    }) => {
                      return (
                        <Tr key={id}>
                          <Td>
                            <div className="h-12 w-12 overflow-hidden rounded border">
                              {avatar ? (
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
                          </Td>
                          <Td>{id}</Td>
                          <Td>
                            <Link
                              href={`/players/${encodeURIComponent(username)}`}>
                              {username}
                            </Link>
                          </Td>
                          <Td>
                            <Badge color="white" backgroundColor="red.500">
                              {title}
                            </Badge>
                          </Td>
                          <Td isNumeric>{last}</Td>
                          <Td isNumeric>{best}</Td>
                        </Tr>
                      );
                    }
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default PlayersPage;
