import { FC } from 'react';
import type { YearCount } from '@/types/doi';

interface YearChartProps {
  data: YearCount[];
}

const WIDTH = 800;
const HEIGHT = 180;
const PAD = 6;

const YearChart: FC<YearChartProps> = ({ data }) => {
  if (data.length === 0)
    return <p className="text-base-content/50 text-sm">No year data.</p>;

  const peak = Math.max(...data.map((d) => d.count));
  if (peak === 0) return null;

  const barW = WIDTH / data.length;
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Works per publication year"
      className="w-full"
      preserveAspectRatio="xMidYMid meet">
      {data.map((d, i) => {
        const h = (d.count / peak) * (HEIGHT - 2 * PAD);
        const x = i * barW;
        const y = HEIGHT - h;
        return (
          <g key={d.year}>
            <rect
              x={x + 1}
              y={y}
              width={barW - 2}
              height={h}
              rx={2}
              className="fill-primary/70"
              data-testid="year-bar"
            />
            <title>{`${d.year}: ${d.count}`}</title>
          </g>
        );
      })}
      <line
        x1={0}
        y1={HEIGHT - 1}
        x2={WIDTH}
        y2={HEIGHT - 1}
        className="stroke-base-content/20"
      />
    </svg>
  );
};

export default YearChart;
