import {
  Card,
  CardHeader,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { TitleBadge } from '@chess/components/atoms/TitleBadge';
import { ChessPlayer, ChessStats } from '@prisma/client';
import Image from 'next/image';

type PlayersTemplateProperties = {
  players: (ChessStats & { player: ChessPlayer })[];
};

export const PlayersTemplate: React.FC<PlayersTemplateProperties> = ({
  players = [],
}) => {
  return (
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
                  player: { id = '', username = '', avatar = '', title },
                }) => {
                  return (
                    <Tr key={id}>
                      <Td>
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
                      </Td>
                      <Td>{id}</Td>
                      <Td>
                        <Link href={`/players/${encodeURIComponent(username)}`}>
                          {username}
                        </Link>
                      </Td>
                      <Td>
                        <TitleBadge title={title} />
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
  );
};

PlayersTemplate.displayName = 'PlayersTemplate';
