import type { FC } from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { EvalPoint } from '../hooks/useEvalHistory';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const toPawns = (cp: number): number => Math.max(-10, Math.min(10, cp / 100));

export const EvalChart: FC<{ points: EvalPoint[] }> = ({ points }) => {
  return (
    <div className="h-40">
      <Line
        data={{
          labels: points.map((p) => p.san),
          datasets: [
            {
              label: 'White eval',
              data: points.map((p) => toPawns(p.evalCp)),
              borderColor: '#e5e7eb',
              backgroundColor: 'rgba(229,231,235,0.15)',
              tension: 0.3,
              borderWidth: 2,
              pointRadius: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { tooltip: { enabled: true } },
          scales: {
            y: {
              ticks: { color: '#9ca3af' },
              grid: { color: 'rgba(156,163,175,0.15)' },
            },
            x: {
              ticks: { color: '#9ca3af', maxRotation: 0, autoSkip: true },
              grid: { display: false },
            },
          },
        }}
      />
    </div>
  );
};
EvalChart.displayName = 'EvalChart';
