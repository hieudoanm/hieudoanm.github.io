import { FC } from 'react';

export const MeterBar: FC<{ pct: number }> = ({ pct }) => {
  const color = pct > 50 ? '#22c55e' : pct > 25 ? '#f59e0b' : '#ef4444';
  return (
    <div className="bg-base-200 h-2.5 w-full overflow-hidden rounded-full shadow-inner">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
      />
    </div>
  );
};
