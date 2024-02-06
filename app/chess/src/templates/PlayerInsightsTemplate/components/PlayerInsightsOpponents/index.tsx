'use client';

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
    <div className="card border border-gray-200">
      <div className="py-4 px-8">
        <h1 className="text-xl md:text-3xl">Opponents</h1>
      </div>
      <div className="divider" />
      <div className="card-body">
        <div className="rounded border border-gray-200">
          <table className="table">
            <thead>
              <tr>
                <th align="right">No</th>
                <th>Opponent</th>
                <th align="right">
                  <button
                    type="button"
                    className="cursor-pointer capitalize"
                    onClick={() => setSort({ by: 'games' })}>
                    Games
                  </button>
                </th>
                <th align="right">
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
                </th>
                <th align="right">
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
                </th>
                <th align="right">
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
                </th>
              </tr>
            </thead>
            <tbody>
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
                    <tr key={opponent}>
                      <td align="right">{index + 1}</td>
                      <td>
                        <Link href={`/players/${encodeURIComponent(opponent)}`}>
                          {opponent}
                        </Link>
                      </td>
                      <td align="right">
                        <b>{games}</b>
                      </td>
                      <td align="right">
                        <p className="text-teal-500">
                          {win} ({winPercentage.toFixed(2)}%)
                        </p>
                      </td>
                      <td align="right">
                        <p className="text-gray-500">
                          {draw} ({drawPercentage.toFixed(2)}%)
                        </p>
                      </td>
                      <td align="right">
                        <p className="text-red-500">
                          {loss} ({lossPercentage.toFixed(2)}%)
                        </p>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
