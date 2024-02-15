'use client';

import {
  Insights,
  Result,
} from '@chess/app/api/chess/players/[username]/insights/model';
import { COLORS_MAP } from '@chess/common/constants/chess.constants';
import { customLabel } from '@chess/common/utils/custom-label';
import { CardHeading } from '@chess/shared/components/CardHeading';
import { FaTrophy } from 'react-icons/fa6';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const ChessResult: React.FC<{
  title: string;
  results: Result[];
  color: 'gray' | 'teal' | 'red';
}> = ({ title = '', color = 'gray', results = [] }) => {
  const data = results.map(({ result, count }) => ({
    name: result ?? '',
    value: count ?? 0,
  }));
  const total = data.reduce(
    (previous: number, { value = 0 }) => previous + value,
    0
  );
  const colors: string[] = COLORS_MAP[color];

  return (
    <div className="flex flex-col gap-y-8">
      <p className="text-base md:text-lg font-bold">{title}</p>
      <div className="rounded-2xl bg-gray-100 p-8">
        <div className="aspect-video">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Legend />
              <Tooltip />
              <Pie
                isAnimationActive={false}
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                startAngle={-270}
                fillOpacity={0.75}
                label={customLabel(data, total)}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const PlayerInsightsGamesResults: React.FC<{ insights: Insights }> = ({
  insights,
}) => {
  return (
    <div className="card border border-gray-200 shadow">
      <div className="py-4 px-8 border-b">
        <CardHeading>
          <div className="flex items-center gap-x-2">
            <FaTrophy />
            Game Results
          </div>
        </CardHeading>
      </div>
      <div className="card-body border-b">
        <ChessResult
          title="Games you won by ..."
          results={insights?.results?.win ?? []}
          color="teal"
        />
      </div>
      <div className="card-body border-b">
        <ChessResult
          title="Games you drawn by ..."
          results={insights?.results?.draw ?? []}
          color="gray"
        />
      </div>
      <div className="card-body border-b">
        <ChessResult
          title="Games you lost by ..."
          results={insights?.results?.loss ?? []}
          color="red"
        />
      </div>
      <div className="card-body" />
    </div>
  );
};

PlayerInsightsGamesResults.displayName = 'PlayerInsightsGamesResults';
