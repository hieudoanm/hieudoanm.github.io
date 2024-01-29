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
import { ChessStats, ChessTimeClass } from '@prisma/client';
import Link from 'next/link';
import { FullChessPlayer } from '../TitledChart';

const getRatingByTimeClass = (
  chessTimeClass: ChessTimeClass,
  stats: ChessStats[] = []
): number => {
  const chessStats = stats.find(
    ({ timeClass }) => timeClass === chessTimeClass
  );
  return chessStats?.last ?? 0;
};

export const TitledPlayers: React.FC<{
  players: FullChessPlayer[];
}> = ({ players = [] }) => {
  return (
    <Accordion allowToggle className="rounded border">
      <AccordionItem className="border-0">
        <AccordionButton className="border-b">
          <div className="flex w-full items-center justify-between">
            <div className="flex-grow text-left">
              Players ({players.length})
            </div>
            <AccordionIcon />
          </div>
        </AccordionButton>
        <AccordionPanel padding={0}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th className="w-4">No</Th>
                  <Th>Username</Th>
                  <Th className="w-4" isNumeric>
                    Country
                  </Th>
                  <Th className="w-4" isNumeric>
                    Rapid
                  </Th>
                  <Th className="w-4" isNumeric>
                    Blitz
                  </Th>
                  <Th className="w-4" isNumeric>
                    Bullet
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {players.map(
                  (
                    {
                      username = '',
                      avatar = '',
                      country,
                      countryCode = '',
                      stats = [],
                    },
                    index: number
                  ) => {
                    return (
                      <Tr key={username}>
                        <Td>{index + 1}</Td>
                        <Td>
                          <Link
                            href={`/players/${encodeURIComponent(username)}`}
                            className="inline-flex items-center gap-2">
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
                            <p className="inline">{username}</p>
                          </Link>
                        </Td>
                        <Td isNumeric>
                          <Link href={`/countries/${countryCode}`}>
                            {country.flag} {country.name}
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
