import { Card, CardBody, CardHeader, Divider } from '@chakra-ui/react';
import { COLORS_MAP } from '@chess/common/constants';
import { customLabel } from '@chess/common/utils/custom-label';
import { Insights, Result } from '@chess/types/chess';
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
      <h2 className="font-bold">{title}</h2>
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
                label={customLabel(data, total)}
              >
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
    <Card className="border border-gray-200">
      <CardHeader>
        <h1 className="text-xl md:text-3xl">Game Results</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <ChessResult
          title="Games you won by ..."
          results={insights?.results?.win ?? []}
          color="teal"
        />
      </CardBody>
      <Divider />
      <CardBody>
        <ChessResult
          title="Games you drawn by ..."
          results={insights?.results?.draw ?? []}
          color="gray"
        />
      </CardBody>
      <Divider />
      <CardBody>
        <ChessResult
          title="Games you lost by ..."
          results={insights?.results?.loss ?? []}
          color="red"
        />
      </CardBody>
      <Divider />
      <CardBody></CardBody>
    </Card>
  );
};
