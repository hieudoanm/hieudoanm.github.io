import { FC } from 'react';

export const RevenueStatsCard: FC = () => (
  <div className="card bg-base-100 border-base-300 w-full border shadow-sm">
    <div className="stats bg-base-100 w-full overflow-hidden">
      <div className="stat">
        <div className="stat-title">July Revenue</div>
        <div className="stat-value">$32,400</div>
        <div className="stat-desc text-success">↗ 21% more than last month</div>
      </div>
    </div>
  </div>
);

RevenueStatsCard.displayName = 'RevenueStatsCard';
