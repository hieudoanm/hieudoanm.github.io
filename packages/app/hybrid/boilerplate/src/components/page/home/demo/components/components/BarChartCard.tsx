import { FC } from 'react';

export const BarChartCard: FC = () => {
  const bars = [30, 50, 40, 65, 55, 70, 45, 60, 75, 50, 80, 45, 60, 55, 70, 40];
  return (
    <div className="card bg-base-100 card-sm border-base-300 border shadow-sm">
      <div className="card-body">
        <div className="flex h-24 items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="bg-base-content w-full rounded-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs">
          Sales volume reached <strong>$12,450</strong> this week, showing a 15%
          increase.
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-xs">Charts</button>
          <button className="btn btn-neutral btn-xs">Details</button>
        </div>
      </div>
    </div>
  );
};

BarChartCard.displayName = 'BarChartCard';
