import type { FC } from 'react';

export const StatCard: FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="card bg-base-200 border-base-300 border">
    <div className="card-body p-5">
      <p className="text-base-content/50 text-xs tracking-wide uppercase">
        {label}
      </p>
      <p className="text-primary font-mono text-2xl font-bold">
        {value.toLocaleString()}
      </p>
    </div>
  </div>
);
