import { COLORS_MAP } from '@chess/common/constants/chess.constants';
import { customLabel } from '@chess/common/utils/custom-label';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { TitleTotal } from '../PlayersTitles';

export const PlayersTitlesChart: React.FC<{ titles: TitleTotal[] }> = ({
  titles = [],
}) => {
  if (titles.length === 0) return <></>;

  const total: number = titles.reduce(
    (previousValue: number, { total }) => previousValue + total,
    0
  );
  const data = titles.map(({ title, total }) => ({
    name: title ?? '',
    value: total ?? 0,
  }));
  const colors: string[] = COLORS_MAP.teal;

  return (
    <div className="flex h-full items-center">
      <div className="h-full w-full p-10 md:p-20">
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
  );
};
