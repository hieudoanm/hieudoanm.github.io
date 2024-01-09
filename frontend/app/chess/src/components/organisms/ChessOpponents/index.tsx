import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Insights } from '@chess/types/chess';
import Link from 'next/link';
import { useState } from 'react';

export const ChessOpponents: React.FC<{ insights: Insights }> = ({
  insights: { opponents = [] },
}) => {
  const [sort, setSort] = useState<{ by: string }>({ by: 'games' });

  const data = opponents.map(
    ({ opponent = '', games = 1, win = 0, draw = 0, loss = 0 }) => {
      const winPercentage = (win / games) * 100;
      const drawPercentage = (draw / games) * 100;
      const lossPercentage = (loss / games) * 100;
      return {
        opponent,
        games,
        win,
        winPercentage,
        draw,
        drawPercentage,
        loss,
        lossPercentage,
      };
    }
  );
  data.sort(
    (a: Record<string, string | number>, b: Record<string, string | number>) =>
      a[sort.by] < b[sort.by] ? 1 : -1
  );

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <h1 className="text-xl md:text-3xl">Opponents</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th isNumeric>No</Th>
                <Th>Opponent</Th>
                <Th isNumeric>
                  <div
                    className="cursor-pointer capitalize"
                    onClick={() => setSort({ by: 'games' })}
                  >
                    Games
                  </div>
                </Th>
                <Th isNumeric>
                  <div className="flex items-center justify-end gap-2">
                    <div
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'win' })}
                    >
                      Win
                    </div>
                    <div
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'winPercentage' })}
                    >
                      (%)
                    </div>
                  </div>
                </Th>
                <Th isNumeric>
                  <div className="flex items-center justify-end gap-2">
                    <div
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'draw' })}
                    >
                      Draw
                    </div>
                    <div
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'drawPercentage' })}
                    >
                      (%)
                    </div>
                  </div>
                </Th>
                <Th isNumeric>
                  <div className="flex items-center justify-end gap-2">
                    <div
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'loss' })}
                    >
                      Loss
                    </div>
                    <div
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'lossPercentage' })}
                    >
                      (%)
                    </div>
                  </div>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(
                (
                  {
                    opponent = '',
                    games = 0,
                    win = 0,
                    winPercentage = 0,
                    draw = 0,
                    drawPercentage = 0,
                    loss = 0,
                    lossPercentage = 0,
                  },
                  index: number
                ) => {
                  return (
                    <Tr key={opponent}>
                      <Td isNumeric>{index + 1}</Td>
                      <Td>
                        <Link href={`/${opponent}`}>{opponent}</Link>
                      </Td>
                      <Td isNumeric>
                        <b>{games}</b>
                      </Td>
                      <Td isNumeric>
                        <span className="text-teal-500">
                          {win} ({winPercentage.toFixed(2)}%)
                        </span>
                      </Td>
                      <Td isNumeric>
                        <span className="text-gray-500">
                          {draw} ({drawPercentage.toFixed(2)}%)
                        </span>
                      </Td>
                      <Td isNumeric>
                        <span className="text-red-500">
                          {loss} ({lossPercentage.toFixed(2)}%)
                        </span>
                      </Td>
                    </Tr>
                  );
                }
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};
