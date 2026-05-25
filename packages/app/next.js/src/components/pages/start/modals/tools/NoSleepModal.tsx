import { FC, useEffect, useRef, useState } from 'react';

interface TimeUnit {
  value: number;
  label: string;
}

function getElapsed(startTime: number): TimeUnit[] {
  let totalSeconds = Math.floor((Date.now() - startTime) / 1000);

  const years = Math.floor(totalSeconds / (365 * 24 * 3600));
  totalSeconds -= years * 365 * 24 * 3600;

  const months = Math.floor(totalSeconds / (30 * 24 * 3600));
  totalSeconds -= months * 30 * 24 * 3600;

  const days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds -= days * 24 * 3600;

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;

  return [
    { value: years, label: years === 1 ? 'year' : 'years' },
    { value: months, label: months === 1 ? 'month' : 'months' },
    { value: days, label: days === 1 ? 'day' : 'days' },
    { value: hours, label: hours === 1 ? 'hour' : 'hours' },
    { value: minutes, label: minutes === 1 ? 'minute' : 'minutes' },
    { value: seconds, label: seconds === 1 ? 'second' : 'seconds' },
  ];
}

export const NoSleepModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const startTimeRef = useRef<number>(Date.now());
  const [units, setUnits] = useState<TimeUnit[]>(
    getElapsed(startTimeRef.current)
  );
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // Wake Lock
  useEffect(() => {
    const acquire = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
        } catch {
          // silently fail if permission denied
        }
      }
    };

    acquire();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') acquire();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      wakeLockRef.current?.release();
    };
  }, []);

  // Ticker
  useEffect(() => {
    const id = setInterval(() => {
      setUnits(getElapsed(startTimeRef.current));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const visible = units.filter((u) => u.value > 0);

  return (
    <dialog
      open
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
      <div className="card bg-base-100 border-base-300 w-full max-w-2xl border shadow-2xl">
        <div className="card-body items-center justify-center gap-12 py-16">
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-square absolute top-4 right-4">
            ✕
          </button>

          <p
            className="text-base-content/50 text-xs font-semibold tracking-[0.35em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace" }}>
            Have not slept for
          </p>

          <div className="flex flex-wrap items-end justify-center gap-x-8 gap-y-6">
            {visible.length === 0 ? (
              <div className="flex flex-col items-center gap-1">
                <span className="text-primary text-6xl leading-none font-black tabular-nums md:text-8xl">
                  00
                </span>
                <span className="text-base-content/40 text-xs font-semibold tracking-[0.25em] uppercase">
                  seconds
                </span>
              </div>
            ) : (
              visible.map((u) => (
                <div key={u.label} className="flex flex-col items-center gap-1">
                  <span className="text-primary text-6xl leading-none font-black tabular-nums md:text-8xl">
                    {u.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-base-content/40 text-xs font-semibold tracking-[0.25em] uppercase">
                    {u.label}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="bg-primary/30 h-px w-24" />

          <p className="text-base-content/20 text-xs tracking-widest uppercase">
            Screen kept awake
          </p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
