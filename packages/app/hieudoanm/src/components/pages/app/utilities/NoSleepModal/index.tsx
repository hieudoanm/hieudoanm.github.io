import { FC, useEffect, useRef, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { TimeUnit, getElapsed } from './utils';

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
    <FullScreen centered onClose={onClose} title="No Sleep">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col items-center justify-center gap-12 py-8">
          <p
            className="text-base-content/50 text-xs font-normal tracking-[0.35em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace" }}>
            Have not slept for
          </p>

          <div className="flex flex-wrap items-end justify-center gap-x-8 gap-y-6">
            {visible.length === 0 ? (
              <div className="flex flex-col items-center gap-1">
                <span className="text-primary text-6xl leading-none font-normal tabular-nums md:text-8xl">
                  00
                </span>
                <span className="text-base-content/40 text-xs font-normal tracking-[0.25em] uppercase">
                  seconds
                </span>
              </div>
            ) : (
              visible.map((u) => (
                <div key={u.label} className="flex flex-col items-center gap-1">
                  <span className="text-primary text-6xl leading-none font-normal tabular-nums md:text-8xl">
                    {u.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-base-content/40 text-xs font-normal tracking-[0.25em] uppercase">
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
    </FullScreen>
  );
};
NoSleepModal.displayName = 'NoSleepModal';
