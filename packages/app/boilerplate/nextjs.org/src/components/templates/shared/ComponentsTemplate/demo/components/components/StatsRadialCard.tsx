import { FC } from 'react';

export const StatsRadialCard: FC = () => (
  <div className="card bg-base-100 border-base-300 w-full border shadow-sm">
    <div className="stats bg-base-100 w-full overflow-hidden">
      <div className="stat">
        <div className="stat-figure">
          <div
            className="radial-progress text-primary"
            style={
              {
                '--value': 91,
                '--size': '3rem',
              } as React.CSSProperties
            }>
            91
          </div>
        </div>
        <div className="stat-title">Page Score</div>
        <div className="stat-value text-primary">91/100</div>
        <div className="stat-desc text-success">✓ All good</div>
      </div>
    </div>
  </div>
);

StatsRadialCard.displayName = 'StatsRadialCard';
