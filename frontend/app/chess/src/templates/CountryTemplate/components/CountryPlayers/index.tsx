import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { TitleBadge } from '@chess/common/components/TitleBadge';
import { ChessPlayer, ChessStats, ChessTimeClass } from '@prisma/client';
import Link from 'next/link';

const getRatingByTimeClass = (
  chessTimeClass: ChessTimeClass,
  stats: ChessStats[] = []
): number => {
  const chessStats = (stats ?? []).find(({ timeClass }) => {
    return timeClass === chessTimeClass;
  });
  return chessStats?.last ?? 0;
};

export type CountryPlayersProperties = {
  total: number;
  players: (ChessPlayer & { stats: ChessStats[] })[];
};

export const CountryPlayers: React.FC<CountryPlayersProperties> = ({
  total = 0,
  players = [],
}) => {
  return (
    <Accordion allowToggle className="rounded border">
      <AccordionItem className="border-0">
        <AccordionButton className="border-b">
          <div className="flex w-full items-center justify-between">
            <div className="flex-grow text-left">Players ({total})</div>
            <AccordionIcon />
          </div>
        </AccordionButton>
        <AccordionPanel padding={0}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th className="w-4">Title</Th>
                  <Th>Username</Th>
                  <Th isNumeric className="w-4">
                    Bullet
                  </Th>
                  <Th isNumeric className="w-4">
                    Blitz
                  </Th>
                  <Th isNumeric className="w-4">
                    Rapid
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {players.map(
                  ({ title, username = '', avatar = '', stats = [] }) => {
                    return (
                      <Tr key={username}>
                        <Td>
                          <TitleBadge title={title} />
                        </Td>
                        <Td>
                          <Link
                            href={`/players/${encodeURIComponent(username)}`}>
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
                              <p>{username}</p>
                            </div>
                          </Link>
                        </Td>
                        <Td isNumeric>
                          {getRatingByTimeClass('rapid', stats)}
                        </Td>
                        <Td isNumeric>
                          {getRatingByTimeClass('blitz', stats)}
                        </Td>
                        <Td isNumeric>
                          {getRatingByTimeClass('bullet', stats)}
                        </Td>
                      </Tr>
                    );
                  }
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
