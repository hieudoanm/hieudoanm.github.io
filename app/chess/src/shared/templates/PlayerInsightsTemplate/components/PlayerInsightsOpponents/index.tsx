'use client';

import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { CardHeading } from '@chess/shared/components/CardHeading';
import { SectionHeading } from '@chess/shared/components/SectionHeading';
import Link from 'next/link';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';

export const PlayerInsightsOpponents: React.FC<{ insights: Insights }> = ({
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
    <>
      <div id="openings" className="text-center">
        <SectionHeading>
          <div className="flex items-center justify-center gap-x-2">
            <FaUser className="text-teal-500" /> Opponents
          </div>
        </SectionHeading>
        <p className="text-xs md:text-sm lg:text-base">
          Most Frequeny Opponents
        </p>
      </div>
      <div className="card border border-gray-200 shadow">
        <div className="py-4 px-8 border-b">
          <CardHeading>Opponents</CardHeading>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="px-8">
                <th align="left" className="pl-8">
                  No
                </th>
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
                <th align="right" className="pr-8">
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
                      <td align="left" className="pl-8">
                        {index + 1}
                      </td>
                      <td>
                        <Link href={`/players/${encodeURIComponent(opponent)}`}>
                          {opponent}
                        </Link>
                      </td>
                      <td align="right">
                        <b>{games}</b>
                      </td>
                      <td align="right">
                        <div className="text-teal-500 truncate">
                          {win} ({winPercentage.toFixed(2)}%)
                        </div>
                      </td>
                      <td align="right">
                        <div className="text-gray-500 truncate">
                          {draw} ({drawPercentage.toFixed(2)}%)
                        </div>
                      </td>
                      <td align="right">
                        <div className="pr-8 text-red-500 truncate">
                          {loss} ({lossPercentage.toFixed(2)}%)
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

PlayerInsightsOpponents.displayName = 'PlayerInsightsOpponents';
