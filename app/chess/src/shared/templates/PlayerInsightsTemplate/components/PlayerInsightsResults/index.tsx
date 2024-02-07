'use client';

import { COLORS_MAP } from '@chess/common/constants/chess.constants';
import { Insights, Result } from '@chess/common/types/chess';
import { customLabel } from '@chess/common/utils/custom-label';
import { Heading } from '@chess/shared/components/Heading';
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
    <div className="flex flex-col gap-y-4">
      <p className="font-bold">{title}</p>
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

export const ChessResults: React.FC<{ insights: Insights }> = ({
  insights,
}) => {
  return (
    <div className="card border border-gray-200 shadow">
      <div className="py-4 px-8 border-b">
        <Heading>Game Results</Heading>
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
