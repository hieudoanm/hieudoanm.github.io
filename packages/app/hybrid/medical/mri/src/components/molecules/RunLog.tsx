'use client';

import { useEffect, useRef } from 'react';

import { formatClock } from '@/lib/format/dates';

export interface LogLine {
  line: string;
  stream: 'stdout' | 'stderr';
  atMs: number;
}

const MAX_LINES = 500;

/**
 * Live subprocess output. The log is capped so a chatty run cannot grow the tab
 * without bound, and the view follows the tail only while pinned to the end.
 */
export const RunLog = ({ lines }: { lines: LogLine[] }) => {
  const end = useRef<HTMLDivElement | null>(null);
  const pinned = useRef(true);

  useEffect(() => {
    if (pinned.current) end.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  const visible = lines.slice(-MAX_LINES);
  return (
    <div
      className="bg-neutral text-neutral-content max-h-80 overflow-y-auto rounded p-3 font-mono text-xs"
      onScroll={(event) => {
        const element = event.currentTarget;
        pinned.current =
          element.scrollHeight - element.scrollTop - element.clientHeight < 24;
      }}>
      {visible.length === 0 ? (
        <p className="opacity-70">No output yet.</p>
      ) : (
        visible.map((entry, index) => (
          <div
            key={`${entry.atMs}-${index}`}
            className={entry.stream === 'stderr' ? 'text-warning' : ''}>
            <span className="opacity-50">{formatClock(entry.atMs)}</span>{' '}
            {entry.line}
          </div>
        ))
      )}
      <div ref={end} />
    </div>
  );
};
