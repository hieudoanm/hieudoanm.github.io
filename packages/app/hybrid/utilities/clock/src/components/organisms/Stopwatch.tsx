'use client';

import { FC, useRef, useState } from 'react';
import { fmtStopwatch } from '@/lib/stopwatch';

interface Lap {
  index: number;
  time: number;
  split: number;
}

export const Stopwatch: FC = () => {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const tick = () => {
    setElapsed(Date.now() - startRef.current);
    rafRef.current = requestAnimationFrame(tick);
  };

  const start = () => {
    startRef.current = Date.now() - elapsed;
    setRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  };

  const stop = () => {
    setRunning(false);
    cancelAnimationFrame(rafRef.current);
  };

  const reset = () => {
    stop();
    setElapsed(0);
    setLaps([]);
  };

  const lap = () => {
    const prev = laps.length > 0 ? laps[0].time : 0;
    setLaps([
      { index: laps.length + 1, time: elapsed, split: elapsed - prev },
      ...laps,
    ]);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center gap-4">
        <span className="font-mono text-5xl font-normal tracking-tighter tabular-nums">
          {fmtStopwatch(elapsed)}
        </span>

        <div className="flex items-center gap-3">
          {running ? (
            <>
              <button
                className="btn btn-ghost btn-sm btn-circle"
                onClick={lap}
                title="Lap">
                🏁
              </button>
              <button
                className="btn btn-lg btn-circle btn-error"
                onClick={stop}>
                ⏸
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-ghost btn-sm btn-circle"
                onClick={reset}
                title="Reset"
                disabled={elapsed === 0}>
                ↺
              </button>
              <button
                className="btn btn-lg btn-circle btn-primary"
                onClick={start}>
                ▶
              </button>
            </>
          )}
        </div>
      </div>

      {laps.length > 0 && (
        <div className="border-base-300 mt-4 max-h-48 overflow-y-auto border-t pt-3">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-base-content/40 text-xs font-normal">#</th>
                <th className="text-base-content/40 text-xs font-normal">
                  Lap
                </th>
                <th className="text-base-content/40 text-xs font-normal">
                  Split
                </th>
              </tr>
            </thead>
            <tbody>
              {laps.map((l) => (
                <tr key={l.index}>
                  <td className="font-mono text-sm">{l.index}</td>
                  <td className="font-mono text-sm">{fmtStopwatch(l.time)}</td>
                  <td className="font-mono text-sm">{fmtStopwatch(l.split)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
Stopwatch.displayName = 'Stopwatch';
