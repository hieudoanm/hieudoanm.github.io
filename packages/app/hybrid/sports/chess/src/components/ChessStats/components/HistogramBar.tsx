import type { FC } from 'react';
import type { Analysis, Format } from '../types';
import { buildChartData } from '../utils/percentile';
import { Bar } from 'react-chartjs-2';

export const HistogramBar: FC<{
  histogram: Analysis['histogram'];
  title: string;
  timeControl: Format;
  titleKeys: string[];
}> = ({ histogram, title, timeControl, titleKeys }) => {
  const chartData = buildChartData(histogram, timeControl, titleKeys);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { color: '#aaa' } },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    interaction: { mode: 'index' as const, intersect: false },
    scales: {
      x: {
        stacked: true,
        ticks: { color: '#777', maxRotation: 90, minRotation: 45 },
      },
      y: { stacked: true, ticks: { color: '#777' } },
    },
  };

  return (
    <div className="card bg-base-200 border-base-300 border">
      <div className="card-body p-5">
        <p className="mb-4 text-sm font-medium">{title}</p>
        <div className="h-80">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};
