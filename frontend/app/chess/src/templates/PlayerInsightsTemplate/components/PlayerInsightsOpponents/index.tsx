'use client';

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
import { Insights } from '@chess/common/types/chess';
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
                  <button
                    type="button"
                    className="cursor-pointer capitalize"
                    onClick={() => setSort({ by: 'games' })}>
                    Games
                  </button>
                </Th>
                <Th isNumeric>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'win' })}>
                      Win
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'winPercentage' })}>
                      (%)
                    </button>
                  </div>
                </Th>
                <Th isNumeric>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'draw' })}>
                      Draw
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'drawPercentage' })}>
                      (%)
                    </button>
                  </div>
                </Th>
                <Th isNumeric>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'loss' })}>
                      Loss
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer capitalize"
                      onClick={() => setSort({ by: 'lossPercentage' })}>
                      (%)
                    </button>
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
                        <Link href={`/players/${encodeURIComponent(opponent)}`}>
                          {opponent}
                        </Link>
                      </Td>
                      <Td isNumeric>
                        <b>{games}</b>
                      </Td>
                      <Td isNumeric>
                        <p className="text-teal-500">
                          {win} ({winPercentage.toFixed(2)}%)
                        </p>
                      </Td>
                      <Td isNumeric>
                        <p className="text-gray-500">
                          {draw} ({drawPercentage.toFixed(2)}%)
                        </p>
                      </Td>
                      <Td isNumeric>
                        <p className="text-red-500">
                          {loss} ({lossPercentage.toFixed(2)}%)
                        </p>
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
