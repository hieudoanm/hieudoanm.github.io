import { FC, useMemo } from 'react';
import type { ChannelStats } from '@/lib/image/histogram';
import { normalizeHistogram } from '@/lib/image/histogram';

export interface ChannelHistogramProps {
  color: string;
  histogram: number[];
  stats?: ChannelStats;
}

const MAX_BAR_HEIGHT = 64;

export const ChannelHistogram: FC<ChannelHistogramProps> = ({
  color,
  histogram,
  stats,
}) => {
  const heights = useMemo(
    () => normalizeHistogram(histogram, MAX_BAR_HEIGHT),
    [histogram]
  );

  return (
    <div className="mt-3">
      <div
        className="flex h-16 items-end"
        role="img"
        aria-label="Channel intensity histogram">
        {heights.map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-sm"
            style={{ backgroundColor: color, height: `${height}px` }}
          />
        ))}
      </div>
      {stats && (
        <dl className="mt-2 grid grid-cols-3 gap-1 font-mono text-[10px]">
          <div>
            <dt className="text-base-content/50">Min</dt>
            <dd>{stats.min}</dd>
          </div>
          <div>
            <dt className="text-base-content/50">Max</dt>
            <dd>{stats.max}</dd>
          </div>
          <div>
            <dt className="text-base-content/50">Mean</dt>
            <dd>{stats.mean.toFixed(1)}</dd>
          </div>
        </dl>
      )}
    </div>
  );
};

ChannelHistogram.displayName = 'ChannelHistogram';
