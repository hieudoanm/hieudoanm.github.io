'use client';

import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import {
  GRAY_COLOR,
  RED_COLOR,
  TEAL_COLOR,
} from '@chess/common/constants/chess.constants';
import { CardHeading } from '@chess/shared/components/CardHeading';
import { ReactNode } from 'react';
import {
  FaChessBoard,
  FaCrosshairs,
  FaMagnifyingGlass,
  FaSquare,
  FaSquareMinus,
  FaSquarePlus,
} from 'react-icons/fa6';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ChessGames: React.FC<{
  percentage: number;
  value: number;
  label: string;
  iconAs: ReactNode;
}> = ({ percentage = 0, value = 0, label = '', iconAs = <></> }) => {
  return (
    <div className="flex flex-col gap-y-1 md:gap-y-2">
      <div className="flex items-center gap-x-1 md:gap-x-2">
        {iconAs}
        <b className="text-base md:text-lg">{percentage.toFixed(2)}%</b>
      </div>
      <div className="text-right text-xs capitalize md:text-sm truncate">
        {value} {label}
      </div>
    </div>
  );
};

const ChessAccuracy: React.FC<{
  value: number;
  label: string;
  iconAs: ReactNode;
}> = ({ value = 0, label = '', iconAs = <></> }) => {
  return (
    <div className="flex flex-col gap-y-1 md:gap-y-2">
      <p className="text-right text-xs capitalize md:text-sm truncate">
        {label}
      </p>
      <div className="flex items-center justify-end gap-x-1 md:gap-x-2">
        {iconAs}
        <b className="text-base md:text-lg">{value.toFixed(2)}%</b>
      </div>
    </div>
  );
};

export const PlayerInsightsGamesResultsByOpponentsRating: React.FC<{
  insights: Insights;
}> = ({ insights = {} as Insights }) => {
  const data = (insights?.results?.opponents ?? []).map(
    ({ rating = 0, win = 0, draw = 0, loss = 0 }) => {
      const total: number = win + draw + loss;
      const winPercentage: number = Number.parseFloat(
        ((win / total) * 100).toFixed(2)
      );
      const lossPercentage: number = Number.parseFloat(
        ((loss / total) * 100).toFixed(2)
      );
      const drawPercentage: number = Number.parseFloat(
        (100 - winPercentage - lossPercentage).toFixed(2)
      );
      return { rating, winPercentage, drawPercentage, lossPercentage };
    }
  );

  return (
    <div className="flex flex-col gap-y-8">
      <p className="text-base md:text-lg font-bold">
        Results by Opponent Rating
      </p>
      {data.length > 0 ? (
        <div className="aspect-video">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={1600} height={900} barCategoryGap={1} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar
                isAnimationActive={false}
                fillOpacity={0.75}
                dataKey="lossPercentage"
                stackId="a"
                fill={RED_COLOR}
              />
              <Bar
                isAnimationActive={false}
                fillOpacity={0.75}
                dataKey="drawPercentage"
                stackId="a"
                fill={GRAY_COLOR}
              />
              <Bar
                isAnimationActive={false}
                fillOpacity={0.75}
                dataKey="winPercentage"
                stackId="a"
                fill={TEAL_COLOR}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export type PlayerInsightsGamesOverviewProperties = {
  insights: Insights;
};

export const PlayerInsightsGamesOverview: React.FC<
  PlayerInsightsGamesOverviewProperties
> = ({ insights }) => {
  const total: number = insights?.games?.total ?? 1;
  const win: number = insights?.games?.win ?? 0;
  const winPercentage: number = Number.parseFloat(
    ((win / total) * 100).toFixed(2)
  );
  const draw: number = insights?.games?.draw ?? 0;
  const drawPercentage: number = Number.parseFloat(
    ((draw / total) * 100).toFixed(2)
  );
  const loss: number = insights?.games?.loss ?? 0;
  const lossPercentage: number = Number.parseFloat(
    ((loss / total) * 100).toFixed(2)
  );

  return (
    <div className="card border border-gray-200 shadow">
      <div className="py-4 px-8 border-b">
        <CardHeading>
          <div className="flex items-center gap-x-2">
            <FaMagnifyingGlass />
            Overview
          </div>
        </CardHeading>
      </div>
      <div className="card-body border-b">
        <div className="flex flex-col gap-y-8">
          <p className="text-base md:text-lg truncate capitalize font-bold">
            Games played
          </p>
          <div className="flex flex-col overflow-auto">
            <div className="flex items-center justify-between gap-x-2 md:gap-x-4">
              <div className="flex items-center gap-x-2 md:gap-x-4">
                <FaChessBoard className="text-3xl md:text-4xl text-teal-500" />
                <p className="truncate text-3xl md:text-4xl">
                  {total.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2 md:gap-x-4">
                  <ChessGames
                    value={win}
                    percentage={winPercentage}
                    label="won"
                    iconAs={<FaSquarePlus className="text-teal-500" />}
                  />
                  <ChessGames
                    value={draw}
                    percentage={drawPercentage}
                    label="drawn"
                    iconAs={<FaSquare className="text-gray-500" />}
                  />
                  <ChessGames
                    value={loss}
                    percentage={lossPercentage}
                    label="lost"
                    iconAs={<FaSquareMinus className="text-red-500" />}
                  />
                </div>
                <div className="w-full rounded-full h-4 flex overflow-hidden">
                  <div
                    style={{ width: `${winPercentage}%` }}
                    className="bg-teal-500 h-full"
                  />
                  <div
                    style={{ width: `${drawPercentage}%` }}
                    className="bg-gray-500 h-full"
                  />
                  <div
                    style={{ width: `${lossPercentage}%` }}
                    className="bg-red-500 h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-video">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={1600}
                height={900}
                barCategoryGap={1}
                data={insights?.games?.periods ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar
                  isAnimationActive={false}
                  dataKey="games"
                  fill={TEAL_COLOR}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card-body border-b">
        <div className="flex flex-col gap-y-8">
          <p className="text-base md:text-lg truncate capitalize font-bold">
            Average accuracy
          </p>
          <div className="flex flex-col overflow-auto">
            <div className="flex items-center justify-between gap-x-2 md:gap-x-4">
              <div className="flex items-center gap-x-2 md:gap-x-4">
                <FaCrosshairs className="text-3xl md:text-4xl text-teal-500" />
                <p className="truncate text-3xl md:text-4xl">
                  {(insights?.accuracy?.average ?? 0).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-x-2 md:gap-x-4">
                <ChessAccuracy
                  value={insights?.accuracy?.win ?? 0}
                  label="When you win"
                  iconAs={<FaSquarePlus className="text-teal-500" />}
                />
                <ChessAccuracy
                  value={insights?.accuracy?.draw ?? 0}
                  label="When you draw"
                  iconAs={<FaSquare className="text-gray-500" />}
                />
                <ChessAccuracy
                  value={insights?.accuracy?.loss ?? 0}
                  label="When you lose"
                  iconAs={<FaSquareMinus className="text-red-500" />}
                />
              </div>
            </div>
          </div>
          <div className="aspect-video">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={1600}
                height={900}
                data={insights?.accuracy?.periods ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Area
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="average"
                  stroke={TEAL_COLOR}
                  fill="#1a8d8d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card-body">
        <PlayerInsightsGamesResultsByOpponentsRating insights={insights} />
      </div>
    </div>
  );
};

PlayerInsightsGamesOverview.displayName = 'PlayerInsightsGamesOverview';
