import type { FC } from 'react';

export const Legend: FC = () => (
  <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-neutral-400">
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block h-2 w-2 rounded-full bg-orange-500" /> Click
      to advance
    </span>
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block h-2 w-2 rounded-full bg-amber-300" />{' '}
      Through to the next round
    </span>
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block h-2 w-2 rounded-full bg-neutral-600" />{' '}
      Eliminated
    </span>
  </div>
);
